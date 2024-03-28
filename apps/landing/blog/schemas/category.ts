import {defineField, defineType} from 'sanity'

export default defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  name: 'category',
  title: 'Category',
  type: 'document',
})
