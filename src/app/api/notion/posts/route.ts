import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) return NextResponse.json({ error: 'missing_db' }, { status: 500 })

  const res = await notion.databases.query({ database_id: databaseId, page_size: 100 })
  const pages = res.results

  const posts = await Promise.all(
    pages.map(async (p: any) => {
      const id = p.id
      const props = p.properties ?? {}
      const titleProp = props.Title?.title ?? []
      const title = titleProp.map((t: any) => t.plain_text).join('') || 'Untitled'
      const category = props.Category?.select?.name ?? null
      const tags = (props.Tags?.multi_select ?? []).map((t: any) => t.name)
      const publishDate = props.PublishDate?.date?.start ?? null
      const expiryDate = props.ExpiryDate?.date?.start ?? null

      const mdBlocks = await n2m.pageToMarkdown(id)
      const md = n2m.toMarkdownString(mdBlocks)

      return { id, title, category, tags, publishDate, expiryDate, markdown: md }
    })
  )

  return NextResponse.json({ ok: true, posts })
}
