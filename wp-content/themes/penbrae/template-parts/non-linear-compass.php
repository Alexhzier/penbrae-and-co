<?php
/**
 * Template Part: Non-Linear Provenance Compass
 * Connects Products <-> Makers <-> Product Stories <-> Regions <-> Journal
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$product_url   = isset( $args['product_url'] ) ? $args['product_url'] : home_url( '/product/upper-assam-tippy-orthodox' );
$product_title = isset( $args['product_title'] ) ? $args['product_title'] : 'Upper Assam Tippy Orthodox Reserve (Lot 26-A)';
$maker_url     = isset( $args['maker_url'] ) ? $args['maker_url'] : home_url( '/maker/upper-assam-orthodox-collective' );
$maker_title   = isset( $args['maker_title'] ) ? $args['maker_title'] : 'Brahmaputra Smallholder Tea Collective [Sample]';
$story_url     = isset( $args['story_url'] ) ? $args['story_url'] : home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' );
$story_title   = isset( $args['story_title'] ) ? $args['story_title'] : 'Mist Over the Brahmaputra: The Autumn Tippy Pluck';
$journal_url   = isset( $args['journal_url'] ) ? $args['journal_url'] : home_url( '/journal/smoke-mist-and-limestone-terroir' );
$journal_title = isset( $args['journal_title'] ) ? $args['journal_title'] : 'Smoke, Mist & Limestone: Reading the Terroir of Northeast India';
?>
<section class="provenance-compass" aria-label="<?php esc_attr_e( 'Non-Linear Provenance Exploration', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div class="provenance-compass__header">
			<div>
				<span class="kicker-index"><?php esc_html_e( 'NON-LINEAR PROVENANCE GRAPH · CONTINUE EXPLORING', 'penbrae' ); ?></span>
				<h2 style="font-size:2rem;margin:0.35rem 0 0 0;"><?php esc_html_e( 'Follow the Thread Across Ingredient, Maker, Region & Essay', 'penbrae' ); ?></h2>
			</div>
			<a href="<?php echo esc_url( home_url( '/makers' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Open Northeast India Interactive Atlas →', 'penbrae' ); ?></a>
		</div>

		<div class="provenance-compass__nodes">
			<a href="<?php echo esc_url( $product_url ); ?>" class="provenance-node">
				<span class="provenance-node__type"><?php esc_html_e( '01 · THE INGREDIENT (PRODUCT)', 'penbrae' ); ?></span>
				<h3 class="provenance-node__title"><?php echo esc_html( $product_title ); ?></h3>
				<p class="provenance-node__meta"><?php esc_html_e( 'View tasting profile, preparation notes & acquire in GBP (£) →', 'penbrae' ); ?></p>
			</a>

			<a href="<?php echo esc_url( $maker_url ); ?>" class="provenance-node">
				<span class="provenance-node__type"><?php esc_html_e( '02 · THE PRODUCER (MAKER PROFILE)', 'penbrae' ); ?></span>
				<h3 class="provenance-node__title"><?php echo esc_html( $maker_title ); ?></h3>
				<p class="provenance-node__meta"><?php esc_html_e( 'Explore producer biography, field audio & harvest discipline →', 'penbrae' ); ?></p>
			</a>

			<a href="<?php echo esc_url( $story_url ); ?>" class="provenance-node">
				<span class="provenance-node__type"><?php esc_html_e( '03 · PROVENANCE MONOGRAPH (STORY)', 'penbrae' ); ?></span>
				<h3 class="provenance-node__title"><?php echo esc_html( $story_title ); ?></h3>
				<p class="provenance-node__meta"><?php esc_html_e( 'Read the long-form documentary story of how this lot is crafted →', 'penbrae' ); ?></p>
			</a>

			<a href="<?php echo esc_url( $journal_url ); ?>" class="provenance-node">
				<span class="provenance-node__type"><?php esc_html_e( '04 · THE JOURNAL & REGION', 'penbrae' ); ?></span>
				<h3 class="provenance-node__title"><?php echo esc_html( $journal_title ); ?></h3>
				<p class="provenance-node__meta"><?php esc_html_e( 'Read regional cultural essays & culinary pairing dispatches →', 'penbrae' ); ?></p>
			</a>
		</div>
	</div>
</section>
