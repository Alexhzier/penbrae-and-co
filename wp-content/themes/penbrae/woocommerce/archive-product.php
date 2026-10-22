<?php
/**
 * PAGE 3 — INDIVIDUAL STALL (woocommerce/archive-product.php)
 * Reusable WooCommerce Category Template with distinct creative treatment for:
 * - Tea Stall: Calm, ceremonial, delicate, contemplative.
 * - Spice Stall: Warm, textured, aromatic, expressive.
 * - Chilli Stall: Bold, energetic, intense, sophisticated.
 *
 * @package Penbrae
 * @version 8.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$stall_slug = function_exists( 'penbrae_get_current_stall_slug' ) ? penbrae_get_current_stall_slug() : 'teas';

$stall_profiles = array(
	'teas'     => array(
		'kicker'    => 'STALL I · CALM, CEREMONIAL, DELICATE, CONTEMPLATIVE',
		'title'     => 'The Tea Stall',
		'deck'      => 'Single-harvest orthodox Assamica, high-altitude white buds, and bamboo-smoked reserve lots from Upper Assam and Arunachal Pradesh.',
		'region'    => 'Dibrugarh, Tinsukia & Lohit Valley',
		'elevation' => '140m – 1,680m ASL',
		'craft'     => 'Withered on woven bamboo trays & hand-rolled',
		'season'    => 'Second Flush & Autumnal Tippy Flush',
	),
	'spices'   => array(
		'kicker'    => 'STALL II · WARM, TEXTURED, AROMATIC, EXPRESSIVE',
		'title'     => 'The Spice Stall',
		'deck'      => 'High-curcumin single-origin Lakadong turmeric, sun-cured Sohra hill ginger, and citrus-husked wild canopy peppers.',
		'region'    => 'West Jaintia Hills, Sohra & Ziro Valley',
		'elevation' => '950m – 1,680m ASL',
		'craft'     => 'Limestone upland cultivation & sun-curing',
		'season'    => 'Winter Rhizome & Autumn Canopy Harvest',
	),
	'chillies' => array(
		'kicker'    => 'STALL III · BOLD, ENERGETIC, INTENSE, SOPHISTICATED',
		'title'     => 'The Chilli Stall',
		'deck'      => 'Alder-smoked Naga King Chilli (Raja Mircha) from Mon District and sun-ripened crimson Hathei chillies from Ukhrul Ridge.',
		'region'    => 'Mon District (Nagaland) & Ukhrul (Manipur)',
		'elevation' => '1,350m – 1,750m ASL',
		'craft'     => 'Alder-hearth smoke lofts & ridge sun-drying',
		'season'    => 'Late Monsoon & Post-Monsoon Harvest',
	),
);

$profile = isset( $stall_profiles[ $stall_slug ] ) ? $stall_profiles[ $stall_slug ] : $stall_profiles['teas'];
?>

<div data-stall="<?php echo esc_attr( $stall_slug ); ?>">
	<!-- Stall Atmospheric Header -->
	<section class="stall-masthead">
		<div class="penbrae-container">
			<div class="editorial-grid">
				<div class="col-span-7">
					<span class="kicker-index" style="color:var(--color-brass-light);"><?php echo esc_html( $profile['kicker'] ); ?></span>
					<h1 style="margin:0.4rem 0 1rem 0;"><?php echo esc_html( $profile['title'] ); ?></h1>
					<p class="lead-standfirst"><?php echo esc_html( $profile['deck'] ); ?></p>
				</div>
				<div class="col-span-5" style="display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;">
					<div style="padding:var(--space-4);border:var(--rule-light-on-dark);background:rgba(0,0,0,0.18);width:100%;">
						<div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--color-brass-light);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;">
							<?php esc_html_e( 'SWITCH STALL ENVIRONMENT', 'penbrae' ); ?>
						</div>
						<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
							<a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>" class="stall-env-pill <?php echo 'teas' === $stall_slug ? 'is-active' : ''; ?>" <?php echo 'teas' === $stall_slug ? 'aria-current="page"' : ''; ?>><?php esc_html_e( 'I. Teas', 'penbrae' ); ?></a>
							<a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>" class="stall-env-pill <?php echo 'spices' === $stall_slug ? 'is-active' : ''; ?>" <?php echo 'spices' === $stall_slug ? 'aria-current="page"' : ''; ?>><?php esc_html_e( 'II. Spices', 'penbrae' ); ?></a>
							<a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>" class="stall-env-pill <?php echo 'chillies' === $stall_slug ? 'is-active' : ''; ?>" <?php echo 'chillies' === $stall_slug ? 'aria-current="page"' : ''; ?>><?php esc_html_e( 'III. Chillies', 'penbrae' ); ?></a>
						</div>
					</div>
				</div>
			</div>

			<div class="stall-masthead__ledger">
				<div>
					<div style="color:var(--color-brass-light);"><?php esc_html_e( 'PROVENANCE DISTRICTS', 'penbrae' ); ?></div>
					<strong><?php echo esc_html( $profile['region'] ); ?></strong>
				</div>
				<div>
					<div style="color:var(--color-brass-light);"><?php esc_html_e( 'ELEVATION BAND', 'penbrae' ); ?></div>
					<strong><?php echo esc_html( $profile['elevation'] ); ?></strong>
				</div>
				<div>
					<div style="color:var(--color-brass-light);"><?php esc_html_e( 'CRAFT METHOD', 'penbrae' ); ?></div>
					<strong><?php echo esc_html( $profile['craft'] ); ?></strong>
				</div>
				<div>
					<div style="color:var(--color-brass-light);"><?php esc_html_e( 'HARVEST WINDOW', 'penbrae' ); ?></div>
					<strong><?php echo esc_html( $profile['season'] ); ?></strong>
				</div>
			</div>
		</div>
	</section>

	<!-- Accessible Filtering & Sorting Bar -->
	<div class="stall-filter-bar" role="region" aria-label="<?php esc_attr_e( 'Filter and sort stall catalogue', 'penbrae' ); ?>">
		<div class="penbrae-container stall-filter-bar__inner">
			<div class="filter-pill-group" role="group" aria-label="<?php esc_attr_e( 'Filter by Northeast India region', 'penbrae' ); ?>">
				<button type="button" class="filter-pill is-active" data-filter-region="all" aria-pressed="true"><?php esc_html_e( 'All Regions', 'penbrae' ); ?></button>
				<button type="button" class="filter-pill" data-filter-region="assam" aria-pressed="false"><?php esc_html_e( 'Assam', 'penbrae' ); ?></button>
				<button type="button" class="filter-pill" data-filter-region="meghalaya" aria-pressed="false"><?php esc_html_e( 'Meghalaya', 'penbrae' ); ?></button>
				<button type="button" class="filter-pill" data-filter-region="nagaland" aria-pressed="false"><?php esc_html_e( 'Nagaland', 'penbrae' ); ?></button>
				<button type="button" class="filter-pill" data-filter-region="arunachal" aria-pressed="false"><?php esc_html_e( 'Arunachal', 'penbrae' ); ?></button>
				<button type="button" class="filter-pill" data-filter-region="manipur" aria-pressed="false"><?php esc_html_e( 'Manipur', 'penbrae' ); ?></button>
			</div>

			<div style="display:flex;align-items:center;gap:1rem;">
				<span data-stall-count-status aria-live="polite" style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);">
					<?php esc_html_e( 'Showing curated seasonal lots', 'penbrae' ); ?>
				</span>
				<label for="penbrae-stall-sort" class="sr-only"><?php esc_html_e( 'Sort lots by', 'penbrae' ); ?></label>
				<select id="penbrae-stall-sort" data-stall-sort style="padding:0.45rem 0.85rem;border:var(--rule-strong);background:var(--color-parchment);font-family:var(--font-mono);font-size:0.74rem;">
					<option value="curated"><?php esc_html_e( 'Sort: Curated Archival Order', 'penbrae' ); ?></option>
					<option value="price-asc"><?php esc_html_e( 'Sort: Price (GBP Low → High)', 'penbrae' ); ?></option>
					<option value="price-desc"><?php esc_html_e( 'Sort: Price (GBP High → Low)', 'penbrae' ); ?></option>
					<option value="elevation-desc"><?php esc_html_e( 'Sort: Elevation (Highest First)', 'penbrae' ); ?></option>
				</select>
			</div>
		</div>
	</div>

	<!-- Product Catalogue & Curated Provenance Interlude -->
	<section class="editorial-section">
		<div class="penbrae-container">
			<div class="stall-catalogue-grid" data-stall-catalogue>
				<?php
				if ( function_exists( 'woocommerce_product_loop' ) && woocommerce_product_loop() ) {
					while ( have_posts() ) {
						the_post();
						wc_get_template_part( 'content', 'product' );
					}
				} else {
					?>
					<article class="product-specimen" data-specimen-item data-region="assam" data-price="28.00" data-elevation="140" data-order="1">
						<div class="product-specimen__header"><span>LOT 26-A</span><span>140m ASL · ASSAM</span></div>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'Dibrugarh District, Upper Assam', 'penbrae' ); ?></div>
							<h2 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>"><?php esc_html_e( 'Upper Assam Tippy Orthodox Reserve', 'penbrae' ); ?></a></h2>
							<p class="product-specimen__notes"><?php esc_html_e( 'Toasted malt, dark heather honey, stewed orchard plum, clean mineral finish.', 'penbrae' ); ?></p>
							<div class="product-specimen__provenance-links">
								<a href="<?php echo esc_url( home_url( '/maker/upper-assam-orthodox-collective' ) ); ?>"><?php esc_html_e( 'Maker Dossier', 'penbrae' ); ?></a>
								<a href="<?php echo esc_url( home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' ) ); ?>"><?php esc_html_e( 'Provenance Story', 'penbrae' ); ?></a>
							</div>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£28.00 <span class="product-specimen__weight">/ 75g</span></span>
							<button type="button" class="product-specimen__add-btn" data-add-to-basket data-product-id="upper-assam-tippy-orthodox" data-product-title="Upper Assam Tippy Orthodox Reserve" data-product-price="28.00" data-product-url="/product/upper-assam-tippy-orthodox" data-product-region="Upper Assam"><?php esc_html_e( 'Add to Basket +', 'penbrae' ); ?></button>
						</div>
					</article>
					<?php
				}
				?>
			</div>
		</div>
	</section>
</div>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
