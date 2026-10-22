<?php
/**
 * Bespoke WooCommerce Basket Template (woocommerce/cart/cart.php)
 * Styled with Penbrae's archival ledger design system.
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
		<div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
			<div>
				<span class="kicker-index"><?php esc_html_e( 'COMMERCE LEDGER · CARDIFF DISPATCH', 'penbrae' ); ?></span>
				<h1 style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'Your Shopping Basket', 'penbrae' ); ?></h1>
			</div>
			<a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>" class="link-editorial"><?php esc_html_e( '← Continue Browsing The Stalls', 'penbrae' ); ?></a>
		</div>

		<div class="editorial-grid">
			<div class="col-span-8">
				<div style="overflow-x:auto;">
					<table class="commerce-ledger-table" aria-label="<?php esc_attr_e( 'Shopping Basket Items', 'penbrae' ); ?>">
						<thead>
							<tr>
								<th scope="col"><?php esc_html_e( 'Harvest Lot & Region', 'penbrae' ); ?></th>
								<th scope="col"><?php esc_html_e( 'Format', 'penbrae' ); ?></th>
								<th scope="col"><?php esc_html_e( 'Unit Price (GBP)', 'penbrae' ); ?></th>
								<th scope="col"><?php esc_html_e( 'Quantity', 'penbrae' ); ?></th>
								<th scope="col"><?php esc_html_e( 'Line Total', 'penbrae' ); ?></th>
							</tr>
						</thead>
						<tbody id="penbrae-basket-page-rows">
							<?php
							if ( function_exists( 'WC' ) && WC()->cart && ! WC()->cart->is_empty() ) :
								foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) :
									$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
									$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
									if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 ) :
										$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
										?>
										<tr>
											<td>
												<a href="<?php echo esc_url( $product_permalink ); ?>" style="font-family:var(--font-editorial);font-size:1.3rem;color:var(--color-charcoal);text-decoration:none;">
													<?php echo wp_kses_post( $_product->get_name() ); ?>
												</a>
											</td>
											<td style="font-family:var(--font-mono);font-size:0.8rem;"><?php esc_html_e( 'Standard Lot', 'penbrae' ); ?></td>
											<td class="tabular-nums" style="font-family:var(--font-mono);"><?php echo wp_kses_post( WC()->cart->get_product_price( $_product ) ); ?></td>
											<td style="font-family:var(--font-mono);"><?php echo esc_html( $cart_item['quantity'] ); ?></td>
											<td class="tabular-nums" style="font-family:var(--font-mono);font-weight:500;"><?php echo wp_kses_post( WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ) ); ?></td>
										</tr>
										<?php
									endif;
								endforeach;
							endif;
							?>
						</tbody>
					</table>
				</div>
			</div>

			<aside class="col-span-4">
				<div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
					<span class="kicker-index"><?php esc_html_e( 'BASKET SUMMARY (GBP)', 'penbrae' ); ?></span>
					<div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.25rem 0;margin:1rem 0;border-top:var(--rule-hairline);border-bottom:var(--rule-hairline);">
						<span style="font-family:var(--font-mono);font-size:0.78rem;text-transform:uppercase;"><?php esc_html_e( 'Subtotal', 'penbrae' ); ?></span>
						<span id="penbrae-basket-page-subtotal" class="tabular-nums" style="font-family:var(--font-editorial);font-size:2rem;">
							<?php echo ( function_exists( 'WC' ) && WC()->cart ) ? wp_kses_post( WC()->cart->get_cart_subtotal() ) : '£0.00'; ?>
						</span>
					</div>
					<p style="font-size:0.86rem;color:var(--color-ink-secondary);margin-bottom:1.5rem;">
						<?php esc_html_e( 'Shipping & applicable UK tax settings are calculated dynamically at checkout via WooCommerce shipping zones and tax classes.', 'penbrae' ); ?>
					</p>
					<a href="<?php echo esc_url( home_url( '/checkout' ) ); ?>" class="btn-editorial" style="width:100%;justify-content:center;">
						<?php esc_html_e( 'Proceed to Checkout →', 'penbrae' ); ?>
					</a>
				</div>
			</aside>
		</div>
	</div>
</section>

<?php
get_footer();
