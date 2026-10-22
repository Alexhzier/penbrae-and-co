# Pre-Launch Checklist

Items to configure in WordPress + WooCommerce before switching from staging/test mode to live trading:

1. **Stripe / WooCommerce Payments (`WooCommerce → Settings → Payments`)**
   - Add live publishable and secret keys (`pk_live_...`, `sk_live_...`) once the Penbrae & Co Ltd merchant account is verified.
2. **UK Shipping Zones (`WooCommerce → Settings → Shipping`)**
   - Set final Royal Mail Tracked / courier rates from Cardiff and any free-shipping threshold in GBP (`£`).
3. **UK VAT / Tax Classes (`WooCommerce → Settings → Tax`)**
   - Confirm zero-rated vs. standard-rated foodstuff rules for whole-leaf teas, culinary spices, and chillies.
4. **Transactional Email (SMTP)**
   - Connect Postmark, SES, or SendGrid for `penbrae.co.uk` order receipts and newsletter double-opt-in emails.
5. **Final Harvest Lots & Photography**
   - Swap studio preview studies and sample lot numbers with final arrival weights, batch codes, and field photography in the WordPress admin.
