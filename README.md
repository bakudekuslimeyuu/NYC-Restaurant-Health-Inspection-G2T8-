# NYC-Restaurant-Health-Inspection-G2T8-

Comparing NYC DOHMH restaurant inspection results with Yelp star ratings and reviews.

Built with React, Vite and Tailwind CSS. Dashboards are embedded with the Tableau Embedding API v3.

## Run locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  data/content.js      all text, team names and Tableau links
  pages/               Home, Problem, Overview, Dashboard, Redesign
  components/          TableauFrame, InsightsAccordion, Reveal, ...
  components/layout/   Sidebar, TopBar, Page
  hooks/               useHashRoute, useNameCycle
```

## Deploy

Pushing to `main` builds the site and publishes it to GitHub Pages
(Settings → Pages → Source: GitHub Actions).
