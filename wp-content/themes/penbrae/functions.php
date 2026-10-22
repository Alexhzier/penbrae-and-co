<?php
/**
 * Penbrae & Co Ltd — Bespoke Editorial Commerce Theme Functions
 *
 * @package Penbrae
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PENBRAE_THEME_VERSION', '1.0.0' );
define( 'PENBRAE_THEME_DIR', get_template_directory() );
define( 'PENBRAE_THEME_URI', get_template_directory_uri() );

/**
 * 1. Theme Setup & WordPress / WooCommerce Capabilities
 */
function penbrae_theme_setup() {
	load_theme_textdomain( 'penbrae', PENBRAE_THEME_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/design-system.css' );

	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// WooCommerce Native Support with Editorial Gallery Ratios
	add_theme_support(
		'woocommerce',
		array(
			'thumbnail_image_width' => 680,
			'single_image_width'    => 1080,
			'product_grid'          => array(
				'default_rows'    => 3,
				'min_rows'        => 1,
				'max_rows'        => 8,
				'default_columns' => 3,
				'min_columns'     => 1,
				'max_columns'     => 3,
			),
		)
	);

	// Editorial Image Crops
	add_image_size( 'penbrae-editorial-hero', 1800, 1080, true );
	add_image_size( 'penbrae-specimen-portrait', 800, 1000, true );
	add_image_size( 'penbrae-maker-portrait', 960, 1200, true );
	add_image_size( 'penbrae-journal-wide', 1400, 840, true );

	// Navigation Locations
	register_nav_menus(
		array(
			'primary_editorial' => __( 'Primary Editorial Masthead', 'penbrae' ),
			'stalls_navigation' => __( 'The Three Stalls Switcher', 'penbrae' ),
			'colophon_explore'  => __( 'Footer: Provenance & Editorial', 'penbrae' ),
			'colophon_legal'    => __( 'Footer: Commerce & Legal Policies', 'penbrae' ),
		)
	);
}
add_action( 'after_setup_theme', 'penbrae_theme_setup' );

/**
 * 2. Enqueue Editorial Stylesheets, Typography, Leaflet Map & Scripts
 */
function penbrae_enqueue_assets() {
	// Editorial Typography (Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono)
	wp_enqueue_style(
		'penbrae-google-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'penbrae-design-system',
		PENBRAE_THEME_URI . '/assets/css/design-system.css',
		array( 'penbrae-google-fonts' ),
		PENBRAE_THEME_VERSION
	);

	wp_enqueue_style(
		'penbrae-components',
		PENBRAE_THEME_URI . '/assets/css/components.css',
		array( 'penbrae-design-system' ),
		PENBRAE_THEME_VERSION
	);

	wp_enqueue_style(
		'penbrae-pages',
		PENBRAE_THEME_URI . '/assets/css/pages.css',
		array( 'penbrae-components' ),
		PENBRAE_THEME_VERSION
	);

	// Primary Accessible UI & Audio/Basket Script
	wp_enqueue_script(
		'penbrae-main',
		PENBRAE_THEME_URI . '/assets/js/main.js',
		array(),
		PENBRAE_THEME_VERSION,
		true
	);

	wp_enqueue_script(
		'penbrae-commerce',
		PENBRAE_THEME_URI . '/assets/js/commerce.js',
		array( 'penbrae-main' ),
		PENBRAE_THEME_VERSION,
		true
	);

	// Enqueue Leaflet + Maker Map Script on Meet the Makers page or Front Page
	if ( is_page_template( 'page-makers.php' ) || is_page( 'makers' ) || is_page( 'meet-the-makers' ) || is_post_type_archive( 'penbrae_maker' ) ) {
		wp_enqueue_style(
			'leaflet-css',
			'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
			array(),
			'1.9.4'
		);

		wp_enqueue_script(
			'leaflet-js',
			'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
			array(),
			'1.9.4',
			true
		);

		wp_enqueue_script(
			'penbrae-makers-map',
			PENBRAE_THEME_URI . '/assets/js/makers-map.js',
			array( 'leaflet-js', 'penbrae-main' ),
			PENBRAE_THEME_VERSION,
			true
		);

		if ( function_exists( 'penbrae_get_makers_map_payload' ) ) {
			wp_localize_script(
				'penbrae-makers-map',
				'PENBRAE_MAKERS_DATA',
				penbrae_get_makers_map_payload()
			);
		}
	}
}
add_action( 'wp_enqueue_scripts', 'penbrae_enqueue_assets' );

/**
 * 3. Load Modular Architecture Includes
 */
$penbrae_includes = array(
	'/inc/custom-post-types.php',
	'/inc/meta-boxes.php',
	'/inc/relationships.php',
	'/inc/woocommerce-setup.php',
	'/inc/seo-schema.php',
	'/inc/newsletter-instagram.php',
	'/inc/seed-demo-content.php',
);

foreach ( $penbrae_includes as $file ) {
	$filepath = PENBRAE_THEME_DIR . $file;
	if ( file_exists( $filepath ) ) {
		require_once $filepath;
	}
}
