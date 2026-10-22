<?php
/**
 * PAGE 9 — JOURNAL (home.php)
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$img_base = PENBRAE_THEME_URI . '/assets/images';
?>

<section class="editorial-section" style="background:var(--color-parchment-deep);">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'EDITORIAL PUBLICATION · PAGE 09', 'penbrae' ); ?></span>
				<h1 style="margin-top:0.4rem;"><?php esc_html_e( 'The Penbrae Journal', 'penbrae' ); ?></h1>
			</div>
			<div class="col-span-7">
				<p class="lead-standfirst">
					<?php esc_html_e( 'Essays, field dispatches, artisan interviews, and culinary studies from Northeast India and our Cardiff tasting room.', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<section class="editorial-section">
	<div class="penbrae-container">
		<div class="editorial-grid" style="align-items:stretch;">
			<div class="col-span-7">
				<figure class="specimen-figure" style="height:100%;">
					<div class="specimen-figure__canvas specimen-figure__canvas--landscape" style="height:100%;">
						<img class="specimen-figure__img" src="<?php echo esc_url( $img_base . '/journal-preservation-loft.jpg' ); ?>" alt="<?php esc_attr_e( 'Traditional bamboo drying loft in Northeast India', 'penbrae' ); ?>">
						<span class="specimen-figure__badge"><?php esc_html_e( 'ISSUE 01 · COVER ESSAY', 'penbrae' ); ?></span>
					</div>
				</figure>
			</div>
			<article class="col-span-5" style="padding:var(--space-5);background:var(--color-parchment-light);border:var(--rule-strong);display:flex;flex-direction:column;justify-content:space-between;">
				<div>
					<span class="kicker-index"><?php esc_html_e( 'REGIONAL CULTURE & CRAFT', 'penbrae' ); ?></span>
					<h2 style="font-size:2.2rem;margin:0.5rem 0 1rem 0;">
						<a href="<?php echo esc_url( home_url( '/journal/smoke-mist-and-limestone-terroir' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
							<?php esc_html_e( 'Smoke, Mist & Limestone: Why Preservation Is the Second Harvest of Northeast India', 'penbrae' ); ?>
						</a>
					</h2>
					<p style="color:var(--color-ink-secondary);">
						<?php esc_html_e( 'How alder-wood smoke lofts, green bamboo internodes, and sun-warmed slate courtyards transform monsoon moisture into enduring flavour.', 'penbrae' ); ?>
					</p>
				</div>
				<div style="padding-top:1rem;border-top:var(--rule-hairline);display:flex;justify-content:space-between;align-items:center;">
					<a href="<?php echo esc_url( home_url( '/journal/smoke-mist-and-limestone-terroir' ) ); ?>" class="btn-editorial"><?php esc_html_e( 'Read Essay →', 'penbrae' ); ?></a>
					<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);"><?php esc_html_e( '8 Min Read', 'penbrae' ); ?></span>
				</div>
			</article>
		</div>
	</div>
</section>

<section class="editorial-section editorial-section--deep">
	<div class="penbrae-container">
		<div class="editorial-grid editorial-grid--ruled">
			<article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
				<div>
					<div class="journal-card__media">
						<img src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.jpg' ); ?>" alt="<?php esc_attr_e( 'Whole-leaf orthodox Assam tea', 'penbrae' ); ?>" loading="lazy">
					</div>
					<span class="kicker-index"><?php esc_html_e( 'TEA TRADITIONS', 'penbrae' ); ?></span>
					<h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;">
						<a href="<?php echo esc_url( home_url( '/journal/orthodox-vs-ctc-assam-leaf' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
							<?php esc_html_e( 'Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam', 'penbrae' ); ?>
						</a>
					</h3>
					<p style="font-size:0.92rem;color:var(--color-ink-secondary);">
						<?php esc_html_e( 'How smallholder hand-rolling preserves golden pubescent tips and honeyed muscatel notes.', 'penbrae' ); ?>
					</p>
				</div>
				<a href="<?php echo esc_url( home_url( '/journal/orthodox-vs-ctc-assam-leaf' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Dispatch →', 'penbrae' ); ?></a>
			</article>

			<article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
				<div>
					<div class="journal-card__media">
						<img src="<?php echo esc_url( $img_base . '/stall-spice-lakadong.jpg' ); ?>" alt="<?php esc_attr_e( 'Lakadong turmeric rhizomes and spices', 'penbrae' ); ?>" loading="lazy">
					</div>
					<span class="kicker-index"><?php esc_html_e( 'CULINARY & RECIPES', 'penbrae' ); ?></span>
					<h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;">
						<a href="<?php echo esc_url( home_url( '/journal/tempering-lakadong-and-smoked-chilli' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
							<?php esc_html_e( 'Tempering in Warm Fat: Lakadong & Alder-Smoked Chilli', 'penbrae' ); ?>
						</a>
					</h3>
					<p style="font-size:0.92rem;color:var(--color-ink-secondary);">
						<?php esc_html_e( 'Kitchen guidance on bloom temperatures, lipid solubility of curcumin, and infusing whole smoked pods.', 'penbrae' ); ?>
					</p>
				</div>
				<a href="<?php echo esc_url( home_url( '/journal/tempering-lakadong-and-smoked-chilli' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Dispatch →', 'penbrae' ); ?></a>
			</article>

			<article class="col-span-4 journal-card" style="background:var(--color-parchment-light);display:flex;flex-direction:column;justify-content:space-between;gap:1.25rem;">
				<div>
					<div class="journal-card__media">
						<img src="<?php echo esc_url( $img_base . '/stall-chilli-smoked.jpg' ); ?>" alt="<?php esc_attr_e( 'Alder-smoked Naga King Chillies', 'penbrae' ); ?>" loading="lazy">
					</div>
					<span class="kicker-index"><?php esc_html_e( 'ARTISAN INTERVIEWS', 'penbrae' ); ?></span>
					<h3 style="font-size:1.65rem;margin:0.4rem 0 0.65rem 0;">
						<a href="<?php echo esc_url( home_url( '/journal/alder-trees-and-jhum-agroforestry' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
							<?php esc_html_e( 'Nitrogen-Fixing Alder Trees & Rotational Hill Plots in Nagaland', 'penbrae' ); ?>
						</a>
					</h3>
					<p style="font-size:0.92rem;color:var(--color-ink-secondary);">
						<?php esc_html_e( 'Why Himalayan alder is both the ecological partner of upland soil fertility and the fuel of the drying hearth.', 'penbrae' ); ?>
					</p>
				</div>
				<a href="<?php echo esc_url( home_url( '/journal/alder-trees-and-jhum-agroforestry' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Dispatch →', 'penbrae' ); ?></a>
			</article>
		</div>
	</div>
</section>

<?php
get_template_part( 'template-parts/instagram-field-notes' );
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
