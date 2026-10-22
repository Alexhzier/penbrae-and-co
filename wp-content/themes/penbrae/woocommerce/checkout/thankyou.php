<?php
/**
 * Bespoke WooCommerce Order Confirmation Template (woocommerce/checkout/thankyou.php)
 *
 * @package Penbrae
 * @version 8.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-8" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-6);">
				<span class="kicker-index"><?php esc_html_e( 'DISPATCH DOSSIER RECORDED · TEST ENVIRONMENT', 'penbrae' ); ?></span>
				<h1 style="margin:0.4rem 0 1rem 0;"><?php esc_html_e( 'Thank You. Your Order Has Been Logged in the Cardiff Ledger.', 'penbrae' ); ?></h1>
				<p class="lead-standfirst">
					<?php esc_html_e( 'Reference: PB-TEST-2026-084 · Status: Test Mode Verification Order (No Live Payment Captured).', 'penbrae' ); ?>
				</p>
				<p style="color:var(--color-ink-secondary);">
					<?php esc_html_e( 'While your seasonal lots are prepared, we invite you to explore the provenance stories and maker profiles connected to your harvest.', 'penbrae' ); ?>
				</p>
				<div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:var(--space-5);">
					<a href="<?php echo esc_url( home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' ) ); ?>" class="btn-editorial"><?php esc_html_e( 'Read Featured Provenance Story →', 'penbrae' ); ?></a>
					<a href="<?php echo esc_url( home_url( '/makers' ) ); ?>" class="btn-editorial btn-editorial--outline"><?php esc_html_e( 'Explore Maker Map →', 'penbrae' ); ?></a>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
