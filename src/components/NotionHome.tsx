"use client"
import React, { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Post = {
  id: string
  title: string
  category: string | null
  tags: string[]
  publishDate: string | null
  expiryDate: string | null
  markdown: string
}

export default function NotionHome() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch('/api/notion/posts')
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setPosts(j.posts || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const tags = useMemo(() => {
    const s = new Set<string>()
    posts.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return Array.from(s).sort()
  }, [posts])

  const today = new Date()

  function isExpired(p: Post) {
    return p.expiryDate ? new Date(p.expiryDate) < today : false
  }

  const filtered = posts.filter((p) => (activeTag ? p.tags.includes(activeTag) : true))

  const news = filtered
    .filter((p) => p.category === '最新消息')
    .sort((a, b) => (b.publishDate ?? '').localeCompare(a.publishDate ?? ''))
  const blogs = filtered
    .filter((p) => p.category === 'Blog')
    .sort((a, b) => (b.publishDate ?? '').localeCompare(a.publishDate ?? ''))

  if (loading) return <div className="p-6">Loading…</div>

  return (
    <div className="notion-home container mx-auto p-6">
      <div className="tagbar mb-4">
        <span className="label mr-2">Filter by tag:</span>
        <button className={`tag ${activeTag === null ? 'active' : ''}`} onClick={() => setActiveTag(null)}>All</button>
        {tags.map((t) => (
          <button key={t} className={`tag ${activeTag === t ? 'active' : ''}`} onClick={() => setActiveTag(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="section-title">最新消息</h2>
          <div className="stack">
            {news.map((p) => (
              <article key={p.id} className={`card ${isExpired(p) ? 'is-expired' : ''}`}>
                <header className="card-head">
                  <h3 className="card-title">{p.title}</h3>
                  <div className="meta">{p.publishDate ? new Date(p.publishDate).toLocaleDateString() : ''}</div>
                </header>
                <div className="tags">
                  {p.tags.map((t) => (
                    <button key={t} className="pill" onClick={() => setActiveTag(t)}>{t}</button>
                  ))}
                </div>
                <div className="excerpt">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{p.markdown.slice(0, 400)}</ReactMarkdown>
                </div>
                <div className="card-actions">
                  <button onClick={() => setSelectedPost(p)} className="link">Read</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Blog</h2>
          <div className="stack">
            {blogs.map((p) => (
              <article key={p.id} className="card">
                <header className="card-head">
                  <h3 className="card-title">{p.title}</h3>
                  <div className="meta">{p.publishDate ? new Date(p.publishDate).toLocaleDateString() : ''}</div>
                </header>
                <div className="tags">
                  {p.tags.map((t) => (
                    <button key={t} className="pill" onClick={() => setActiveTag(t)}>{t}</button>
                  ))}
                </div>
                <div className="excerpt">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{p.markdown.slice(0, 400)}</ReactMarkdown>
                </div>
                <div className="card-actions">
                  <button onClick={() => setSelectedPost(p)} className="link">Read</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* modal / reader */}
      {selectedPost && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-inner">
            <button className="modal-close" onClick={() => setSelectedPost(null)}>Close</button>
            <h2>{selectedPost.title}</h2>
            <div className="meta">{selectedPost.publishDate && new Date(selectedPost.publishDate).toLocaleString()}</div>
            <div className={`post-body ${isExpired(selectedPost) ? 'is-expired' : ''}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedPost.markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
