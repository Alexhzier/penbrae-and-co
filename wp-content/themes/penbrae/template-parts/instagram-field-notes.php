<?php
/**
 * Template Part: Curated Instagram Field Notes
 * Integrated naturally into editorial sections with rich visual plates.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$img_base = PENBRAE_THEME_URI . '/assets/images';
$notes    = array(
	array(
		'id'       => 'FIELD-01',
		'location' => 'Dibrugarh, Upper Assam',
		'img'      => $img_base . '/hero-assam-mist.jpg',
		'caption'  => 'Morning river mist lifting off smallholder Assamica plots before the late-November pluck.',
		'date'     => 'Autumn Dispatch',
	),
	array(
		'id'       => 'FIELD-02',
		'location' => 'West Jaintia Hills, Meghalaya',
		'img'      => $img_base . '/stall-spice-lakadong.jpg',
		'caption'  => 'Freshly washed Lakadong turmeric rhizomes split for sun-curing on woven bamboo mats.',
		'date'     => 'Winter Harvest',
	),
	array(
		'id'       => 'FIELD-03',
		'location' => 'Mon District, Nagaland',
		'img'      => $img_base . '/stall-chilli-smoked.jpg',
		'caption'  => 'Alder-wood smoke rising through the slatted loft where whole Raja Mircha pods cure.',
		'date'     => 'Hearth Archive',
	),
	array(
		'id'       => 'FIELD-04',
		'location' => 'Cardiff Cupping Room',
		'img'      => $img_base . '/tea-infusion-cup.jpg',
		'caption'  => 'Stoneware vessels and brass scales prepared in Cardiff for arrival inspection of Lot 26-A.',
		'date'     => 'Cardiff Desk',
	),
);
?>
<section class="editorial-section" aria-label="<?php esc_attr_e( 'Field Notes & Visual Dispatches', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
			<div>
				<span class="kicker-index"><?php esc_html_e( 'FIELD NOTES ARCHIVE · VISUAL NOTEBOOK', 'penbrae' ); ?></span>
				<h2 style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'Dispatches from Cardiff & Northeast India', 'penbrae' ); ?></h2>
			</div>
			<span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">
				<?php esc_html_e( '@penbraeandco · Server-Cached Visual Feed', 'penbrae' ); ?>
			</span>
		</div>

		<div class="editorial-grid editorial-grid--ruled">
			<?php foreach ( $notes as $note ) : ?>
				<article class="col-span-3 journal-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:0.85rem;background:var(--color-parchment-light);">
					<div>
						<div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.68rem;color:var(--color-ink-muted);margin-bottom:0.65rem;">
							<span><?php echo esc_html( $note['id'] ); ?></span>
							<span><?php echo esc_html( $note['date'] ); ?></span>
						</div>
						<div class="journal-card__media" style="aspect-ratio:1/1;margin-bottom:0.85rem;">
							<img src="<?php echo esc_url( $note['img'] ); ?>" alt="<?php echo esc_attr( $note['location'] ); ?>" loading="lazy">
						</div>
						<p style="font-size:0.88rem;color:var(--color-ink-secondary);margin:0;">
							<?php echo esc_html( $note['caption'] ); ?>
						</p>
					</div>
					<div style="font-family:var(--font-mono);font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-terracotta);">
						<?php echo esc_html( $note['location'] ); ?>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
