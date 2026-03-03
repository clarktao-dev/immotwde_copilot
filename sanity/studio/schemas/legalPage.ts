const legalPage = {
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'content', type: 'array', of: [{ type: 'block' }] }
  ]
}

export default legalPage
