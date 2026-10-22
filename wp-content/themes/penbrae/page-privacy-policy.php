<?php
/**
 * Template Name: Privacy Policy & UK GDPR
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
				<span class="kicker-index"><?php esc_html_e( 'DATA PROTECTION & UK GDPR', 'penbrae' ); ?></span>
				<h1 style="font-size:2.3rem;margin-top:0.4rem;"><?php esc_html_e( 'Privacy Policy', 'penbrae' ); ?></h1>
				<p style="font-size:0.86rem;color:var(--color-ink-muted);">
					<?php esc_html_e( 'Data Controller: Penbrae & Co Ltd, Cardiff, Wales.', 'penbrae' ); ?>
				</p>
			</aside>

			<div class="col-editorial-essay prose-measure">
				<h2><?php esc_html_e( 'I. Lawful Basis & Order Fulfilment', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'Penbrae & Co Ltd collects only the personal data necessary to fulfil orders placed through WooCommerce (name, delivery address, billing address, email address, and payment token processed securely via your chosen payment provider) or to deliver the Penbrae Dispatch when explicit opt-in consent has been granted.', 'penbrae' ); ?>
				</p>

				<h2><?php esc_html_e( 'II. Explicit Marketing Consent', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'We never pre-tick marketing consent boxes. Subscribers to the Penbrae Dispatch register via an explicit consent checkbox with timestamped verification and may withdraw consent at any time.', 'penbrae' ); ?>
				</p>

				<h2><?php esc_html_e( 'III. External Media & Rate-Limited Social Caching', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'OpenStreetMap tiles are used on the Meet the Makers atlas to display regional origin coordinates. Curated Instagram field notes are fetched server-side and cached via WordPress transients so visitor browsers are not subjected to invasive cross-site ad-tracking pixels.', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
