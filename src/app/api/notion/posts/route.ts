import { NextResponse } from 'next/server'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

async function queryDatabase(databaseId: string) {
  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_size: 100 }),
  })
  if (!res.ok) throw new Error('notion query failed')
  return res.json()
}

async function fetchBlocks(pageId: string) {
  const res = await fetch(`${NOTION_API}/blocks/${pageId}/children?page_size=200`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
    },
  })
  if (!res.ok) return { results: [] }
  return res.json()
}

type RichText = { plain_text?: string }

function richTextToPlainText(rich: unknown[] | undefined) {
  if (!Array.isArray(rich)) return ''
  return rich.map((r) => {
    const rt = r as RichText
    return rt.plain_text ?? ''
  }).join('')
}

function blocksToMarkdown(blocks: unknown[] | undefined) {
  if (!Array.isArray(blocks)) return ''
  const lines: string[] = []
  let inBulleted = false
  let inNumbered = false
  let numberCounter = 1

  for (const b of blocks) {
    const bb = b as Record<string, unknown>
    const t = String(bb.type || '')
    const data = bb[t] as Record<string, unknown> | undefined

    if (!data) continue

    if (t === 'paragraph') {
      if (inBulleted || inNumbered) {
        inBulleted = false
        inNumbered = false
        numberCounter = 1
        lines.push('')
      }
      lines.push(richTextToPlainText(data.rich_text as unknown[]))
    } else if (t === 'heading_1') {
      lines.push('# ' + richTextToPlainText(data.rich_text as unknown[]))
    } else if (t === 'heading_2') {
      lines.push('## ' + richTextToPlainText(data.rich_text as unknown[]))
    } else if (t === 'heading_3') {
      lines.push('### ' + richTextToPlainText(data.rich_text as unknown[]))
    } else if (t === 'bulleted_list_item') {
      if (!inBulleted) {
        inBulleted = true
        inNumbered = false
      }
      lines.push('- ' + richTextToPlainText(data.rich_text as unknown[]))
    } else if (t === 'numbered_list_item') {
      if (!inNumbered) {
        inNumbered = true
        inBulleted = false
        numberCounter = 1
      }
      lines.push(`${numberCounter}. ` + richTextToPlainText(data.rich_text as unknown[]))
      numberCounter++
    } else if (t === 'quote') {
      lines.push('> ' + richTextToPlainText(data.rich_text as unknown[]))
    } else if (t === 'code') {
      const lang = String(data.language ?? '')
      lines.push('```' + lang)
      lines.push(richTextToPlainText(data.rich_text as unknown[]))
      lines.push('```')
    } else if (t === 'image') {
      const url = data.type === 'external' ? String((data.external as Record<string, unknown>)?.url ?? '') : String((data.file as Record<string, unknown>)?.url ?? '')
      const caption = richTextToPlainText((data.caption as unknown[]) ?? [])
      lines.push(`![${caption}](${url})`)
    } else {
      // fallback: try to extract plain text
      if (data && data.rich_text) {
        lines.push(richTextToPlainText(data.rich_text as unknown[]))
      }
    }
  }

  return lines.join('\n\n')
}

function getPropTitle(props: Record<string, unknown>) {
  const titleVal = props.Title as Record<string, unknown> | undefined
  if (!titleVal) return ''
  const arr = titleVal.title as unknown[] | undefined
  if (!Array.isArray(arr)) return ''
  return arr.map((t) => String((t as RichText).plain_text ?? '')).join('')
}

function getMultiSelectNames(val: unknown) {
  if (!val) return [] as string[]
  if (!Array.isArray(val)) return [] as string[]
  return val.map((it) => String((it as Record<string, unknown>)?.name ?? ''))
}

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) return NextResponse.json({ error: 'missing_db' }, { status: 500 })
  if (!process.env.NOTION_API_KEY) return NextResponse.json({ error: 'missing_key' }, { status: 500 })

  const queryRes = await queryDatabase(databaseId)
  const pages = (queryRes as Record<string, unknown>)?.results as unknown[] | undefined

  const posts = await Promise.all(
    (pages || []).map(async (p) => {
      const pageObj = p as Record<string, unknown>
      const id = String(pageObj.id ?? '')
      const props = (pageObj.properties as Record<string, unknown>) ?? {}
      const title = getPropTitle(props)
      const category = String(((props.Category as Record<string, unknown>)?.select as Record<string, unknown>)?.name ?? null)
      const tags = getMultiSelectNames((props.Tags as Record<string, unknown>)?.multi_select)
      const publishDate = String(((props.PublishDate as Record<string, unknown>)?.date as Record<string, unknown>)?.start ?? '') || null
      const expiryDate = String(((props.ExpiryDate as Record<string, unknown>)?.date as Record<string, unknown>)?.start ?? '') || null

      const blocksRes = await fetchBlocks(id)
      const blocks = (blocksRes as Record<string, unknown>)?.results as unknown[] | undefined
      const markdown = blocksToMarkdown(blocks)

      return { id, title, category, tags, publishDate, expiryDate, markdown }
    })
  )

  return NextResponse.json({ ok: true, posts })
}
