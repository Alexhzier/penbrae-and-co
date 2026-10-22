<?php
/**
 * Template Name: Terms and Conditions
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
				<span class="kicker-index"><?php esc_html_e( 'COMMERCIAL TERMS', 'penbrae' ); ?></span>
				<h1 style="font-size:2.3rem;margin-top:0.4rem;"><?php esc_html_e( 'Terms & Conditions', 'penbrae' ); ?></h1>
				<p style="font-size:0.86rem;color:var(--color-ink-muted);">
					<?php esc_html_e( 'Penbrae & Co Ltd · Registered in England & Wales (Cardiff).', 'penbrae' ); ?>
				</p>
			</aside>

			<div class="col-editorial-essay prose-measure">
				<h2><?php esc_html_e( 'I. Store Currency & Pricing', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'All prices across the Tea, Spice, and Chilli Stalls are stated in Pounds Sterling (GBP £). Applicable UK taxation and shipping fees are governed by the active configuration in WooCommerce Settings and displayed clearly prior to order submission.', 'penbrae' ); ?>
				</p>

				<h2><?php esc_html_e( 'II. Small-Batch Agricultural Availability', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'Because Penbrae & Co Ltd imports seasonal smallholder lots from Northeast India, stock quantities are finite and subject to harvest availability.', 'penbrae' ); ?>
				</p>

				<h2><?php esc_html_e( 'III. Legal Review Notice', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( '[Client Legal Slot — Ratify final company registration number, VAT registration status, and statutory cancellation terms in WordPress Admin → Pages → Terms & Conditions prior to enabling live payment credentials.]', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
