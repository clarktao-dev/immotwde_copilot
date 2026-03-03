Sanity Studio placeholder

To install and run Sanity Studio locally (optional):

1. Install the Sanity CLI globally (if not installed):

   npm install -g @sanity/cli

2. From this `sanity/` directory initialize or connect an existing studio:

   cd sanity/studio
   npm install
   sanity init --dataset production --project "immotwde"

3. Start the studio:

   npm run start

Alternatively, use Sanity's managed dataset and create a project at https://www.sanity.io

Schemas included in `sanity/studio/schemas/`:
- listing
- blogPost
- newsArticle
- booking
- legalPage
- siteSettings

Create a dataset and set `SANITY_PROJECT_ID` and `SANITY_DATASET` in the root `.env.local`.

Example `.env.local` entries for Sanity:

SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=secret_write_token

Notes:
- This scaffold uses Sanity v3 style config.
- After creating the project in Sanity, deploy the studio with `npm run deploy` from `sanity/studio`.
