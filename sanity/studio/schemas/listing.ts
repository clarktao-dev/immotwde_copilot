const listing = {
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'price', type: 'number', title: 'Price' },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'images', type: 'array', of: [{ type: 'image' }], title: 'Images' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'availableFrom', type: 'date', title: 'Available from' },
    { name: 'availableTo', type: 'date', title: 'Available to' }
  ]
}

export default listing
