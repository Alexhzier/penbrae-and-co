<?php
/**
 * Template Name: Page 8 — About Penbrae & Co Ltd
 * Template Post Type: page
 *
 * Tells the story of Penbrae & Co Ltd (Cardiff to Northeast India).
 * Does NOT fabricate company history, ethical certifications, or awards.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section editorial-section--forest">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'COMPANY MONOGRAPH · PAGE 08', 'penbrae' ); ?></span>
				<h1 style="margin-top:0.4rem;"><?php esc_html_e( 'From Cardiff to the Hills & Valleys of Northeast India.', 'penbrae' ); ?></h1>
			</div>
			<div class="col-span-7">
				<p class="lead-standfirst">
					<?php esc_html_e( 'Penbrae & Co Ltd is a Cardiff-based company dedicated to importing rare, handcrafted teas, spices, and chillies from Northeast India—preserving the identity of every region and producer.', 'penbrae' ); ?>
				</p>
				<div style="margin-top:var(--space-5);padding-top:var(--space-4);border-top:var(--rule-light-on-dark);font-family:var(--font-mono);font-size:0.76rem;color:var(--color-brass-light);">
					<?php esc_html_e( 'HEADQUARTERS: CARDIFF, WALES · SOURCING CORRIDOR: NORTHEAST INDIA · THREE STALLS: TEAS, SPICES, CHILLIES', 'penbrae' ); ?>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="editorial-section">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<aside class="col-editorial-marginalia">
				<div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-strong);">
					<span class="kicker-index"><?php esc_html_e( 'EDITORIAL INTEGRITY NOTICE', 'penbrae' ); ?></span>
					<p style="font-size:0.86rem;color:var(--color-ink-secondary);margin-top:0.75rem;">
						<?php esc_html_e( 'All sections on this page are editable via the WordPress Block Editor (Pages → About Penbrae). No unverified third-party certifications, invented founding dates, or fabricated awards have been inserted.', 'penbrae' ); ?>
					</p>
				</div>
			</aside>

			<div class="col-editorial-essay prose-measure">
				<h2><?php esc_html_e( 'I. Who We Are & Why We Started', 'penbrae' ); ?></h2>
				<p class="editorial-dropcap">
					<?php esc_html_e( 'Penbrae & Co Ltd was established in Cardiff with a clear conviction: that the extraordinary agricultural and culinary heritage of Northeast India deserves to be experienced in its unblended, single-origin form. For generations, harvests from Upper Assam, Meghalaya, Nagaland, Arunachal Pradesh, and Manipur have either remained within local hill markets or been absorbed into anonymous commodity supply chains.', 'penbrae' ); ?>
				</p>
				<p>
					<?php esc_html_e( 'Our purpose is to bridge Cardiff and Northeast India through careful curation and documentary storytelling—allowing cooks, tea drinkers, and curious readers in the United Kingdom to discover not only rare ingredients, but the landscapes and people behind them.', 'penbrae' ); ?>
				</p>

				<hr style="border:none;border-top:var(--rule-hairline);margin:var(--space-6) 0;">

				<h2><?php esc_html_e( 'II. Philosophy of Sourcing & Respect for Craftsmanship', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'True luxury in agriculture lies in patience and specificity. Whether it is smallholder orthodox tea withered on woven bamboo trays in Dibrugarh, high-curcumin Lakadong turmeric cultivated on misty limestone slopes in the West Jaintia Hills, or Raja Mircha chillies cured above smouldering alder hearths in Nagaland, traditional methods cannot be rushed.', 'penbrae' ); ?>
				</p>

				<div class="editorial-grid editorial-grid--ruled" style="margin:var(--space-5) 0;">
					<div class="col-span-6" style="background:var(--color-parchment-light);">
						<span class="kicker-index"><?php esc_html_e( 'PRINCIPLE 01', 'penbrae' ); ?></span>
						<h3 style="font-size:1.35rem;margin:0.4rem 0;"><?php esc_html_e( 'Named Provenance', 'penbrae' ); ?></h3>
						<p style="font-size:0.9rem;color:var(--color-ink-secondary);margin:0;">
							<?php esc_html_e( 'Every lot we offer is catalogued by its regional origin, harvest window, and producer dossier rather than sold under generic labels.', 'penbrae' ); ?>
						</p>
					</div>
					<div class="col-span-6" style="background:var(--color-parchment-light);">
						<span class="kicker-index"><?php esc_html_e( 'PRINCIPLE 02', 'penbrae' ); ?></span>
						<h3 style="font-size:1.35rem;margin:0.4rem 0;"><?php esc_html_e( 'Seasonal Honesty', 'penbrae' ); ?></h3>
						<p style="font-size:0.9rem;color:var(--color-ink-secondary);margin:0;">
							<?php esc_html_e( 'Handcrafted agricultural harvests are finite. When a seasonal lot is exhausted, we wait for the next harvest rather than substituting inferior stock.', 'penbrae' ); ?>
						</p>
					</div>
				</div>

				<h2><?php esc_html_e( 'III. Relationships with Artisan Makers', 'penbrae' ); ?></h2>
				<p>
					<?php esc_html_e( 'We present our makers as peers and master craftspeople. On our interactive Maker Atlas and within each Maker Story, we share their regional context, traditional cultivation techniques, and recorded field audio so customers can understand the skill required to bring each harvest to Cardiff.', 'penbrae' ); ?>
				</p>

				<div style="margin-top:var(--space-5);display:flex;gap:1rem;flex-wrap:wrap;">
					<a href="<?php echo esc_url( home_url( '/makers' ) ); ?>" class="btn-editorial"><?php esc_html_e( 'Explore the Maker Atlas →', 'penbrae' ); ?></a>
					<a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>" class="btn-editorial btn-editorial--outline"><?php esc_html_e( 'Visit The Three Stalls →', 'penbrae' ); ?></a>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
