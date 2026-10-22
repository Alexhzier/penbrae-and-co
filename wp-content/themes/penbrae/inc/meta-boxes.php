<?php
/**
 * WordPress Admin Meta Boxes for Code-Free Content & Relationship Management
 * Allows Penbrae editors to manage Maker Coordinates, Product-to-Maker-to-Story
 * relationships, Tasting Notes, Documentary Audio/Transcripts, and Homepage features.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 1. Register Meta Boxes across Product, Maker, Story, and Journal Post types
 */
function penbrae_register_admin_meta_boxes() {
	add_meta_box(
		'penbrae_product_provenance_box',
		__( 'Penbrae Provenance, Tasting Ledger & Non-Linear Relationships', 'penbrae' ),
		'penbrae_render_product_meta_box',
		'product',
		'normal',
		'high'
	);

	add_meta_box(
		'penbrae_maker_dossier_box',
		__( 'Maker Geographical Coordinates, Craft & Documentary Media', 'penbrae' ),
		'penbrae_render_maker_meta_box',
		'penbrae_maker',
		'normal',
		'high'
	);

	add_meta_box(
		'penbrae_story_relationships_box',
		__( 'Story Provenance Connections & Documentary Media', 'penbrae' ),
		'penbrae_render_story_meta_box',
		array( 'penbrae_story', 'post' ),
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'penbrae_register_admin_meta_boxes' );

/**
 * 2. Product Meta Box Renderer
 */
function penbrae_render_product_meta_box( $post ) {
	wp_nonce_field( 'penbrae_save_product_meta', 'penbrae_product_meta_nonce' );

	$maker_id       = get_post_meta( $post->ID, '_penbrae_maker_id', true );
	$story_id       = get_post_meta( $post->ID, '_penbrae_story_id', true );
	$lot_code       = get_post_meta( $post->ID, '_penbrae_lot_code', true );
	$latin_name     = get_post_meta( $post->ID, '_penbrae_latin_name', true );
	$elevation      = get_post_meta( $post->ID, '_penbrae_elevation', true );
	$harvest_window = get_post_meta( $post->ID, '_penbrae_harvest_window', true );
	$tasting_notes  = get_post_meta( $post->ID, '_penbrae_tasting_notes', true );
	$prep_guide     = get_post_meta( $post->ID, '_penbrae_preparation_guide', true );
	$scoville_shu   = get_post_meta( $post->ID, '_penbrae_scoville_shu', true );

	$makers  = get_posts( array( 'post_type' => 'penbrae_maker', 'posts_per_page' => -1, 'post_status' => 'publish' ) );
	$stories = get_posts( array( 'post_type' => 'penbrae_story', 'posts_per_page' => -1, 'post_status' => 'publish' ) );
	?>
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:12px 0;">
		<p>
			<label for="penbrae_maker_id"><strong><?php esc_html_e( 'Associated Maker / Producer:', 'penbrae' ); ?></strong></label><br>
			<select name="penbrae_maker_id" id="penbrae_maker_id" style="width:100%;">
				<option value=""><?php esc_html_e( '— Select Verified Maker —', 'penbrae' ); ?></option>
				<?php foreach ( $makers as $m ) : ?>
					<option value="<?php echo esc_attr( $m->ID ); ?>" <?php selected( $maker_id, $m->ID ); ?>>
						<?php echo esc_html( $m->post_title ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</p>
		<p>
			<label for="penbrae_story_id"><strong><?php esc_html_e( 'Dedicated Product Provenance Story:', 'penbrae' ); ?></strong></label><br>
			<select name="penbrae_story_id" id="penbrae_story_id" style="width:100%;">
				<option value=""><?php esc_html_e( '— Select Long-Form Product Story —', 'penbrae' ); ?></option>
				<?php foreach ( $stories as $s ) : ?>
					<option value="<?php echo esc_attr( $s->ID ); ?>" <?php selected( $story_id, $s->ID ); ?>>
						<?php echo esc_html( $s->post_title ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</p>
		<p>
			<label for="penbrae_lot_code"><strong><?php esc_html_e( 'Archival Lot Number (e.g. LOT 26-A):', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_lot_code" id="penbrae_lot_code" value="<?php echo esc_attr( $lot_code ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_latin_name"><strong><?php esc_html_e( 'Botanical Nomenclature (Latin):', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_latin_name" id="penbrae_latin_name" value="<?php echo esc_attr( $latin_name ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_elevation"><strong><?php esc_html_e( 'Elevation (e.g. 1,420m ASL):', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_elevation" id="penbrae_elevation" value="<?php echo esc_attr( $elevation ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_harvest_window"><strong><?php esc_html_e( 'Harvest / Flush Window:', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_harvest_window" id="penbrae_harvest_window" value="<?php echo esc_attr( $harvest_window ); ?>" style="width:100%;" />
		</p>
	</div>
	<p>
		<label for="penbrae_tasting_notes"><strong><?php esc_html_e( 'Tasting Notes & Aromatic Profile:', 'penbrae' ); ?></strong></label><br>
		<textarea name="penbrae_tasting_notes" id="penbrae_tasting_notes" rows="3" style="width:100%;"><?php echo esc_textarea( $tasting_notes ); ?></textarea>
	</p>
	<p>
		<label for="penbrae_preparation_guide"><strong><?php esc_html_e( 'Preparation, Steeping or Culinary Usage Guidance:', 'penbrae' ); ?></strong></label><br>
		<textarea name="penbrae_preparation_guide" id="penbrae_preparation_guide" rows="3" style="width:100%;"><?php echo esc_textarea( $prep_guide ); ?></textarea>
	</p>
	<p>
		<label for="penbrae_scoville_shu"><strong><?php esc_html_e( 'Scoville Heat Units (Chilli Stall only, e.g. 850,000 SHU):', 'penbrae' ); ?></strong></label><br>
		<input type="text" name="penbrae_scoville_shu" id="penbrae_scoville_shu" value="<?php echo esc_attr( $scoville_shu ); ?>" style="width:50%;" />
	</p>
	<?php
}

/**
 * 3. Maker Profile Meta Box Renderer
 */
function penbrae_render_maker_meta_box( $post ) {
	wp_nonce_field( 'penbrae_save_maker_meta', 'penbrae_maker_meta_nonce' );

	$maker_code       = get_post_meta( $post->ID, '_penbrae_maker_code', true );
	$latitude         = get_post_meta( $post->ID, '_penbrae_latitude', true );
	$longitude        = get_post_meta( $post->ID, '_penbrae_longitude', true );
	$coords_label     = get_post_meta( $post->ID, '_penbrae_coords_label', true );
	$district_state   = get_post_meta( $post->ID, '_penbrae_district_state', true );
	$primary_stall    = get_post_meta( $post->ID, '_penbrae_primary_stall', true );
	$craft_specialty  = get_post_meta( $post->ID, '_penbrae_craft_specialty', true );
	$audio_url        = get_post_meta( $post->ID, '_penbrae_audio_url', true );
	$audio_transcript = get_post_meta( $post->ID, '_penbrae_audio_transcript', true );
	$video_url        = get_post_meta( $post->ID, '_penbrae_video_url', true );
	?>
	<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;padding:12px 0;">
		<p>
			<label for="penbrae_maker_code"><strong><?php esc_html_e( 'Map Marker Code (e.g. M-01):', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_maker_code" id="penbrae_maker_code" value="<?php echo esc_attr( $maker_code ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_latitude"><strong><?php esc_html_e( 'Verified Latitude (Decimal, e.g. 27.4728):', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_latitude" id="penbrae_latitude" value="<?php echo esc_attr( $latitude ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_longitude"><strong><?php esc_html_e( 'Verified Longitude (Decimal, e.g. 94.9120):', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_longitude" id="penbrae_longitude" value="<?php echo esc_attr( $longitude ); ?>" style="width:100%;" />
		</p>
	</div>
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
		<p>
			<label for="penbrae_coords_label"><strong><?php esc_html_e( 'Archival Coordinates & Altitude Label:', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_coords_label" id="penbrae_coords_label" value="<?php echo esc_attr( $coords_label ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_district_state"><strong><?php esc_html_e( 'District & Northeast India State:', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_district_state" id="penbrae_district_state" value="<?php echo esc_attr( $district_state ); ?>" style="width:100%;" />
		</p>
		<p>
			<label for="penbrae_primary_stall"><strong><?php esc_html_e( 'Primary Stall Discipline:', 'penbrae' ); ?></strong></label><br>
			<select name="penbrae_primary_stall" id="penbrae_primary_stall" style="width:100%;">
				<option value="Tea Stall" <?php selected( $primary_stall, 'Tea Stall' ); ?>>Tea Stall</option>
				<option value="Spice Stall" <?php selected( $primary_stall, 'Spice Stall' ); ?>>Spice Stall</option>
				<option value="Chilli Stall" <?php selected( $primary_stall, 'Chilli Stall' ); ?>>Chilli Stall</option>
			</select>
		</p>
		<p>
			<label for="penbrae_craft_specialty"><strong><?php esc_html_e( 'Craft & Traditional Process Summary:', 'penbrae' ); ?></strong></label><br>
			<input type="text" name="penbrae_craft_specialty" id="penbrae_craft_specialty" value="<?php echo esc_attr( $craft_specialty ); ?>" style="width:100%;" />
		</p>
	</div>
	<hr>
	<p>
		<label for="penbrae_audio_url"><strong><?php esc_html_e( 'Field Audio Recording URL (MP3/OGG):', 'penbrae' ); ?></strong></label><br>
		<input type="url" name="penbrae_audio_url" id="penbrae_audio_url" value="<?php echo esc_attr( $audio_url ); ?>" style="width:100%;" />
	</p>
	<p>
		<label for="penbrae_audio_transcript"><strong><?php esc_html_e( 'Accessible Audio Verbatim Transcript (Required for WCAG 2.2 AA):', 'penbrae' ); ?></strong></label><br>
		<textarea name="penbrae_audio_transcript" id="penbrae_audio_transcript" rows="4" style="width:100%;"><?php echo esc_textarea( $audio_transcript ); ?></textarea>
	</p>
	<p>
		<label for="penbrae_video_url"><strong><?php esc_html_e( 'Documentary Video URL (Muted/User-Initiated MP4):', 'penbrae' ); ?></strong></label><br>
		<input type="url" name="penbrae_video_url" id="penbrae_video_url" value="<?php echo esc_attr( $video_url ); ?>" style="width:100%;" />
	</p>
	<?php
}

/**
 * 4. Story & Journal Relationship Meta Box Renderer
 */
function penbrae_render_story_meta_box( $post ) {
	wp_nonce_field( 'penbrae_save_story_meta', 'penbrae_story_meta_nonce' );

	$product_id       = get_post_meta( $post->ID, '_penbrae_featured_product_id', true );
	$maker_id         = get_post_meta( $post->ID, '_penbrae_maker_id', true );
	$pullquote        = get_post_meta( $post->ID, '_penbrae_pullquote', true );
	$audio_transcript = get_post_meta( $post->ID, '_penbrae_audio_transcript', true );

	$products = get_posts( array( 'post_type' => 'product', 'posts_per_page' => -1, 'post_status' => 'publish' ) );
	$makers   = get_posts( array( 'post_type' => 'penbrae_maker', 'posts_per_page' => -1, 'post_status' => 'publish' ) );
	?>
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:12px 0;">
		<p>
			<label for="penbrae_featured_product_id"><strong><?php esc_html_e( 'Connected WooCommerce Product:', 'penbrae' ); ?></strong></label><br>
			<select name="penbrae_featured_product_id" id="penbrae_featured_product_id" style="width:100%;">
				<option value=""><?php esc_html_e( '— Select Associated Product —', 'penbrae' ); ?></option>
				<?php foreach ( $products as $prod ) : ?>
					<option value="<?php echo esc_attr( $prod->ID ); ?>" <?php selected( $product_id, $prod->ID ); ?>>
						<?php echo esc_html( $prod->post_title ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</p>
		<p>
			<label for="penbrae_story_maker_id"><strong><?php esc_html_e( 'Connected Maker Profile:', 'penbrae' ); ?></strong></label><br>
			<select name="penbrae_maker_id" id="penbrae_story_maker_id" style="width:100%;">
				<option value=""><?php esc_html_e( '— Select Associated Maker —', 'penbrae' ); ?></option>
				<?php foreach ( $makers as $m ) : ?>
					<option value="<?php echo esc_attr( $m->ID ); ?>" <?php selected( $maker_id, $m->ID ); ?>>
						<?php echo esc_html( $m->post_title ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</p>
	</div>
	<p>
		<label for="penbrae_pullquote"><strong><?php esc_html_e( 'Editorial Pull Quote:', 'penbrae' ); ?></strong></label><br>
		<textarea name="penbrae_pullquote" id="penbrae_pullquote" rows="2" style="width:100%;"><?php echo esc_textarea( $pullquote ); ?></textarea>
	</p>
	<p>
		<label for="penbrae_story_audio_transcript"><strong><?php esc_html_e( 'Field Audio Transcript (if audio is attached):', 'penbrae' ); ?></strong></label><br>
		<textarea name="penbrae_audio_transcript" id="penbrae_story_audio_transcript" rows="3" style="width:100%;"><?php echo esc_textarea( $audio_transcript ); ?></textarea>
	</p>
	<?php
}

/**
 * 5. Save Meta Box Values Safely
 */
function penbrae_save_custom_meta_boxes( $post_id ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	// Save Product Meta
	if ( isset( $_POST['penbrae_product_meta_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['penbrae_product_meta_nonce'] ) ), 'penbrae_save_product_meta' ) ) {
		$fields = array(
			'penbrae_maker_id'          => '_penbrae_maker_id',
			'penbrae_story_id'          => '_penbrae_story_id',
			'penbrae_lot_code'          => '_penbrae_lot_code',
			'penbrae_latin_name'        => '_penbrae_latin_name',
			'penbrae_elevation'         => '_penbrae_elevation',
			'penbrae_harvest_window'    => '_penbrae_harvest_window',
			'penbrae_tasting_notes'     => '_penbrae_tasting_notes',
			'penbrae_preparation_guide' => '_penbrae_preparation_guide',
			'penbrae_scoville_shu'      => '_penbrae_scoville_shu',
		);
		foreach ( $fields as $input => $meta_key ) {
			if ( isset( $_POST[ $input ] ) ) {
				update_post_meta( $post_id, $meta_key, sanitize_textarea_field( wp_unslash( $_POST[ $input ] ) ) );
			}
		}
	}

	// Save Maker Meta
	if ( isset( $_POST['penbrae_maker_meta_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['penbrae_maker_meta_nonce'] ) ), 'penbrae_save_maker_meta' ) ) {
		$maker_fields = array(
			'penbrae_maker_code'       => '_penbrae_maker_code',
			'penbrae_latitude'         => '_penbrae_latitude',
			'penbrae_longitude'        => '_penbrae_longitude',
			'penbrae_coords_label'     => '_penbrae_coords_label',
			'penbrae_district_state'   => '_penbrae_district_state',
			'penbrae_primary_stall'    => '_penbrae_primary_stall',
			'penbrae_craft_specialty'  => '_penbrae_craft_specialty',
			'penbrae_audio_url'        => '_penbrae_audio_url',
			'penbrae_audio_transcript' => '_penbrae_audio_transcript',
			'penbrae_video_url'        => '_penbrae_video_url',
		);
		foreach ( $maker_fields as $input => $meta_key ) {
			if ( isset( $_POST[ $input ] ) ) {
				update_post_meta( $post_id, $meta_key, sanitize_textarea_field( wp_unslash( $_POST[ $input ] ) ) );
			}
		}
	}

	// Save Story / Post Meta
	if ( isset( $_POST['penbrae_story_meta_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['penbrae_story_meta_nonce'] ) ), 'penbrae_save_story_meta' ) ) {
		$story_fields = array(
			'penbrae_featured_product_id' => '_penbrae_featured_product_id',
			'penbrae_maker_id'            => '_penbrae_maker_id',
			'penbrae_pullquote'           => '_penbrae_pullquote',
			'penbrae_audio_transcript'    => '_penbrae_audio_transcript',
		);
		foreach ( $story_fields as $input => $meta_key ) {
			if ( isset( $_POST[ $input ] ) ) {
				update_post_meta( $post_id, $meta_key, sanitize_textarea_field( wp_unslash( $_POST[ $input ] ) ) );
			}
		}
	}
}
add_action( 'save_post', 'penbrae_save_custom_meta_boxes' );
