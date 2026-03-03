import { createClient } from 'next-sanity'

const projectId = process.env.SANITY_PROJECT_ID || ''

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: '2026-01-01',
      useCdn: false,
    })
  : {
      // Minimal runtime stubs so importing this module does not throw during build when SANITY_PROJECT_ID is unset.
      create: async () => {
        throw new Error('SANITY_PROJECT_ID is not set')
      },
      fetch: async () => {
        throw new Error('SANITY_PROJECT_ID is not set')
      },
      getDocument: async () => {
        throw new Error('SANITY_PROJECT_ID is not set')
      },
      // Add other commonly used methods as needed by your codebase
    } as unknown
