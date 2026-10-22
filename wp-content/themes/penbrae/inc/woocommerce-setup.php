<?php
/**
 * WooCommerce Native Integration & Editorial Customisations
 *
 * Rules enforced:
 * - Default store currency: GBP (£)
 * - Uses native WooCommerce mechanisms for pricing, taxation, shipping, and inventory
 * - Does NOT hardcode UK VAT rates, shipping rates, or live merchant credentials
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Disable default WooCommerce bloated stylesheets so Penbrae's editorial CSS governs
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

/**
 * Ensure default currency is GBP (£) unless changed in WooCommerce -> Settings
 */
function penbrae_default_gbp_currency( $currency ) {
	return $currency ? $currency : 'GBP';
}
add_filter( 'woocommerce_currency', 'penbrae_default_gbp_currency' );

/**
 * Determine the active Stall atmosphere slug ('teas', 'spices', or 'chillies')
 */
function penbrae_get_current_stall_slug() {
	if ( function_exists( 'is_product_category' ) && is_product_category() ) {
		$term = get_queried_object();
		if ( $term && ! is_wp_error( $term ) ) {
			if ( in_array( $term->slug, array( 'teas', 'spices', 'chillies' ), true ) ) {
				return $term->slug;
			}
		}
	}
	if ( function_exists( 'is_product' ) && is_product() ) {
		global $post;
		$terms = get_the_terms( $post->ID, 'product_cat' );
		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $t ) {
				if ( in_array( $t->slug, array( 'teas', 'spices', 'chillies' ), true ) ) {
					return $t->slug;
				}
			}
		}
	}
	return 'teas';
}

/**
 * Add Stall atmosphere class to <body> for contextual editorial styling
 */
function penbrae_stall_body_classes( $classes ) {
	if ( function_exists( 'is_woocommerce' ) && is_woocommerce() ) {
		$stall     = penbrae_get_current_stall_slug();
		$classes[] = 'stall-theme-' . sanitize_html_class( $stall );
	}
	if ( function_exists( 'is_product' ) && is_product() ) {
		$classes[] = 'has-sticky-pdp-bar';
	}
	return $classes;
}
add_filter( 'body_class', 'penbrae_stall_body_classes' );

/**
 * WooCommerce AJAX Basket Count Fragment
 */
function penbrae_woocommerce_header_add_to_cart_fragment( $fragments ) {
	if ( ! function_exists( 'WC' ) || ! WC()->cart ) {
		return $fragments;
	}
	ob_start();
	?>
	<span class="basket-count-pill" data-basket-count><?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?></span>
	<?php
	$fragments['span[data-basket-count]'] = ob_get_clean();
	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'penbrae_woocommerce_header_add_to_cart_fragment' );
