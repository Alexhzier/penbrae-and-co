<?php
/**
 * Newsletter Subscription (UK GDPR Explicit Consent) & Curated Instagram Integration
 *
 * - Newsletter registrations require explicit marketing consent checkbox verification.
 * - Instagram content is integrated naturally into editorial sections using transient
 *   caching (6-hour TTL) to respect Meta Graph API rate limits and user privacy.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 1. Handle Newsletter Subscription Form Submissions (`admin-post.php`)
 */
function penbrae_handle_newsletter_signup() {
	if ( ! isset( $_POST['penbrae_newsletter_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['penbrae_newsletter_nonce'] ) ), 'penbrae_subscribe_action' ) ) {
		wp_die( esc_html__( 'Security verification failed. Please return and try again.', 'penbrae' ), 403 );
	}

	$email     = isset( $_POST['subscriber_email'] ) ? sanitize_email( wp_unslash( $_POST['subscriber_email'] ) ) : '';
	$consent   = isset( $_POST['gdpr_consent'] ) && '1' === $_POST['gdpr_consent'];
	$interests = isset( $_POST['stall_interests'] ) && is_array( $_POST['stall_interests'] )
		? array_map( 'sanitize_text_field', wp_unslash( $_POST['stall_interests'] ) )
		: array();

	if ( ! is_email( $email ) || ! $consent ) {
		wp_safe_redirect( add_query_arg( 'subscribe_status', 'consent_required', wp_get_referer() ?: home_url( '/subscribe' ) ) );
		exit;
	}

	// Store verified opt-in record in WordPress option ledger (or forward to configured ESP webhook)
	$subscribers   = get_option( 'penbrae_verified_subscribers', array() );
	$subscribers[] = array(
		'email'        => $email,
		'consent'      => true,
		'consented_at' => gmdate( 'c' ),
		'interests'    => $interests,
		'source_ip'    => 'anonymised-uk-gdpr',
	);
	update_option( 'penbrae_verified_subscribers', $subscribers, false );

	wp_safe_redirect( add_query_arg( 'subscribe_status', 'confirmed', wp_get_referer() ?: home_url( '/subscribe' ) ) );
	exit;
}
add_action( 'admin_post_nopriv_penbrae_newsletter_subscribe', 'penbrae_handle_newsletter_signup' );
add_action( 'admin_post_penbrae_newsletter_subscribe', 'penbrae_handle_newsletter_signup' );

/**
 * 2. Curated Instagram Field Notes Helper (Rate-Limit Safe via WP Transients)
 */
function penbrae_get_instagram_field_notes( $limit = 4 ) {
	$cached = get_transient( 'penbrae_ig_field_notes_cache' );
	if ( false !== $cached && is_array( $cached ) ) {
		return array_slice( $cached, 0, $limit );
	}

	$access_token = get_option( 'penbrae_instagram_graph_token', '' );
	if ( ! empty( $access_token ) ) {
		$endpoint = add_query_arg(
			array(
				'fields'       => 'id,caption,media_type,media_url,permalink,timestamp',
				'access_token' => $access_token,
				'limit'        => $limit,
			),
			'https://graph.instagram.com/me/media'
		);

		$response = wp_remote_get( $endpoint, array( 'timeout' => 5 ) );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$body = json_decode( wp_remote_retrieve_body( $response ), true );
			if ( ! empty( $body['data'] ) ) {
				set_transient( 'penbrae_ig_field_notes_cache', $body['data'], 6 * HOUR_IN_SECONDS );
				return array_slice( $body['data'], 0, $limit );
			}
		}
	}

	// Clearly labelled development placeholders when live Instagram Graph API token is not yet configured
	return array(
		array(
			'id'      => 'FIELD-IG-01',
			'location'=> 'Dibrugarh, Upper Assam',
			'caption' => '[Sample Field Note — Awaiting Live Instagram API Token] Morning mist lifting off smallholder Camellia sinensis var. assamica plots before the autumn orthodox pluck.',
			'date'    => 'Autumn Dispatch',
		),
		array(
			'id'      => 'FIELD-IG-02',
			'location'=> 'West Jaintia Hills, Meghalaya',
			'caption' => '[Sample Field Note — Awaiting Live Instagram API Token] Freshly washed Lakadong turmeric rhizomes split for sun-curing on woven bamboo mats.',
			'date'    => 'Winter Harvest',
		),
		array(
			'id'      => 'FIELD-IG-03',
			'location'=> 'Mon District, Nagaland',
			'caption' => '[Sample Field Note — Awaiting Live Instagram API Token] Alder-wood smoke rising through the slatted drying loft where whole Raja Mircha pods cure for fourteen days.',
			'date'    => 'Hearth Archive',
		),
		array(
			'id'      => 'FIELD-IG-04',
			'location'=> 'Cardiff Docklands & Tasting Room',
			'caption' => '[Sample Field Note — Awaiting Live Instagram API Token] Cupping vessels and brass scales prepared in Cardiff for arrival inspection of Lot 26-A.',
			'date'    => 'Cardiff Desk',
		),
	);
}
