<?php
/**
 * 404 Archival Entry Not Found Template (404.php)
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section">
	<div class="penbrae-container">
		<span class="kicker-index"><?php esc_html_e( 'ARCHIVAL FOLIO 404 · ENTRY NOT FOUND', 'penbrae' ); ?></span>
		<h1 style="margin:0.4rem 0 1rem 0;"><?php esc_html_e( 'This Coordinate Lies Outside Our Current Archive.', 'penbrae' ); ?></h1>
		<p class="lead-standfirst">
			<?php esc_html_e( 'The page or seasonal lot you requested has moved or been retired. Use the provenance compass below to return to The Three Stalls or the Maker Atlas.', 'penbrae' ); ?>
		</p>
		<div style="margin-top:var(--space-5);display:flex;gap:1rem;flex-wrap:wrap;">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-editorial"><?php esc_html_e( 'Return to Front Monograph →', 'penbrae' ); ?></a>
			<a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>" class="btn-editorial btn-editorial--outline"><?php esc_html_e( 'Enter The Stalls →', 'penbrae' ); ?></a>
		</div>
	</div>
</section>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
