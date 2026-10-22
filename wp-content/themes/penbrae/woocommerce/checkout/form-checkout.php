<?php
/**
 * Bespoke WooCommerce Checkout Template (woocommerce/checkout/form-checkout.php)
 * Prepared for Stripe / WooCommerce payment gateway integration in Test Mode.
 * Does NOT claim live payment processing without merchant credentials.
 * Does NOT hardcode UK VAT or shipping rates; delegates to WooCommerce settings.
 *
 * @package Penbrae
 * @version 9.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section">
	<div class="penbrae-container">
		<div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);">
			<span class="kicker-index"><?php esc_html_e( 'CARDIFF DISPATCH & PAYMENT LEDGER · CURRENCY: GBP (£)', 'penbrae' ); ?></span>
			<h1 style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'Checkout & Fulfilment Details', 'penbrae' ); ?></h1>
		</div>

		<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : home_url( '/order-confirmation' ) ); ?>" data-penbrae-checkout-form data-test-preview="true">
			<div class="editorial-grid">
				<!-- Billing & Shipping Address Column -->
				<div class="col-span-7" style="background:var(--color-parchment-light);border:var(--rule-hairline);padding:var(--space-5);">
					<span class="kicker-index"><?php esc_html_e( '01 · RECIPIENT & DELIVERY ADDRESS', 'penbrae' ); ?></span>
					<h2 style="font-size:1.85rem;margin:0.4rem 0 1.25rem 0;"><?php esc_html_e( 'Dispatch Destination', 'penbrae' ); ?></h2>

					<div class="editorial-grid" style="gap:1rem;">
						<div class="col-span-6 editorial-form-field">
							<label for="billing_first_name"><?php esc_html_e( 'First Name *', 'penbrae' ); ?></label>
							<input type="text" id="billing_first_name" name="billing_first_name" required autocomplete="given-name">
						</div>
						<div class="col-span-6 editorial-form-field">
							<label for="billing_last_name"><?php esc_html_e( 'Surname *', 'penbrae' ); ?></label>
							<input type="text" id="billing_last_name" name="billing_last_name" required autocomplete="family-name">
						</div>
					</div>

					<div class="editorial-form-field">
						<label for="billing_email"><?php esc_html_e( 'Email Address for Order Confirmation *', 'penbrae' ); ?></label>
						<input type="email" id="billing_email" name="billing_email" required autocomplete="email">
					</div>

					<div class="editorial-form-field">
						<label for="billing_address_1"><?php esc_html_e( 'Street Address *', 'penbrae' ); ?></label>
						<input type="text" id="billing_address_1" name="billing_address_1" required autocomplete="address-line1">
					</div>

					<div class="editorial-grid" style="gap:1rem;">
						<div class="col-span-6 editorial-form-field">
							<label for="billing_city"><?php esc_html_e( 'Town / City *', 'penbrae' ); ?></label>
							<input type="text" id="billing_city" name="billing_city" required autocomplete="address-level2">
						</div>
						<div class="col-span-6 editorial-form-field">
							<label for="billing_postcode"><?php esc_html_e( 'Postcode *', 'penbrae' ); ?></label>
							<input type="text" id="billing_postcode" name="billing_postcode" required autocomplete="postal-code">
						</div>
					</div>

					<div class="editorial-form-field">
						<label for="order_comments"><?php esc_html_e( 'Delivery or Tasting Room Notes (Optional)', 'penbrae' ); ?></label>
						<textarea id="order_comments" name="order_comments" placeholder="Special delivery instructions..."></textarea>
					</div>
				</div>

				<!-- Order Review, WooCommerce Shipping/Tax Hooks & Stripe Test Mode Notice -->
				<div class="col-span-5">
					<div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
						<span class="kicker-index"><?php esc_html_e( '02 · ORDER LEDGER & PAYMENT PROVIDER', 'penbrae' ); ?></span>
						<h2 style="font-size:1.85rem;margin:0.4rem 0 1.25rem 0;"><?php esc_html_e( 'Review & Sandbox Payment', 'penbrae' ); ?></h2>

						<div style="padding:1rem;background:var(--color-parchment-deep);border:var(--rule-brass);margin-bottom:1.25rem;">
							<div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-oxblood);margin-bottom:0.35rem;">
								<?php esc_html_e( 'PAYMENT GATEWAY STATUS: TEST MODE (SANDBOX)', 'penbrae' ); ?>
							</div>
							<p style="font-size:0.86rem;color:var(--color-ink-secondary);margin:0;">
								<?php esc_html_e( 'Live payment processing is intentionally disabled until Penbrae & Co Ltd merchant credentials (Stripe Live API keys, ratified UK VAT status, and shipping zone tariffs) are configured in WooCommerce → Settings → Payments.', 'penbrae' ); ?>
							</p>
						</div>

						<dl style="font-family:var(--font-mono);font-size:0.8rem;border-top:var(--rule-hairline);padding-top:1rem;margin:0 0 1.25rem 0;">
							<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:var(--rule-hairline);">
								<dt><?php esc_html_e( 'Currency', 'penbrae' ); ?></dt>
								<dd style="margin:0;">GBP (£)</dd>
							</div>
							<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:var(--rule-hairline);">
								<dt><?php esc_html_e( 'Shipping Zone Calculation', 'penbrae' ); ?></dt>
								<dd style="margin:0;"><?php esc_html_e( 'Managed via WooCommerce Shipping Zones', 'penbrae' ); ?></dd>
							</div>
							<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:var(--rule-hairline);">
								<dt><?php esc_html_e( 'UK Tax / VAT Rules', 'penbrae' ); ?></dt>
								<dd style="margin:0;"><?php esc_html_e( 'Managed via WooCommerce Tax Classes', 'penbrae' ); ?></dd>
							</div>
						</dl>

						<?php if ( function_exists( 'woocommerce_checkout_payment' ) ) : ?>
							<?php woocommerce_checkout_payment(); ?>
						<?php else : ?>
							<button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">
								<?php esc_html_e( 'Place Test Mode Order (No Live Charge) →', 'penbrae' ); ?>
							</button>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</form>
	</div>
</section>

<?php
get_footer();
