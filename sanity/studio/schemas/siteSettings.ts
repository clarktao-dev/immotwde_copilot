export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'defaultLanguage', type: 'string', options: { list: ['zh-TW', 'de', 'en'] }, initialValue: 'en' }
  ]
}
