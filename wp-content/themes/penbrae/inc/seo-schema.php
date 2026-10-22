<?php
/**
 * Semantic SEO, OpenGraph, Canonical URLs & Schema.org JSON-LD Structured Data
 * Outputs Product, Article, Organization, and BreadcrumbList schema.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function penbrae_output_seo_and_schema() {
	global $post;

	$site_name = get_bloginfo( 'name' ) ?: 'Penbrae & Co Ltd';
	$site_url  = home_url( '/' );
	$canonical = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
	$title     = wp_get_document_title();
	$desc      = is_singular() && has_excerpt() ? wp_strip_all_tags( get_the_excerpt() ) : 'Penbrae & Co Ltd — Cardiff-based importers of rare, handcrafted teas, spices, and chillies from Northeast India.';

	echo '<meta name="description" content="' . esc_attr( $desc ) . '" />' . "\n";
	echo '<link rel="canonical" href="' . esc_url( $canonical ) . '" />' . "\n";
	echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '" />' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
	echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
	echo '<meta property="og:url" content="' . esc_url( $canonical ) . '" />' . "\n";
	echo '<meta property="og:type" content="' . ( is_singular( 'product' ) ? 'product' : ( is_single() ? 'article' : 'website' ) ) . '" />' . "\n";

	$schema_graph = array(
		array(
			'@type'       => 'Organization',
			'@id'         => $site_url . '#organization',
			'name'        => 'Penbrae & Co Ltd',
			'url'         => $site_url,
			'description' => 'Cardiff-based company importing rare, handcrafted teas, spices, and chillies from Northeast India.',
			'address'     => array(
				'@type'           => 'PostalAddress',
				'addressLocality' => 'Cardiff',
				'addressRegion'   => 'Wales',
				'addressCountry'  => 'GB',
			),
		),
	);

	// Product Structured Data (GBP)
	if ( is_singular( 'product' ) && function_exists( 'wc_get_product' ) && $post ) {
		$product = wc_get_product( $post->ID );
		if ( $product ) {
			$schema_graph[] = array(
				'@type'       => 'Product',
				'name'        => $product->get_name(),
				'sku'         => $product->get_sku() ?: get_post_meta( $post->ID, '_penbrae_lot_code', true ),
				'description' => wp_strip_all_tags( $product->get_short_description() ?: $product->get_description() ),
				'brand'       => array(
					'@type' => 'Brand',
					'name'  => 'Penbrae & Co Ltd',
				),
				'offers'      => array(
					'@type'         => 'Offer',
					'priceCurrency' => 'GBP',
					'price'         => $product->get_price(),
					'availability'  => $product->is_in_stock() ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
					'url'           => get_permalink( $post->ID ),
				),
			);
		}
	}

	// Editorial Article / Maker / Product Story Structured Data
	if ( is_singular( array( 'post', 'penbrae_maker', 'penbrae_story' ) ) && $post ) {
		$schema_graph[] = array(
			'@type'         => 'Article',
			'headline'      => get_the_title( $post->ID ),
			'datePublished' => get_the_date( 'c', $post->ID ),
			'dateModified'  => get_the_modified_date( 'c', $post->ID ),
			'author'        => array(
				'@type' => 'Organization',
				'name'  => 'Penbrae Editorial Desk',
			),
			'publisher'     => array(
				'@id' => $site_url . '#organization',
			),
		);
	}

	$json_ld = array(
		'@context' => 'https://schema.org',
		'@graph'   => $schema_graph,
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $json_ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'penbrae_output_seo_and_schema', 5 );
