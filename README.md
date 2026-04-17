# ChildcareApp

Standalone multi-tenant childcare and preschool management SaaS foundation built to be separate from Bee Suite.

## Included now

- Next.js App Router structure with TypeScript and Tailwind
- Premium admin shell plus parent portal scaffold
- First reviewable MVP screens for dashboard, children, families, attendance, billing, messages, staff, reports, and settings
- Typed mock domain models, centralized statuses, and role/permission utilities
- Supabase SQL migration with tenant scoping, soft-delete fields, audit logging support, indexes, and RLS-ready policies

## Deployment files included

- `.gitignore` for GitHub-safe commits
- `.env.example` for Vercel and local env setup
- `vercel.json` for predictable Vercel install/build commands
- `DEPLOYMENT.md` for GitHub + Vercel + Supabase setup

## Local setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Run `npm run dev`.
4. Create `.env.local` with Supabase keys.
5. Apply `supabase/migrations/0001_childcare_foundation.sql`.

## GitHub + Vercel + Supabase

1. Push this repo to GitHub.
2. Create a Supabase project and run the SQL migration.
3. Import the repo into Vercel.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel.
5. Deploy.

See `DEPLOYMENT.md` for the full deployment sequence.

## Recommended next build steps

1. Replace mock data with Supabase queries and server actions.
2. Implement auth, protected routing, and organization onboarding.
3. Add CRUD forms for child, family, classroom, staff, and billing flows.
4. Wire Stripe, email/SMS delivery, storage uploads, and audit log writes.
