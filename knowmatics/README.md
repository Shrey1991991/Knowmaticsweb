# Knowmatics by Shrey

A media website for press releases and thought leadership covering India's
metal cutting industry — CNC machining, cutting tools, automation, and
additive manufacturing.

Built with Next.js 16 (App Router) + TypeScript + Tailwind CSS, with
[Sanity](https://www.sanity.io) as the content management system. The Studio
(admin panel for writing and publishing) is embedded right inside the site at
`/studio` — no separate app to host or maintain.

## How this is organized

- **The public site** — home, Press Releases, Thought Leadership, category
  pages, About, Contact, Submit a Press Release — lives in
  `src/app/(site)/`.
- **The CMS** — schema definitions in `src/sanity/schemaTypes/`, Studio
  config in `sanity.config.ts`, mounted at `src/app/studio/[[...tool]]/page.tsx`.
- **Sample content** — `src/lib/seed-content.ts` has 12 realistic placeholder
  press releases and articles. **This is not real news** — it exists so
  every page looks right before you've published anything real. It
  disappears automatically the moment you connect a real Sanity project (see
  below); nothing needs to be deleted by hand.
- **The data layer** — `src/lib/content.ts` is the single place every page
  fetches content from. It reads the sample content when no Sanity project
  is configured, and switches to reading real content from Sanity the
  moment it is. You should never need to change this file to add content —
  that happens in the Studio.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the site will run immediately using the sample
content, no setup required. This is the fastest way to review the design.

## Connecting the CMS so you can actually publish

Right now the site is running on sample content. To publish real press
releases and articles:

1. **Create a free Sanity project.**
   - Run `npx sanity@latest init` from this folder and follow the prompts
     (create an account if you don't have one — the free tier is generous
     and is enough to run this site), **or** create one at
     [sanity.io/manage](https://www.sanity.io/manage).
   - When it asks to use an existing schema, say no / skip — this project
     already has one in `src/sanity/schemaTypes/`.
   - Note the **Project ID** it gives you.

2. **Copy `.env.local.example` to `.env.local`** and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Restart the dev server** (`npm run dev`). The site now reads from
   Sanity instead of the sample content — every listing will look empty
   until you publish something, which is expected.

4. **Go to `/studio`** on your site, log in with the same account, and
   start publishing. The sidebar has three simple sections: **Press
   Releases**, **Articles**, and **Authors**. Add an author first, then
   write a press release or article — title, excerpt, category, body text,
   and hit Publish. It appears on the live site immediately (or after your
   next deploy, if using Vercel's default caching — see below).

You (or whoever's posting content) never need to touch code to publish from
here on. That's the point of the CMS.

### Editorial workflow day-to-day

- **Press Releases** are for company announcements — launches, partnerships,
  appointments. They have extra fields for **Company name** and **Dateline
  location** that Articles don't.
- **Articles** are thought leadership — analysis, opinion, interviews.
- Both support a cover image (optional — if you skip it, a branded cover
  graphic is generated automatically based on the category, so nothing
  looks broken), tags, a **Feature on homepage** toggle, and a full rich
  text body with headings, quotes, bullet lists, and inline images.
- Categories are a fixed list (`src/lib/categories.ts`) so navigation and
  the CMS always stay in sync. If you want to add or rename a category,
  edit that one file — it updates the Studio dropdown, the site's category
  pages, and the footer automatically.

## Deploying

The easiest path is [Vercel](https://vercel.com) (made by the Next.js team,
generous free tier):

1. Push this project to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the same environment variables from your `.env.local` in the
   Vercel project settings (Project → Settings → Environment Variables):
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
   `NEXT_PUBLIC_SITE_URL` (your real domain, e.g. `https://www.knowmatics.in`).
4. Deploy. Point your domain (the one you've already bought) at the Vercel
   project under Settings → Domains.
5. New press releases/articles published in `/studio` show up on the live
   site without a redeploy — pages that list content re-check Sanity on
   every visit for the listing pages, and individual post pages are
   pre-built at deploy time but will regenerate as you publish more (Next.js
   handles this automatically on Vercel via on-demand static regeneration
   once traffic hits a new page).

## What still needs to be wired up before this is fully "live"

A few things are intentionally left as clearly-marked stubs rather than
guessed at, since they need your own accounts/credentials:

- **Newsletter signups** (`src/app/api/newsletter/route.ts`) — currently
  validates the email and logs it, but doesn't forward it anywhere. Plug in
  Mailchimp, Brevo, or ConvertKit (links to each provider's API docs are in
  that file's comments).
- **Contact / Submit-a-Press-Release forms**
  (`src/app/api/contact/route.ts`) — same situation: validates and logs,
  doesn't yet email or notify anyone. Easiest fix is wiring in an email API
  (Resend, Postmark) so submissions land in your inbox.
- **Domain email** (`hello@knowmatics.in` is used as a placeholder contact
  address on the Contact page) — update `src/app/(site)/contact/page.tsx`
  once you've set up real email on your domain.
- **Social links** in the footer (`src/components/Footer.tsx`) currently
  point nowhere (`href="#"`) — add your real profile URLs once they exist.
- **Analytics** — nothing is wired in yet. Adding Google Analytics/Plausible
  is a few lines in `src/app/layout.tsx` whenever you're ready.

## Design system

Brand colors, fonts, and the generated cover-graphic style all live in one
place: `src/app/globals.css` (color tokens under `@theme inline`) and
`src/lib/cover-style.ts` (which category gets which generated cover look).
Fonts are self-hosted via `@fontsource-variable` packages (Space Grotesk for
headings, Inter for body text) so builds don't depend on reaching Google
Fonts — if you'd prefer `next/font/google` instead, swap the two import
lines at the top of `src/app/layout.tsx`.

The logo is inline SVG in `src/components/Logo.tsx` — no image files to
manage, and it recolors automatically for light/dark backgrounds.

## Housekeeping

- `npm run build` and `npm run lint` both pass clean as of this commit.
- `npm audit` currently flags a handful of moderate/high advisories, all of
  them inside Sanity's own CLI tooling (dev-time only, not shipped to your
  site's visitors). Worth re-running `npm audit` occasionally and updating
  the `sanity` package as new versions land.
