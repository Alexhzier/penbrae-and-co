<?php
/**
 * PAGE 6 — INDIVIDUAL MAKER STORY (single-penbrae_maker.php)
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$img_base = PENBRAE_THEME_URI . '/assets/images';

while ( have_posts() ) :
	the_post();
	$post_id         = get_the_ID();
	$maker_code      = get_post_meta( $post_id, '_penbrae_maker_code', true ) ?: 'M-01';
	$coords_label    = get_post_meta( $post_id, '_penbrae_coords_label', true ) ?: '27°28′N 94°54′E · 140m ASL';
	$district_state  = get_post_meta( $post_id, '_penbrae_district_state', true ) ?: 'Dibrugarh & Tinsukia, Upper Assam';
	$primary_stall   = get_post_meta( $post_id, '_penbrae_primary_stall', true ) ?: 'Tea Stall';
	$craft_specialty = get_post_meta( $post_id, '_penbrae_craft_specialty', true ) ?: 'Hand-rolled orthodox tippy Assam & bamboo-smoked reserve lots';
	$audio_url       = get_post_meta( $post_id, '_penbrae_audio_url', true );
	$transcript      = get_post_meta( $post_id, '_penbrae_audio_transcript', true );
	?>

	<section class="editorial-section editorial-section--forest">
		<div class="penbrae-container">
			<div class="editorial-grid" style="align-items:center;">
				<div class="col-span-7">
					<span class="kicker-index"><?php echo esc_html( 'MAKER DOCUMENTARY DOSSIER ' . $maker_code . ' · ' . $primary_stall ); ?></span>
					<h1 style="margin:0.4rem 0 1rem 0;"><?php the_title(); ?></h1>
					<p class="lead-standfirst"><?php echo esc_html( $craft_specialty ); ?></p>
					<div style="margin-top:var(--space-5);padding-top:var(--space-4);border-top:var(--rule-light-on-dark);display:flex;flex-wrap:wrap;gap:2.5rem;font-family:var(--font-mono);font-size:0.76rem;">
						<div><span style="color:var(--color-brass-light);"><?php esc_html_e( 'REGION:', 'penbrae' ); ?></span> <?php echo esc_html( $district_state ); ?></div>
						<div><span style="color:var(--color-brass-light);"><?php esc_html_e( 'COORDINATES:', 'penbrae' ); ?></span> <?php echo esc_html( $coords_label ); ?></div>
						<div><a href="<?php echo esc_url( home_url( '/makers' ) ); ?>" style="color:var(--color-brass-light);text-decoration:underline;"><?php esc_html_e( '← Return to Atlas', 'penbrae' ); ?></a></div>
					</div>
				</div>
				<div class="col-span-5">
					<figure class="specimen-figure" style="border-color:rgba(245,240,230,0.28);">
						<div class="specimen-figure__canvas" style="--aspect:4/4.5;">
							<img class="specimen-figure__img" src="<?php echo esc_url( $img_base . '/maker-hands-crafting.jpg' ); ?>" alt="<?php esc_attr_e( 'Artisan hands rolling withered tea leaves on woven bamboo mat', 'penbrae' ); ?>">
							<span class="specimen-figure__badge"><?php echo esc_html( $district_state ); ?></span>
						</div>
						<figcaption class="specimen-figure__caption">
							<span><?php esc_html_e( 'Hand-rolling withered leaf on woven bamboo tables.', 'penbrae' ); ?></span>
							<span class="specimen-figure__caption-id"><?php echo esc_html( $maker_code ); ?></span>
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>

	<section class="editorial-section">
		<div class="penbrae-container">
			<div class="editorial-grid">
				<aside class="col-editorial-marginalia">
					<div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-strong);">
						<span class="kicker-index"><?php esc_html_e( 'PRODUCER LEDGER', 'penbrae' ); ?></span>
						<dl style="font-size:0.88rem;margin:1rem 0 0 0;">
							<dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);"><?php esc_html_e( 'Location', 'penbrae' ); ?></dt>
							<dd style="margin:0.2rem 0 1rem 0;"><?php echo esc_html( $district_state ); ?></dd>
							<dt style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);"><?php esc_html_e( 'Craft Process', 'penbrae' ); ?></dt>
							<dd style="margin:0.2rem 0 0 0;"><?php echo esc_html( $craft_specialty ); ?></dd>
						</dl>
					</div>
				</aside>

				<div class="col-editorial-essay prose-measure">
					<div class="editorial-dropcap">
						<?php the_content(); ?>
					</div>

					<div class="editorial-pullquote">
						<blockquote>
							<?php esc_html_e( '“When the leaf is rolled by hand on woven bamboo, the cell wall yields slowly. You taste the river mist and the shade tree, not the heat of a steel machine.”', 'penbrae' ); ?>
						</blockquote>
						<cite><?php echo esc_html( 'FIELD NOTES ARCHIVE · ' . strtoupper( $district_state ) ); ?></cite>
					</div>

					<?php
					get_template_part(
						'template-parts/audio-documentary',
						null,
						array(
							'title'      => 'Field Recording: Inside the Drying & Rolling Loft (' . $district_state . ')',
							'location'   => $coords_label,
							'audio_url'  => $audio_url,
							'transcript' => $transcript ?: 'Ambient sound of morning mist lifting off smallholder tea bushes, followed by hand-rolling of withered leaves on bamboo mats.',
						)
					);
					?>

					<figure class="specimen-figure" style="margin-top:var(--space-5);">
						<div class="specimen-figure__canvas specimen-figure__canvas--landscape">
							<img class="specimen-figure__img" src="<?php echo esc_url( $img_base . '/journal-preservation-loft.jpg' ); ?>" alt="<?php esc_attr_e( 'Traditional bamboo drying loft in Northeast India', 'penbrae' ); ?>" loading="lazy">
							<span class="specimen-figure__badge"><?php esc_html_e( 'DOCUMENTARY STUDY · DRYING & WITHERING LOFT', 'penbrae' ); ?></span>
						</div>
						<figcaption class="specimen-figure__caption">
							<span><?php esc_html_e( 'Tiered bamboo racks used for ambient withering and hearth-smoke curing.', 'penbrae' ); ?></span>
							<span class="specimen-figure__caption-id">PLATE II</span>
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>

	<?php
	get_template_part( 'template-parts/non-linear-compass' );
endwhile;

get_footer();
