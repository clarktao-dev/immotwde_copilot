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

function richTextToPlainText(rich: any[]) {
  return (rich || []).map((r) => r.plain_text || '').join('')
}

function blocksToMarkdown(blocks: any[]) {
  const lines: string[] = []
  let inBulleted = false
  let inNumbered = false
  let numberCounter = 1

  for (const b of blocks) {
    const t = b.type
    const data = b[t]
    if (t === 'paragraph') {
      if (inBulleted || inNumbered) {
        inBulleted = false
        inNumbered = false
        numberCounter = 1
        lines.push('')
      }
      lines.push(richTextToPlainText(data.rich_text))
    } else if (t === 'heading_1') {
      lines.push('# ' + richTextToPlainText(data.rich_text))
    } else if (t === 'heading_2') {
      lines.push('## ' + richTextToPlainText(data.rich_text))
    } else if (t === 'heading_3') {
      lines.push('### ' + richTextToPlainText(data.rich_text))
    } else if (t === 'bulleted_list_item') {
      if (!inBulleted) {
        inBulleted = true
        inNumbered = false
      }
      lines.push('- ' + richTextToPlainText(data.rich_text))
    } else if (t === 'numbered_list_item') {
      if (!inNumbered) {
        inNumbered = true
        inBulleted = false
        numberCounter = 1
      }
      lines.push(`${numberCounter}. ` + richTextToPlainText(data.rich_text))
      numberCounter++
    } else if (t === 'quote') {
      lines.push('> ' + richTextToPlainText(data.rich_text))
    } else if (t === 'code') {
      const lang = data.language || ''
      lines.push('```' + lang)
      lines.push(richTextToPlainText(data.rich_text))
      lines.push('```')
    } else if (t === 'image') {
      const url = data.type === 'external' ? data.external.url : data.file?.url
      const caption = richTextToPlainText(data.caption || [])
      lines.push(`![${caption}](${url})`)
    } else {
      // fallback: try to extract plain text
      if (data && data.rich_text) {
        lines.push(richTextToPlainText(data.rich_text))
      }
    }
  }

  return lines.join('\n\n')
}

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) return NextResponse.json({ error: 'missing_db' }, { status: 500 })
  if (!process.env.NOTION_API_KEY) return NextResponse.json({ error: 'missing_key' }, { status: 500 })

  const queryRes = await queryDatabase(databaseId)
  const pages = queryRes.results || []

  const posts = await Promise.all(
    pages.map(async (p: any) => {
      const id = p.id
      const props = p.properties ?? {}
      const title = Array.isArray(props.Title?.title) ? props.Title.title.map((t: any) => t.plain_text).join('') : ''
      const category = props.Category?.select?.name ?? null
      const tags = (props.Tags?.multi_select ?? []).map((t: any) => t.name)
      const publishDate = props.PublishDate?.date?.start ?? null
      const expiryDate = props.ExpiryDate?.date?.start ?? null

      const blocksRes = await fetchBlocks(id)
      const blocks = blocksRes.results ?? []
      const markdown = blocksToMarkdown(blocks)

      return { id, title, category, tags, publishDate, expiryDate, markdown }
    })
  )

  return NextResponse.json({ ok: true, posts })
}
