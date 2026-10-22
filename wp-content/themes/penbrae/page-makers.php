<?php
/**
 * Template Name: Page 5 — Meet the Makers (Interactive Atlas)
 * Template Post Type: page
 *
 * Interactive maker-discovery page centred around a Leaflet + OpenStreetMap
 * atlas of Northeast India, paired with a full WCAG 2.2 AA accessible directory list.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<!-- Editorial Header -->
<section class="editorial-section" style="background:var(--color-parchment-deep);padding-bottom:var(--space-5);">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-6">
				<span class="kicker-index"><?php esc_html_e( 'CARTOGRAPHIC ARCHIVE · PAGE 05', 'penbrae' ); ?></span>
				<h1 style="margin-top:0.4rem;"><?php esc_html_e( 'Meet the Makers of Northeast India', 'penbrae' ); ?></h1>
			</div>
			<div class="col-span-6">
				<p class="lead-standfirst">
					<?php esc_html_e( 'Select a geographical marker across Assam, Meghalaya, Nagaland, Arunachal Pradesh, or Manipur to inspect each producer’s region, craft discipline, and seasonal harvests.', 'penbrae' ); ?>
				</p>
				<p style="font-size:0.86rem;color:var(--color-ink-muted);margin:0;">
					<?php esc_html_e( 'Accessibility & Data Integrity Note: A complete keyboard-accessible directory table is provided directly below the map. Sample producer records are clearly labelled for architecture verification and managed via WordPress Admin → Makers.', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Interactive Leaflet Map + Live Maker Preview Panel -->
<section aria-label="<?php esc_attr_e( 'Interactive Map of Northeast India Producers', 'penbrae' ); ?>">
	<div class="makers-atlas-layout">
		<div class="makers-map-stage">
			<div id="penbrae-makers-map" role="application" aria-label="<?php esc_attr_e( 'Interactive Leaflet map of Northeast India makers. Use the accessible directory below for full keyboard and screen-reader navigation.', 'penbrae' ); ?>"></div>
		</div>

		<div id="penbrae-maker-preview-card" class="makers-preview-panel" aria-live="polite">
			<!-- Populated dynamically by assets/js/makers-map.js on load and marker selection -->
			<noscript>
				<p><?php esc_html_e( 'JavaScript is disabled. Please use the complete Accessible Maker Directory below to browse all producer profiles and associated products.', 'penbrae' ); ?></p>
			</noscript>
		</div>
	</div>
</section>

<!-- Accessible List-Based Maker Directory -->
<section class="editorial-section" id="accessible-maker-directory" aria-labelledby="directory-heading">
	<div class="penbrae-container">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
			<div>
				<span class="kicker-index"><?php esc_html_e( 'ACCESSIBLE PRODUCER INDEX · FULL KEYBOARD & SCREEN-READER DIRECTORY', 'penbrae' ); ?></span>
				<h2 id="directory-heading" style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'Complete Directory of Documented Makers & Regions', 'penbrae' ); ?></h2>
			</div>
			<span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">
				<?php esc_html_e( 'Select "Preview on Map" or open any full documentary profile directly', 'penbrae' ); ?>
			</span>
		</div>

		<div style="overflow-x:auto;">
			<table class="commerce-ledger-table" aria-describedby="directory-heading">
				<thead>
					<tr>
						<th scope="col"><?php esc_html_e( 'Code', 'penbrae' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Maker / Collective [Sample Verification Records]', 'penbrae' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Region & Coordinates', 'penbrae' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Stall & Craft Specialty', 'penbrae' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Associated Products', 'penbrae' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Actions', 'penbrae' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="font-family:var(--font-mono);">M-01</td>
						<td><strong><?php esc_html_e( 'Brahmaputra Smallholder Tea Collective [Sample]', 'penbrae' ); ?></strong></td>
						<td style="font-family:var(--font-mono);font-size:0.78rem;">Dibrugarh, Upper Assam<br>27°28′N 94°54′E · 140m ASL</td>
						<td><?php esc_html_e( 'Tea Stall · Hand-rolled orthodox tippy Assam & bamboo-smoked reserve', 'penbrae' ); ?></td>
						<td><a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>"><?php esc_html_e( 'Tippy Orthodox Reserve (£28.00)', 'penbrae' ); ?></a></td>
						<td>
							<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
								<button type="button" class="filter-pill is-active" data-maker-select="maker-dibrugarh-tea" aria-pressed="true"><?php esc_html_e( 'Preview on Map', 'penbrae' ); ?></button>
								<a href="<?php echo esc_url( home_url( '/maker/upper-assam-orthodox-collective' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Full Story →', 'penbrae' ); ?></a>
							</div>
						</td>
					</tr>
					<tr>
						<td style="font-family:var(--font-mono);">M-02</td>
						<td><strong><?php esc_html_e( 'West Jaintia Hills Lakadong Growers [Sample]', 'penbrae' ); ?></strong></td>
						<td style="font-family:var(--font-mono);font-size:0.78rem;">West Jaintia Hills, Meghalaya<br>25°26′N 92°17′E · 1,280m ASL</td>
						<td><?php esc_html_e( 'Spice Stall · Single-origin Lakadong turmeric & sun-cured hill ginger', 'penbrae' ); ?></td>
						<td><a href="<?php echo esc_url( home_url( '/product/lakadong-turmeric-reserve' ) ); ?>"><?php esc_html_e( 'Lakadong Rhizome Reserve (£18.50)', 'penbrae' ); ?></a></td>
						<td>
							<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
								<button type="button" class="filter-pill" data-maker-select="maker-jaintia-turmeric" aria-pressed="false"><?php esc_html_e( 'Preview on Map', 'penbrae' ); ?></button>
								<a href="<?php echo esc_url( home_url( '/maker/jaintia-hills-lakadong-growers' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Full Story →', 'penbrae' ); ?></a>
							</div>
						</td>
					</tr>
					<tr>
						<td style="font-family:var(--font-mono);">M-03</td>
						<td><strong><?php esc_html_e( 'Mon District Alder-Smoke Chilli Stewards [Sample]', 'penbrae' ); ?></strong></td>
						<td style="font-family:var(--font-mono);font-size:0.78rem;">Mon District, Nagaland<br>26°43′N 95°01′E · 1,460m ASL</td>
						<td><?php esc_html_e( 'Chilli Stall · Alder-hearth smoked Naga King Chilli (Raja Mircha)', 'penbrae' ); ?></td>
						<td><a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>"><?php esc_html_e( 'Alder-Smoked King Chilli (£22.00)', 'penbrae' ); ?></a></td>
						<td>
							<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
								<button type="button" class="filter-pill" data-maker-select="maker-mon-king-chilli" aria-pressed="false"><?php esc_html_e( 'Preview on Map', 'penbrae' ); ?></button>
								<a href="<?php echo esc_url( home_url( '/maker/nagaland-alder-smoke-stewards' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Full Story →', 'penbrae' ); ?></a>
							</div>
						</td>
					</tr>
					<tr>
						<td style="font-family:var(--font-mono);">M-04</td>
						<td><strong><?php esc_html_e( 'Lower Subansiri Forest Foragers [Sample]', 'penbrae' ); ?></strong></td>
						<td style="font-family:var(--font-mono);font-size:0.78rem;">Ziro Valley, Arunachal Pradesh<br>27°32′N 93°49′E · 1,680m ASL</td>
						<td><?php esc_html_e( 'Spice Stall · Canopy-harvested wild Sichuan-type hill pepper', 'penbrae' ); ?></td>
						<td><a href="<?php echo esc_url( home_url( '/product/arunachal-wild-hill-pepper' ) ); ?>"><?php esc_html_e( 'Wild Hill Pepper (£21.00)', 'penbrae' ); ?></a></td>
						<td>
							<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
								<button type="button" class="filter-pill" data-maker-select="maker-ziro-wild-pepper" aria-pressed="false"><?php esc_html_e( 'Preview on Map', 'penbrae' ); ?></button>
								<a href="<?php echo esc_url( home_url( '/maker/ziro-valley-forest-foragers' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Full Story →', 'penbrae' ); ?></a>
							</div>
						</td>
					</tr>
					<tr>
						<td style="font-family:var(--font-mono);">M-05</td>
						<td><strong><?php esc_html_e( 'Ukhrul Ridge Hathei Cultivator Guild [Sample]', 'penbrae' ); ?></strong></td>
						<td style="font-family:var(--font-mono);font-size:0.78rem;">Sirarakhong, Ukhrul, Manipur<br>25°05′N 94°21′E · 1,750m ASL</td>
						<td><?php esc_html_e( 'Chilli Stall · Sun-ripened crimson Hathei chilli', 'penbrae' ); ?></td>
						<td><a href="<?php echo esc_url( home_url( '/product/sirarakhong-hathei-chilli' ) ); ?>"><?php esc_html_e( 'Sirarakhong Hathei Chilli (£20.00)', 'penbrae' ); ?></a></td>
						<td>
							<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
								<button type="button" class="filter-pill" data-maker-select="maker-ukhrul-hathei" aria-pressed="false"><?php esc_html_e( 'Preview on Map', 'penbrae' ); ?></button>
								<a href="<?php echo esc_url( home_url( '/maker/ukhrul-hathei-cultivators' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Full Story →', 'penbrae' ); ?></a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
