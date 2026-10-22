# Penbrae & Co Ltd — Client Content Management Guide (No-Code WordPress Admin)

Every piece of editorial and commercial content on the Penbrae & Co website can be updated from the WordPress dashboard without editing code.

---

## 1. Managing Products & The Three Stalls (`WooCommerce → Products`)

1. Navigate to **Products → Add New** (or edit an existing product).
2. **Stall Assignment**: In the right-hand **Product categories** panel, assign the product to one of the three primary Stalls:
   - `The Tea Stall` (slug: `teas`) — automatically applies the calm Deep Forest Green editorial atmosphere.
   - `The Spice Stall` (slug: `spices`) — automatically applies the warm Muted Terracotta editorial atmosphere.
   - `The Chilli Stall` (slug: `chillies`) — automatically applies the bold Deep Oxblood editorial atmosphere and enables the Scoville Heat Index scale.
3. **Provenance Region**: In the **Provenance Regions** panel (`penbrae_region` taxonomy), tick the Northeast Indian state (e.g., `Assam`, `Meghalaya`, `Nagaland`, `Arunachal Pradesh`, `Manipur`, `Sikkim`). This powers both the Stall region filter bar and non-linear regional browsing.
4. **Pricing, Stock & Variants**:
   - In the standard **Product data** box, enter the price in **GBP (`£`)**, SKU, and inventory stock status.
   - For multi-size offerings (e.g., *75g Archival Caddy*, *150g Refill Pouch*, *25g Tasting Sample*), select **Variable product** and add weight attributes.
5. **Penbrae Provenance, Tasting Ledger & Non-Linear Relationships Meta Box**:
   - **Associated Maker / Producer**: Select the Maker profile (`penbrae_maker`) from the dropdown.
   - **Dedicated Product Provenance Story**: Select the long-form Product Story (`penbrae_story`) from the dropdown.
   - **Archival Lot Number**: e.g., `LOT 26-A`.
   - **Botanical Nomenclature (Latin)**: e.g., `Camellia sinensis var. assamica`.
   - **Elevation & Harvest Window**: e.g., `140m ASL` and `Late November (Autumnal Tippy Flush)`.
   - **Tasting Notes & Preparation Guidance**: Populates the structured ledger table on the Product Details page.

---

## 2. Managing Makers & Map Coordinates (`Makers & Producers`)

1. Navigate to **Makers & Producers → Add Maker Dossier**.
2. Enter the maker or smallholder collective's verified name, biography (in the Gutenberg Block Editor), and short excerpt.
3. In the **Maker Geographical Coordinates, Craft & Documentary Media** box:
   - **Map Marker Code**: e.g., `M-01`.
   - **Verified Latitude & Longitude**: Decimal coordinates in Northeast India (e.g., `27.4728`, `94.9120`). This automatically places the pin on the interactive Leaflet map on **Meet the Makers** (`/makers`) and adds the row to the accessible directory.
   - **Field Audio Recording URL & Verbatim Transcript**: Paste the MP3/OGG URL from the Media Library and provide the full text transcript (required for WCAG 2.2 AA accessibility).
   - **Documentary Video URL**: Paste the MP4 URL (configured for user-initiated playback; never autoplays with audio).

---

## 3. Managing Product Provenance Stories (`Product Stories`)

1. Navigate to **Product Stories → Add Product Story**.
2. Write the long-form documentary story using Gutenberg blocks (paragraphs, images with captions, pull quotes).
3. In the **Story Provenance Connections** box:
   - Select the **Connected WooCommerce Product** (this automatically populates the sticky "Acquire This Lot" ribbon at the top of the story and links back to the Product Details page).
   - Select the **Connected Maker Profile**.

---

## 4. Managing The Journal (`Posts`)

1. Navigate to **Posts → Add New**.
2. Compose your essay and connect any featured ingredients or makers using the **Story Provenance Connections** meta box so the marginalia sidebar displays live links to the relevant WooCommerce products.
