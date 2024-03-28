import {defineField, defineType} from 'sanity'

export default defineType({
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      options: {
        maxLength: 96,
        source: 'name',
      },
      title: 'Slug',
      type: 'slug',
    }),
    defineField({
      name: 'image',
      options: {
        hotspot: true,
      },
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'bio',
      of: [
        {
          lists: [],
          styles: [{title: 'Normal', value: 'normal'}],
          title: 'Block',
          type: 'block',
        },
      ],
      title: 'Bio',
      type: 'array',
    }),
  ],
  name: 'author',
  preview: {
    select: {
      media: 'image',
      title: 'name',
    },
  },
  title: 'Author',
  type: 'document',
})
