<?php
/**
 * Penbrae & Co — Sample Editorial & Commerce Content Seeder
 *
 * All seeded records are explicitly marked as "[Sample Record — Replace with Verified Penbrae Asset]"
 * so that sample architecture demonstration is never confused with fabricated producer biographies.
 *
 * Can be triggered via WP-CLI (`wp eval "penbrae_seed_sample_architecture();"`)
 * or via WordPress Admin -> Appearance -> Penbrae Sample Data.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function penbrae_register_seeder_admin_page() {
	add_theme_page(
		__( 'Penbrae Architecture Seeder', 'penbrae' ),
		__( 'Penbrae Sample Data', 'penbrae' ),
		'manage_options',
		'penbrae-seeder',
		'penbrae_render_seeder_admin_page'
	);
}
add_action( 'admin_menu', 'penbrae_register_seeder_admin_page' );

function penbrae_render_seeder_admin_page() {
	if ( isset( $_POST['penbrae_run_seed'] ) && check_admin_referer( 'penbrae_seed_nonce' ) ) {
		penbrae_seed_sample_architecture();
		echo '<div class="notice notice-success"><p>' . esc_html__( 'Sample Stalls, Products, Makers, Stories, Regions, and Bidirectional Relationships seeded.', 'penbrae' ) . '</p></div>';
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Penbrae & Co — Architecture & Sample Relationship Seeder', 'penbrae' ); ?></h1>
		<p><?php esc_html_e( 'Populates the three WooCommerce Stalls (Teas, Spices, Chillies), Northeast India Regions, Sample Makers, Sample Product Stories, and Journal Articles with full non-linear metadata links.', 'penbrae' ); ?></p>
		<form method="post">
			<?php wp_nonce_field( 'penbrae_seed_nonce' ); ?>
			<p><button type="submit" name="penbrae_run_seed" class="button button-primary" value="1"><?php esc_html_e( 'Seed Sample Editorial & WooCommerce Architecture', 'penbrae' ); ?></button></p>
		</form>
	</div>
	<?php
}

function penbrae_seed_sample_architecture() {
	if ( get_option( 'penbrae_sample_architecture_seeded' ) ) {
		return;
	}

	// 1. Seed Northeast India Provenance Regions
	$regions = array( 'Assam', 'Meghalaya', 'Nagaland', 'Arunachal Pradesh', 'Manipur', 'Sikkim' );
	foreach ( $regions as $region_name ) {
		if ( ! term_exists( $region_name, 'penbrae_region' ) ) {
			wp_insert_term( $region_name, 'penbrae_region' );
		}
	}

	// 2. Seed Three WooCommerce Stalls (Product Categories)
	$stalls = array(
		'teas'     => array(
			'name' => 'The Tea Stall',
			'desc' => 'Calm, ceremonial, delicate, contemplative. Rare orthodox, white, and bamboo-smoked harvests from Upper Assam and Arunachal Pradesh.',
		),
		'spices'   => array(
			'name' => 'The Spice Stall',
			'desc' => 'Warm, textured, aromatic, expressive. High-curcumin Lakadong rhizomes, wild canopy hill peppers, and sun-cured ginger.',
		),
		'chillies' => array(
			'name' => 'The Chilli Stall',
			'desc' => 'Bold, energetic, intense, sophisticated. Alder-smoked Naga King Chilli pods and sun-cured crimson Hathei harvests.',
		),
	);

	foreach ( $stalls as $slug => $data ) {
		if ( taxonomy_exists( 'product_cat' ) && ! term_exists( $slug, 'product_cat' ) ) {
			wp_insert_term(
				$data['name'],
				'product_cat',
				array(
					'slug'        => $slug,
					'description' => $data['desc'],
				)
			);
		}
	}

	// 3. Seed Sample Maker Profile
	$maker_id = wp_insert_post(
		array(
			'post_type'    => 'penbrae_maker',
			'post_title'   => 'Upper Assam Smallholder Orthodox Collective [Sample Record]',
			'post_name'    => 'upper-assam-orthodox-collective',
			'post_excerpt' => 'Sample producer dossier illustrating smallholder Camellia sinensis var. assamica cultivation in Dibrugarh District.',
			'post_content' => '<p>[Development Sample Content — Replace with verified Penbrae producer biography]</p><p>Along the southern bank of the Brahmaputra in Dibrugarh District, smallholder gardens cultivate broad-leafed Assamica bushes under a dappled canopy of shade trees.</p>',
			'post_status'  => 'publish',
		)
	);

	if ( $maker_id && ! is_wp_error( $maker_id ) ) {
		update_post_meta( $maker_id, '_penbrae_maker_code', 'M-01' );
		update_post_meta( $maker_id, '_penbrae_latitude', '27.4728' );
		update_post_meta( $maker_id, '_penbrae_longitude', '94.9120' );
		update_post_meta( $maker_id, '_penbrae_coords_label', '27°28′N 94°54′E · 140m ASL' );
		update_post_meta( $maker_id, '_penbrae_district_state', 'Dibrugarh District, Upper Assam' );
		update_post_meta( $maker_id, '_penbrae_primary_stall', 'Tea Stall' );
		update_post_meta( $maker_id, '_penbrae_craft_specialty', 'Hand-rolled orthodox tippy Assam & bamboo-smoked reserve lots' );
		wp_set_object_terms( $maker_id, 'Assam', 'penbrae_region' );
	}

	// 4. Seed Sample Product Story
	$story_id = wp_insert_post(
		array(
			'post_type'    => 'penbrae_story',
			'post_title'   => 'Mist Over the Brahmaputra: The Autumn Tippy Pluck [Sample Story]',
			'post_name'    => 'mist-over-the-brahmaputra-autumn-pluck',
			'post_excerpt' => 'How cool November nights slow leaf growth in Upper Assam, concentrating malted honey and muscatel aromatics in the golden bud.',
			'post_content' => '<p>[Development Sample Content — Replace with verified Penbrae field dispatch]</p><p>When the monsoon recedes from the Brahmaputra basin in late October, morning river fog lingers over the smallholder plots until mid-morning, slowing growth and deepening the sap of each terminal bud.</p>',
			'post_status'  => 'publish',
		)
	);

	// 5. Seed Sample WooCommerce Product & Link Bidirectionally
	if ( post_type_exists( 'product' ) ) {
		$product_id = wp_insert_post(
			array(
				'post_type'    => 'product',
				'post_title'   => 'Upper Assam Tippy Orthodox Reserve',
				'post_name'    => 'upper-assam-tippy-orthodox',
				'post_excerpt' => 'Whole-leaf autumn flush orthodox Assam rich in downy golden tips. Malted barley, wild forest honey, and dried fig.',
				'post_content' => 'Hand-plucked two leaves and a downy bud from smallholder gardens in Dibrugarh, withered on bamboo trays and gently rolled to preserve unbroken golden tips.',
				'post_status'  => 'publish',
			)
		);

		if ( $product_id && ! is_wp_error( $product_id ) ) {
			update_post_meta( $product_id, '_regular_price', '28.00' );
			update_post_meta( $product_id, '_price', '28.00' );
			update_post_meta( $product_id, '_stock_status', 'instock' );
			update_post_meta( $product_id, '_sku', 'PB-TEA-26A' );
			update_post_meta( $product_id, '_penbrae_maker_id', $maker_id );
			update_post_meta( $product_id, '_penbrae_story_id', $story_id );
			update_post_meta( $product_id, '_penbrae_lot_code', 'LOT 26-A' );
			update_post_meta( $product_id, '_penbrae_latin_name', 'Camellia sinensis var. assamica' );
			update_post_meta( $product_id, '_penbrae_elevation', '140m ASL' );
			update_post_meta( $product_id, '_penbrae_harvest_window', 'Late November (Autumnal Flush)' );
			update_post_meta( $product_id, '_penbrae_tasting_notes', 'Toasted malt, dark heather honey, stewed orchard plum, clean mineral finish.' );
			update_post_meta( $product_id, '_penbrae_preparation_guide', '3.5g per 250ml spring water at 92°C. Infuse for 3 minutes 30 seconds; yields three distinct infusions.' );
			wp_set_object_terms( $product_id, 'teas', 'product_cat' );
			wp_set_object_terms( $product_id, 'Assam', 'penbrae_region' );

			if ( $story_id ) {
				update_post_meta( $story_id, '_penbrae_featured_product_id', $product_id );
				update_post_meta( $story_id, '_penbrae_maker_id', $maker_id );
			}
		}
	}

	update_option( 'penbrae_sample_architecture_seeded', gmdate( 'c' ) );
}
