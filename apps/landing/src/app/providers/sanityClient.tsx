import { createClient } from '@sanity/client'

const SanityClient = createClient({
  apiVersion: '2021-03-25',
  dataset: 'production',
  projectId: '25djj1sn',
  useCdn: false,
})

export default SanityClient
