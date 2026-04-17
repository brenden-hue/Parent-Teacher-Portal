# GitHub, Vercel, and Supabase Setup

Use this flow to deploy `ChildcareApp` without depending on local hosting.

## 1. Create the GitHub repo

1. Create a new GitHub repository named `ChildcareApp`.
2. Upload or push this project into that repo.
3. Make sure `.env.local`, `.env.local.txt`, `.vercel`, `.next`, and `node_modules` are not committed.

## 2. Create the Supabase project

1. In Supabase, create a new project.
2. Save the project URL and anon/publishable key from `Project Settings` -> `API`.
3. In `SQL Editor`, run the schema from:
   `supabase/migrations/0001_childcare_foundation.sql`

## 3. Connect the repo to Vercel

1. In Vercel, click `Add New...` -> `Project`.
2. Import the GitHub repository.
3. Leave the framework preset as `Next.js`.
4. Keep:
   - Install command: `npm install`
   - Build command: `npm run build`
5. Set the output directory to the default for Next.js.

## 4. Add environment variables in Vercel

Add these variables for Production, Preview, and Development:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Use the same values from your Supabase project API settings.

## 5. Optional local development

If you also want local development:

1. Copy `.env.example` to `.env.local`
2. Fill in the Supabase values
3. Run `npm install`
4. Run `npm run dev`

## 6. First deployment check

After the first Vercel deploy:

1. Open the site root and confirm the landing page loads.
2. Confirm the environment variables are present.
3. Confirm protected routes redirect to `/sign-in`.
4. Confirm the Supabase schema exists before wiring live queries.

## 7. Recommended next code changes after deployment

1. Replace mock data with Supabase reads for dashboard, children, families, and classrooms.
2. Implement real Supabase Auth sign-in and session cookies.
3. Add organization onboarding that creates the first tenant and admin membership.
4. Move role checks from mock utilities into live auth and RLS-backed authorization.
