import {defineField, defineType} from 'sanity'

export default defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      options: {
        maxLength: 96,
        source: 'title',
      },
      title: 'Slug',
      type: 'slug',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      to: {type: 'author'},
      type: 'reference',
    }),
    defineField({
      name: 'mainImage',
      options: {
        hotspot: true,
      },
      title: 'Main image',
      type: 'image',
    }),
    defineField({
      name: 'categories',
      of: [{to: {type: 'category'}, type: 'reference'}],
      title: 'Categories',
      type: 'array',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  name: 'post',
  preview: {
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
    select: {
      author: 'author.name',
      media: 'mainImage',
      title: 'title',
    },
  },
  title: 'Post',

  type: 'document',
})
