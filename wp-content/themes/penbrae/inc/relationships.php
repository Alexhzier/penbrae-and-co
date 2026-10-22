<?php
/**
 * Non-Linear Browsing Graph Helpers
 * Traverses relationships between Products, Makers, Stories, Regions, and Journal Posts.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get all WooCommerce Products associated with a Maker ID
 */
function penbrae_get_products_by_maker( $maker_id, $limit = 6 ) {
	return get_posts(
		array(
			'post_type'      => 'product',
			'posts_per_page' => $limit,
			'post_status'    => 'publish',
			'meta_query'     => array(
				array(
					'key'   => '_penbrae_maker_id',
					'value' => (string) $maker_id,
				),
			),
		)
	);
}

/**
 * Get all Product Stories associated with a Maker ID
 */
function penbrae_get_stories_by_maker( $maker_id, $limit = 4 ) {
	return get_posts(
		array(
			'post_type'      => 'penbrae_story',
			'posts_per_page' => $limit,
			'post_status'    => 'publish',
			'meta_query'     => array(
				array(
					'key'   => '_penbrae_maker_id',
					'value' => (string) $maker_id,
				),
			),
		)
	);
}

/**
 * Build the JSON payload for the Leaflet Northeast India Map (Page 5)
 */
function penbrae_get_makers_map_payload() {
	$makers  = get_posts(
		array(
			'post_type'      => 'penbrae_maker',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
		)
	);
	$payload = array();

	foreach ( $makers as $maker ) {
		$lat = (float) get_post_meta( $maker->ID, '_penbrae_latitude', true );
		$lng = (float) get_post_meta( $maker->ID, '_penbrae_longitude', true );
		if ( ! $lat || ! $lng ) {
			continue;
		}

		$associated_products = penbrae_get_products_by_maker( $maker->ID, 4 );
		$product_links       = array();

		foreach ( $associated_products as $prod ) {
			$price_str = '£24.00';
			if ( function_exists( 'wc_get_product' ) ) {
				$wc_prod = wc_get_product( $prod->ID );
				if ( $wc_prod ) {
					$price_str = wp_strip_all_tags( wc_price( $wc_prod->get_price() ) );
				}
			}
			$product_links[] = array(
				'title' => $prod->post_title,
				'url'   => get_permalink( $prod->ID ),
				'price' => $price_str,
			);
		}

		$regions      = wp_get_post_terms( $maker->ID, 'penbrae_region', array( 'fields' => 'names' ) );
		$region_state = ! is_wp_error( $regions ) && ! empty( $regions ) ? $regions[0] : 'Northeast India';

		$payload[] = array(
			'id'          => 'maker-' . $maker->ID,
			'code'        => get_post_meta( $maker->ID, '_penbrae_maker_code', true ) ?: 'M-0' . $maker->ID,
			'name'        => $maker->post_title,
			'region'      => get_post_meta( $maker->ID, '_penbrae_district_state', true ) ?: $region_state,
			'state'       => $region_state,
			'coords'      => array( $lat, $lng ),
			'coordsLabel' => get_post_meta( $maker->ID, '_penbrae_coords_label', true ),
			'stall'       => get_post_meta( $maker->ID, '_penbrae_primary_stall', true ) ?: 'Tea Stall',
			'craft'       => get_post_meta( $maker->ID, '_penbrae_craft_specialty', true ),
			'intro'       => get_the_excerpt( $maker->ID ),
			'storyUrl'    => get_permalink( $maker->ID ),
			'products'    => $product_links,
		);
	}

	return $payload;
}
