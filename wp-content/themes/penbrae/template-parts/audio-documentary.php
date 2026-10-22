<?php
/**
 * Template Part: Accessible Field Audio Player with Verbatim Transcript
 * Meets WCAG 2.2 AA requirements: user-initiated playback (no autoplay),
 * keyboard controls, and full text transcript.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$title      = isset( $args['title'] ) ? $args['title'] : 'Field Recording: Morning Pluck & Bamboo Rolling Table (Dibrugarh)';
$location   = isset( $args['location'] ) ? $args['location'] : '27°28′N 94°54′E · Upper Assam · 01:34';
$audio_url  = isset( $args['audio_url'] ) ? $args['audio_url'] : '';
$transcript = isset( $args['transcript'] ) ? $args['transcript'] : '[Sample Field Audio Transcript — Replace with verified producer recording transcript] Ambient sound of morning mist dripping from shade trees onto broad Camellia sinensis var. assamica leaves, followed by the rhythmic hand-rolling of withered leaf across woven bamboo tables. The head tea maker explains how autumn coolness preserves the golden down on the terminal bud.';
?>
<div class="audio-field-module" data-audio-module data-duration-sec="94" role="region" aria-label="<?php echo esc_attr( $title ); ?>">
	<div class="audio-field-module__top">
		<span class="kicker-index"><?php esc_html_e( 'DOCUMENTARY FIELD AUDIO ARCHIVE', 'penbrae' ); ?></span>
		<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);"><?php echo esc_html( $location ); ?></span>
	</div>
	<h3 style="font-size:1.35rem;margin-bottom:0.75rem;"><?php echo esc_html( $title ); ?></h3>
	<?php if ( ! empty( $audio_url ) ) : ?>
		<audio preload="none" src="<?php echo esc_url( $audio_url ); ?>"></audio>
	<?php endif; ?>
	<div class="audio-field-module__controls">
		<button type="button" class="audio-play-btn" data-audio-toggle aria-pressed="false">
			<?php esc_html_e( 'Listen ▶', 'penbrae' ); ?>
		</button>
		<div class="audio-progress-track" aria-hidden="true">
			<div class="audio-progress-bar" data-audio-bar></div>
		</div>
		<span class="tabular-nums" data-audio-time style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">00:00 / 01:34</span>
	</div>
	<details class="audio-transcript-details">
		<summary><?php esc_html_e( 'Read Verbatim Audio Transcript (Accessibility & Archival Reference)', 'penbrae' ); ?></summary>
		<div class="audio-transcript-body">
			<p style="margin:0;"><?php echo esc_html( $transcript ); ?></p>
		</div>
	</details>
</div>
