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

## Adding your Tableau dashboard

1. **Size it.** In Tableau, open the dashboard. In the Dashboard pane under **Size**, choose **Fixed size**, width **980**. Set the height to whatever fits everything without clipping (Dashboard 1 uses 900). The site frame grows to match this height automatically.
2. **Publish it.** Go to **Server → Tableau Public → Save to Tableau Public As…** (it's under the Server menu, not File). Accept if it asks to extract the data. Give the workbook a stable name.
3. **Check visibility.** On public.tableau.com, make sure the viz isn't hidden and that access is allowed. Otherwise the embed won't load.
4. **Copy the link.** Click **Share** on the viz page and copy the link. A profile link (`/app/profile/<user>/viz/...`) or a `/views/...` link both work, and anything after `?` is ignored.
5. **Paste it** into your dashboard's `views[].url` in `src/data/content.js`. Run `npm run dev` to check it, then commit and push.

**Updating later:** save to Tableau Public again under the **same workbook name** and overwrite it. The site loads the dashboard live, so no code change is needed. Saving under a new name, or renaming the dashboard sheet, changes the URL, so you'd need to update `content.js`.

**Phones:** a 980px fixed-size dashboard needs sideways scrolling on a phone. To fix that, add a **Phone** layout in Tableau's Device Preview. Tableau Public serves it automatically on small screens.

## Deploy

Deployed on Netlify. Build settings are in `netlify.toml`
(build command `npm run build`, publish directory `dist`).
Every push to `main` redeploys the site.
