import { createClient } from '@sanity/client'

const SanityClient = createClient({
  dataset: 'production',
  projectId: '25djj1sn',
  useCdn: false,
  apiVersion: '2021-03-25',
})

export default SanityClient
