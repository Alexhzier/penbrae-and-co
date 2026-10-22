<?php
/**
 * WooCommerce Product Specimen Item (woocommerce/content-product.php)
 *
 * @package Penbrae
 * @version 9.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product;

if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

$post_id        = $product->get_id();
$lot_code       = get_post_meta( $post_id, '_penbrae_lot_code', true ) ?: 'LOT 26-A';
$elevation      = get_post_meta( $post_id, '_penbrae_elevation', true ) ?: '140m ASL';
$tasting_notes  = get_post_meta( $post_id, '_penbrae_tasting_notes', true ) ?: wp_strip_all_tags( $product->get_short_description() );
$maker_id       = get_post_meta( $post_id, '_penbrae_maker_id', true );
$story_id       = get_post_meta( $post_id, '_penbrae_story_id', true );
$regions        = wp_get_post_terms( $post_id, 'penbrae_region', array( 'fields' => 'names' ) );
$region_display = ( ! is_wp_error( $regions ) && ! empty( $regions ) ) ? $regions[0] : 'Northeast India';
$default_img    = PENBRAE_THEME_URI . '/assets/images/stall-tea-orthodox.jpg';
?>
<article <?php wc_product_class( 'product-specimen', $product ); ?>
	data-specimen-item
	data-region="<?php echo esc_attr( strtolower( $region_display ) ); ?>"
	data-price="<?php echo esc_attr( $product->get_price() ); ?>"
	data-elevation="<?php echo esc_attr( preg_replace( '/[^0-9]/', '', $elevation ) ); ?>">

	<div class="product-specimen__header">
		<span><?php echo esc_html( $lot_code ); ?></span>
		<span><?php echo esc_html( $elevation . ' · ' . strtoupper( $region_display ) ); ?></span>
	</div>

	<a href="<?php the_permalink(); ?>" class="product-specimen__media" aria-label="<?php echo esc_attr( get_the_title() ); ?>">
		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'penbrae-specimen-portrait', array( 'class' => 'product-specimen__img' ) ); ?>
		<?php else : ?>
			<img src="<?php echo esc_url( $default_img ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>" class="product-specimen__img" loading="lazy">
		<?php endif; ?>
	</a>

	<div class="product-specimen__body">
		<div class="product-specimen__region"><?php echo esc_html( $region_display ); ?></div>
		<h2 class="product-specimen__title">
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</h2>
		<p class="product-specimen__notes"><?php echo esc_html( $tasting_notes ); ?></p>

		<div class="product-specimen__provenance-links">
			<?php if ( $maker_id ) : ?>
				<a href="<?php echo esc_url( get_permalink( $maker_id ) ); ?>"><?php esc_html_e( 'Maker Dossier', 'penbrae' ); ?></a>
			<?php endif; ?>
			<?php if ( $story_id ) : ?>
				<a href="<?php echo esc_url( get_permalink( $story_id ) ); ?>"><?php esc_html_e( 'Provenance Story', 'penbrae' ); ?></a>
			<?php endif; ?>
		</div>
	</div>

	<div class="product-specimen__footer">
		<div class="product-specimen__price">
			<?php echo wp_kses_post( $product->get_price_html() ); ?>
		</div>
		<button type="button" class="product-specimen__add-btn"
			data-add-to-basket
			data-product-id="<?php echo esc_attr( $product->get_slug() ); ?>"
			data-product-title="<?php echo esc_attr( $product->get_name() ); ?>"
			data-product-price="<?php echo esc_attr( $product->get_price() ); ?>"
			data-product-url="<?php echo esc_url( get_permalink() ); ?>"
			data-product-region="<?php echo esc_attr( $region_display ); ?>">
			<?php esc_html_e( 'Add to Basket +', 'penbrae' ); ?>
		</button>
	</div>
</article>
