<?php
/**
 * Template Name: Shipping & Returns Information
 * Template Post Type: page
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<aside class="col-editorial-marginalia">
				<span class="kicker-index"><?php esc_html_e( 'FULFILMENT GOVERNANCE', 'penbrae' ); ?></span>
				<h1 style="font-size:2.3rem;margin-top:0.4rem;"><?php esc_html_e( 'Shipping & Returns Information', 'penbrae' ); ?></h1>
				<p style="font-size:0.86rem;color:var(--color-ink-muted);">
					<?php esc_html_e( 'Editable via WordPress Admin → Pages. Live shipping tariffs and tax classes are governed dynamically by WooCommerce → Settings → Shipping.', 'penbrae' ); ?>
				</p>
			</aside>

			<div class="col-editorial-essay prose-measure">
				<h2><?php esc_html_e( 'I. Cardiff Dispatch & Packaging', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'All Penbrae & Co Ltd orders are inspected, packed, and dispatched from Cardiff, Wales. Teas, spices, and chillies are sealed in UV-opaque archival caddies, glass jars, or barrier refill pouches to protect volatile aromatics and curcuminoids during transit.', 'penbrae' ); ?>
				</p>

				<h2><?php esc_html_e( 'II. Shipping Zones & Tariffs (WooCommerce Configured)', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'In accordance with commerce governance requirements, shipping rates, free-shipping thresholds, and regional carrier options are not hardcoded into theme templates. Instead, exact postage in GBP (£) is calculated dynamically at checkout based on the recipient postcode and the active Shipping Zones configured by Penbrae & Co Ltd in WooCommerce.', 'penbrae' ); ?>
				</p>

				<h2><?php esc_html_e( 'III. Returns & Perishable Foodstuff Governance', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( '[Client Policy Slot — Ratify before live launch] Because teas, spices, and chillies are culinary foodstuffs, hygiene seals must remain unbroken for any return eligibility, except where goods arrive damaged in transit. Please contact our Cardiff desk with your order reference if any vessel arrives compromised.', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
