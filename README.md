# Penbrae & Co Ltd

Custom editorial e-commerce website and WordPress/WooCommerce theme built for **Penbrae & Co Ltd** (Cardiff, Wales) — importers of small-lot orthodox teas, heirloom rhizomes, and hearth-smoked chillies from Northeast India.

## Overview

Most online tea and spice shops are built around a standard catalogue grid. For Penbrae & Co, I wanted the site to read more like an independent print publication or an archival field ledger from a tasting room in Cardiff—where every harvest lot is tied directly to the grower, elevation, and preservation method behind it.

The storefront is divided into three distinct environments (**The Tea Stall**, **The Spice Stall**, and **The Chilli Stall**), each with its own colour temperature and pacing, connected to an interactive Leaflet map of Northeast India (Assam, Meghalaya, Nagaland, Arunachal Pradesh, and Manipur) and long-form harvest stories.

## Project Structure

- `wp-content/themes/penbrae/` — Custom WordPress + WooCommerce PHP theme, custom post types (`penbrae_maker`, `penbrae_story`), regional taxonomy (`penbrae_region`), admin meta boxes, and CSS/JS assets.
- `preview-server/server.js` — Lightweight Node server for local design and client previewing without needing a full PHP/MySQL stack running locally.
- `scripts/build-vercel.js` & `public/` — Static build generator used for deploying client previews to Vercel.
- `docker-compose.yml` & `.wp-env.json` — Local WordPress + WooCommerce + MariaDB container setup.

## Running Locally

### Client Preview Server (Node.js)

```bash
npm start
```

Opens at `http://localhost:3847`.

### Full WordPress + WooCommerce Stack (Docker)

```bash
docker compose up -d
```

Opens at `http://localhost:8080` with WooCommerce, GBP (`£`) currency, and the `penbrae` theme pre-configured.

## Deploying Preview to Vercel

```bash
npm run build
npx vercel --prod
```

Or connect the repository directly in the Vercel dashboard (configured via `vercel.json`).

## Notes & Handover Docs

- [WordPress & Hosting Setup](./docs/ENVIRONMENT-AND-SETUP.md)
- [CMS Editing Guide](./docs/CLIENT-ADMIN-GUIDE.md)
- [Pre-Launch Checklist](./docs/PRODUCTION-CHECKLIST.md)
