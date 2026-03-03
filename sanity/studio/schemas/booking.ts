const booking = {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    { name: 'listing', type: 'reference', to: [{ type: 'listing' }] },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'startDate', type: 'date' },
    { name: 'endDate', type: 'date' },
    { name: 'status', type: 'string', options: { list: ['pending', 'confirmed', 'cancelled'] }, initialValue: 'pending' }
  ]
}

export default booking
