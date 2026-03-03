const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'publishedAt', type: 'datetime', title: 'Published at' },
    { name: 'author', type: 'string', title: 'Author' },
    { name: 'excerpt', type: 'text', title: 'Excerpt' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] }
  ]
}

export default blogPost
