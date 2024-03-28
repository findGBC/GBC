import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {schemaTypes} from './schemas'

export default defineConfig({
  dataset: 'production',
  name: 'default',

  plugins: [deskTool(), visionTool()],
  projectId: '25djj1sn',

  schema: {
    types: schemaTypes,
  },

  title: 'Blueberry-blog',
})
