<?php
/**
 * Custom Post Types & Shared Taxonomies for Non-Linear Browsing
 * Connects: Products <-> Makers <-> Product Stories <-> Regions <-> Journal
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function penbrae_register_content_architecture() {

	/**
	 * 1. Custom Post Type: Makers (`penbrae_maker`)
	 * Represents verified artisans, smallholder collectives, and estates in Northeast India.
	 */
	register_post_type(
		'penbrae_maker',
		array(
			'labels'       => array(
				'name'               => __( 'Makers & Producers', 'penbrae' ),
				'singular_name'      => __( 'Maker Profile', 'penbrae' ),
				'add_new'            => __( 'Add Maker Dossier', 'penbrae' ),
				'add_new_item'       => __( 'Add New Maker Profile', 'penbrae' ),
				'edit_item'          => __( 'Edit Maker Profile', 'penbrae' ),
				'view_item'          => __( 'View Maker Story', 'penbrae' ),
				'search_items'       => __( 'Search Makers', 'penbrae' ),
				'not_found'          => __( 'No maker profiles found.', 'penbrae' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'rewrite'      => array(
				'slug'       => 'maker',
				'with_front' => false,
			),
			'menu_icon'    => 'dashicons-location-alt',
			'show_in_rest' => true, // Full Gutenberg Block Editor support
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		)
	);

	/**
	 * 2. Custom Post Type: Product Provenance Stories (`penbrae_story`)
	 * Dedicated long-form documentary stories for individual ingredients/lots.
	 */
	register_post_type(
		'penbrae_story',
		array(
			'labels'       => array(
				'name'               => __( 'Product Stories', 'penbrae' ),
				'singular_name'      => __( 'Product Story', 'penbrae' ),
				'add_new'            => __( 'Add Product Story', 'penbrae' ),
				'add_new_item'       => __( 'Add New Product Provenance Story', 'penbrae' ),
				'edit_item'          => __( 'Edit Product Story', 'penbrae' ),
				'view_item'          => __( 'View Product Story', 'penbrae' ),
				'search_items'       => __( 'Search Product Stories', 'penbrae' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'rewrite'      => array(
				'slug'       => 'story',
				'with_front' => false,
			),
			'menu_icon'    => 'dashicons-book-alt',
			'show_in_rest' => true, // Full Gutenberg Block Editor support
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		)
	);

	/**
	 * 3. Shared Taxonomy: Northeast India Provenance Regions (`penbrae_region`)
	 * Shared across WooCommerce Products, Makers, Product Stories, and Journal Posts
	 * so visitors can pivot effortlessly by geographical origin.
	 */
	register_taxonomy(
		'penbrae_region',
		array( 'product', 'penbrae_maker', 'penbrae_story', 'post' ),
		array(
			'labels'            => array(
				'name'          => __( 'Provenance Regions', 'penbrae' ),
				'singular_name' => __( 'Provenance Region', 'penbrae' ),
				'search_items'  => __( 'Search Regions', 'penbrae' ),
				'all_items'     => __( 'All Northeast India Regions', 'penbrae' ),
				'edit_item'     => __( 'Edit Region', 'penbrae' ),
				'add_new_item'  => __( 'Add New Provenance Region', 'penbrae' ),
			),
			'hierarchical'      => true,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'region' ),
		)
	);
}
add_action( 'init', 'penbrae_register_content_architecture' );
