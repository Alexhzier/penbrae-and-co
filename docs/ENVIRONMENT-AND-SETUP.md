# WordPress & Hosting Setup

## 1. Local Development with Docker Compose

To run the full WordPress + WooCommerce stack locally with Docker:

```bash
docker compose up -d
```

The `wpcli` container sets up:
1. WordPress 6.7 (`http://localhost:8080`) and MariaDB 10.11.
2. WooCommerce with store currency set to **GBP (`£`)** and base location set to **Cardiff, UK**.
3. The custom `penbrae` theme (`wp-content/themes/penbrae`).
4. Pretty permalinks (`/%postname%/`) and initial categories for The Three Stalls (`teas`, `spices`, `chillies`).

## 2. Deploying to Managed WordPress Hosting

1. Upload `wp-content/themes/penbrae/` to `/wp-content/themes/` on the server.
2. Activate **WooCommerce** in **Plugins**.
3. Activate **Penbrae & Co** in **Appearance → Themes**.
4. Go to **Settings → Permalinks**, select **Post name**, and save to flush rewrite rules for `/maker/{slug}`, `/story/{slug}`, and `/region/{slug}`.
5. Optional: Use **Appearance → Penbrae Sample Data** to seed the initial stall categories, regions, and starter entries.

## 3. Standalone Preview Server

For quick frontend design work or static client previews without PHP/MySQL:

```bash
npm start
```

Runs at `http://localhost:3847`.
