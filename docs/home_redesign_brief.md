# Home page redesign brief

Saloni sketched the layout she wants. Follow it exactly. Earlier ideas (embedding map, drifting seed, hallucination game, "Right now" block) are dropped.

## Layout, top to bottom

```
Saloni Samant                                   [Get in touch]
Short bio and intro (2–3 sentences)
Work rights line (small)

┌──────────────────────────────────────────────┐
│        Clickable image for project 1         │
└──────────────────────────────────────────────┘
Project title                       Headline result
One-line summary

┌──────────────────────────────────────────────┐
│        Clickable image for project 2         │
└──────────────────────────────────────────────┘
...

Experience (tiny)
dates          role, company
dates          role, company
dates          role, company
More about me

Contact: email, LinkedIn, GitHub
Footer
```

## Header

- Name on the left, large: Newsreader, `clamp(2.8rem, 7vw, 5rem)`, weight 400, tight letter-spacing. It is the biggest text on the page.
- "Get in touch" on the right as a dark pill button, vertically centred on the name. Links to `#contact`.
- Under the name: the bio from `src/site.ts` (`statement` plus `role`), max width about 38rem, then `workRights` in small muted text.
- Name, bio and every section below share one left edge. Nothing is centred.
- The site nav (Work, About, Resume) stays, but small and quiet so it doesn't compete with the name.

## Project cards

- One card per project with `featured: true`, sorted by `order`. Full content width, stacked, about 64px apart.
- The whole card is one link to `/work/<slug>`. Its accessible name is the project title.
- Image: rounded corners (20px), aspect ratio 8:3 on desktop, 4:3 below 640px, `object-fit: cover`.
- Under the image: title in Newsreader (about 1.6rem) on the left, the headline value and label (`headline` in frontmatter) on the right, and `summary` on one line below. Nothing on top of the image.
- Hover: image scales to 1.02 inside its rounded frame (overflow hidden), title gets an underline. Visible focus ring on keyboard focus. No motion when `prefers-reduced-motion` is set.

### Images

- Saloni adds images to `src/assets/projects/`, named after the project file:
  - `study-companion.jpg`
  - `lixi-glossary-rag.jpg`
  - `present-perfect.jpg`
- Accept `.jpg`, `.jpeg`, `.png` or `.webp` with the same base name. Find them with `import.meta.glob` keyed by slug, so no frontmatter edit is needed when an image is added.
- Render with Astro's `<Picture>` (`astro:assets`): WebP and AVIF, widths 800, 1600 and 2400, `sizes` matching the content width. Re-encoding strips camera and location metadata; keep it that way.
- Add an optional `coverAlt` string to the content schema. Use it as the alt text, falling back to "<title> project image".
- If a project has no image yet, show a placeholder panel with the same shape: a soft tinted background with the project title and `kind` in Newsreader. The build must not fail.
- Show the same image at the top of each project's own page, above the title.

## Experience (tiny)

- Heading "Experience", then three rows: dates on the left (about 12rem column, muted), "Role, Company" on the right. One line each, no descriptions.
  - Aug 2025 – now: Analyst Developer, LIXI
  - Sep 2024 – Jul 2025: IT Business Analyst Intern, BallR Hub
  - Feb 2021 – Jan 2024: Software Developer, DbCom Systems Software
- A "More about me" link to `/about`.
- Rows stack on narrow screens.

## Contact

- Section with `id="contact"`: a short line ("Email is the best way to reach me."), the email address as visible text that is also a `mailto:` link, then LinkedIn and GitHub. Values come from `src/site.ts`.

## Remove from the home page

- The portrait (keep `Portrait.astro`; it can be used on `/about`).
- The wave divider, the "Right now" block, and the old `ProjectRow` list on the home page. `ProjectRow` can stay for `/work` if it's still used there.

## Look

- Off-white background, quiet and calm, with tones taken from nature. Update the tokens in `src/styles/global.css`:
  - paper `#fbfbf8`, raised `#ffffff`, ink `#1c2420`, soft ink `#4c5751`, faint ink `#737d77`, rule `#e1e5de`, accent (links, focus) `#2f6b4f`, placeholder tint `#eef2ec`
  - Dark mode keeps the same structure: paper `#141815`, raised `#1b201c`, ink `#e6ebe7`, soft `#b4beb8`, faint `#8d978f`, rule `#2c332e`, accent `#8cc5a5`, placeholder tint `#202822`
- Fonts stay as installed: Newsreader for the name, headings and project titles; Hanken Grotesk for everything else.
- No gradients, shadows or decorative animation. The images carry the visual interest.

## Also fix

- The live domain is `salonisamant.com`. Set `site` in `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt` to it, if not already done.
- Update the "Design direction" section of `CLAUDE.md` to match this brief.

## Done when

- `npm run build` passes with and without the three images present.
- The page has no horizontal scroll at 375px wide, and looks right in light and dark mode.
- Every card is reachable and clearly focused with the keyboard.