# Saloni Samant — portfolio

Personal site built with [Astro](https://astro.build). Static output, no client framework, deployed to GitHub Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally
```

Needs Node 22 or newer.

## Where things live

| To change… | Edit |
|---|---|
| Intro sentence, links, "Right now" lines, photo caption | `src/site.ts` |
| A project page | `src/content/work/<project>.mdx` |
| A project's architecture diagram | `src/diagrams/<name>.svg` |
| Experience and education | `src/pages/about.astro` (lists at the top) |
| Colours and fonts | `src/styles/global.css` (tokens at the top) |
| Resume PDF | `public/resume.pdf` (no phone number) |

## Adding a project

1. Copy an existing file in `src/content/work/` and rename it. The file name becomes the URL: `my-project.mdx` → `/work/my-project`.
2. Fill in the frontmatter. The build checks it: every project needs `metrics` (at least one) and `lessons` (what you'd do differently), so pages keep the case-study shape.
3. Write the body with these sections: **The problem**, **How it works**, **Key decisions**.
4. Add a diagram: put an SVG in `src/diagrams/` and place `<Diagram name="file.svg" alt="What it shows" />` in the body. The build fails if a project has no diagram.
5. Add margin notes with `<Note>…</Note>` right after the paragraph they belong to.
6. Set `featured: true` to show it on the home page. `order` sets the position (lower first).

Diagram SVGs use classes instead of colours so they work in light and dark mode: `box`, `box-mine` (highlighted), `group` (dashed boundary), `line`, `dash`, `label`, `sub`, `hand`. Copy an existing diagram as a starting point.

## Your photo

```bash
npm run photo -- ~/Pictures/my-photo.jpg
```

This writes `src/assets/portrait.jpg`, 480px wide with all metadata (location, camera, date) removed. Keep the original outside this folder; only the small copy should be committed. Until the file exists, the site shows a placeholder.

The site also asks AI crawlers not to collect it (`public/robots.txt` and `noai` meta tags) while still letting search engines index it. These are requests, not locks: anything on a public page can be copied.

## Before your first push

The repo has to be public for free GitHub Pages, so everything in it is visible to anyone. Check that:

- `public/resume.pdf`, if present, has no phone number or home address.
- No original photos are in the folder. Only `src/assets/portrait.jpg` (made by `npm run photo`) belongs here.
- Git uses your private GitHub email, not your personal one. On GitHub, turn on **Settings → Emails → Keep my email addresses private**, copy the `@users.noreply.github.com` address it shows, then run:

  ```bash
  git config --global user.name "Saloni Samant"
  git config --global user.email "<the noreply address>"
  ```

## Deploying to GitHub Pages

1. Create a public repo named **`saloni-11.github.io`** with no README or licence, then from this folder:

   ```bash
   git init -b main
   git add -A
   git commit -m "First version of portfolio site"
   git remote add origin https://github.com/saloni-11/saloni-11.github.io.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` now builds and deploys via `.github/workflows/deploy.yml`. Watch it under the **Actions** tab.

## Custom domain (salonisamant.com)

`site` in `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt` are already set to `https://salonisamant.com`. No `CNAME` file is needed: with GitHub Actions deploys, the domain is set in the repo settings instead.

1. **Verify the domain with GitHub first.** In your GitHub account (not the repo): **Settings → Pages → Add a domain**. GitHub gives you a `TXT` record; add it at your DNS provider and click **Verify**. This stops anyone else from claiming your domain on GitHub.
2. **Add DNS records at your DNS provider.** If you use Cloudflare, set every record's proxy status to **DNS only** (grey cloud), or GitHub can't issue the HTTPS certificate.

   | Type | Name | Content |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `saloni-11.github.io` |

3. In the repo: **Settings → Pages → Custom domain**, enter `salonisamant.com` and save. When the DNS check passes, tick **Enforce HTTPS**.

The **Enforce HTTPS** box stays greyed out until GitHub has issued the certificate. That usually takes minutes, occasionally up to a day.
