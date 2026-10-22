<?php
/**
 * PAGE 4 — PRODUCT DETAILS (woocommerce/single-product.php)
 * Combines refined GBP e-commerce with high-resolution gallery photography,
 * provenance storytelling, maker connections, and a restrained mobile sticky purchase bar.
 *
 * @package Penbrae
 * @version 9.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$img_base = PENBRAE_THEME_URI . '/assets/images';

while ( have_posts() ) :
	the_post();
	global $product;

	$post_id        = get_the_ID();
	$lot_code       = get_post_meta( $post_id, '_penbrae_lot_code', true ) ?: 'LOT 26-A';
	$latin_name     = get_post_meta( $post_id, '_penbrae_latin_name', true ) ?: 'Camellia sinensis var. assamica';
	$elevation      = get_post_meta( $post_id, '_penbrae_elevation', true ) ?: '140m ASL';
	$harvest_window = get_post_meta( $post_id, '_penbrae_harvest_window', true ) ?: 'Late November (Autumnal Tippy Flush)';
	$tasting_notes  = get_post_meta( $post_id, '_penbrae_tasting_notes', true ) ?: 'Toasted malt, dark heather honey, stewed orchard plum, clean mineral finish.';
	$prep_guide     = get_post_meta( $post_id, '_penbrae_preparation_guide', true ) ?: '3.5g leaf per 250ml spring water at 92°C. Infuse for 3 minutes 30 seconds; yields three distinct infusions.';
	$scoville_shu   = get_post_meta( $post_id, '_penbrae_scoville_shu', true );
	$maker_id       = get_post_meta( $post_id, '_penbrae_maker_id', true );
	$story_id       = get_post_meta( $post_id, '_penbrae_story_id', true );
	$price_num      = ( $product && method_exists( $product, 'get_price' ) && $product->get_price() ) ? (float) $product->get_price() : 28.00;
	$in_stock       = ( $product && method_exists( $product, 'is_in_stock' ) ) ? $product->is_in_stock() : true;
	$regions        = wp_get_post_terms( $post_id, 'penbrae_region', array( 'fields' => 'names' ) );
	$region_name    = ( ! is_wp_error( $regions ) && ! empty( $regions ) ) ? $regions[0] : 'Dibrugarh District, Upper Assam';
	?>

	<nav aria-label="<?php esc_attr_e( 'Product Provenance Breadcrumb', 'penbrae' ); ?>" style="padding:0.85rem var(--gutter);border-bottom:var(--rule-hairline);font-family:var(--font-mono);font-size:0.74rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
		<div>
			<a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>" style="color:var(--color-ink-muted);text-decoration:none;"><?php esc_html_e( 'The Stalls', 'penbrae' ); ?></a>
			<span aria-hidden="true"> / </span>
			<a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>" style="color:var(--color-ink-muted);text-decoration:none;"><?php echo esc_html( $region_name ); ?></a>
			<span aria-hidden="true"> / </span>
			<span style="color:var(--color-charcoal);"><?php the_title(); ?></span>
		</div>
		<span style="color:var(--color-brass);"><?php echo esc_html( $lot_code . ' · ' . $elevation ); ?></span>
	</nav>

	<section class="pdp-dossier" aria-label="<?php esc_attr_e( 'Product Gallery and Acquisition Dossier', 'penbrae' ); ?>">
		<!-- Left Column: Interactive Photographic Gallery + Dedicated Story Teaser -->
		<div class="pdp-gallery-column">
			<figure class="specimen-figure">
				<div class="specimen-figure__canvas" style="--aspect:4/4.2;">
					<img class="specimen-figure__img" data-gallery-stage-img src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.jpg' ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>">
					<span class="specimen-figure__badge" data-gallery-stage-badge><?php esc_html_e( 'PLATE I — DRY SPECIMEN', 'penbrae' ); ?></span>
				</div>
				<figcaption class="specimen-figure__caption">
					<span data-gallery-stage-caption><?php esc_html_e( 'Unbroken whole-leaf specimen with golden terminal buds.', 'penbrae' ); ?></span>
					<span class="specimen-figure__caption-id"><?php echo esc_html( $lot_code ); ?></span>
				</figcaption>
			</figure>

			<div class="pdp-gallery-thumbs" role="tablist" aria-label="<?php esc_attr_e( 'Product photography views', 'penbrae' ); ?>">
				<button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="true"
					data-gallery-thumb
					data-img-src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.jpg' ); ?>"
					data-plate-id="PLATE I — DRY SPECIMEN"
					data-caption="Unbroken whole-leaf specimen and golden terminal buds.">
					<img src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.jpg' ); ?>" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
					<strong>01 · Dry Specimen</strong>
				</button>
				<button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="false"
					data-gallery-thumb
					data-img-src="<?php echo esc_url( $img_base . '/tea-infusion-cup.jpg' ); ?>"
					data-plate-id="PLATE II — IN THE VESSEL"
					data-caption="Amber liquor clarity after 3 minutes 30 seconds at 92°C.">
					<img src="<?php echo esc_url( $img_base . '/tea-infusion-cup.jpg' ); ?>" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
					<strong>02 · In the Vessel</strong>
				</button>
				<button type="button" class="pdp-gallery-thumb" role="tab" aria-selected="false"
					data-gallery-thumb
					data-img-src="<?php echo esc_url( $img_base . '/hero-assam-mist.jpg' ); ?>"
					data-plate-id="PLATE III — FIELD ORIGIN"
					data-caption="Morning mist over smallholder plots in Upper Assam.">
					<img src="<?php echo esc_url( $img_base . '/hero-assam-mist.jpg' ); ?>" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover;margin-bottom:0.4rem;">
					<strong>03 · Field Origin</strong>
				</button>
			</div>

			<div style="margin-top:var(--space-5);padding:var(--space-5);background:var(--color-parchment-deep);border:var(--rule-strong);">
				<span class="kicker-index"><?php esc_html_e( 'DEDICATED INGREDIENT MONOGRAPH', 'penbrae' ); ?></span>
				<h2 style="font-size:1.85rem;margin:0.4rem 0 0.65rem 0;">
					<?php esc_html_e( 'Read the Provenance Story of This Harvest', 'penbrae' ); ?>
				</h2>
				<p style="font-size:0.94rem;color:var(--color-ink-secondary);margin-bottom:1.1rem;">
					<?php esc_html_e( 'Explore how river fog, soil mineralogy, and hand-rolling tables shape this lot.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( $story_id ? get_permalink( $story_id ) : home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' ) ); ?>" class="btn-editorial btn-editorial--outline">
					<?php esc_html_e( 'Read Product Story →', 'penbrae' ); ?>
				</a>
			</div>
		</div>

		<!-- Right Column: Commerce Acquisition + Tasting & Origin Ledger -->
		<div class="pdp-purchase-column">
			<span class="kicker-index"><?php echo esc_html( $lot_code . ' · ' . $region_name ); ?></span>
			<h1 style="font-size:clamp(2.1rem,3vw,3.1rem);margin:0.4rem 0 0.25rem 0;"><?php the_title(); ?></h1>
			<div class="latin-taxonomy"><?php echo esc_html( $latin_name ); ?></div>

			<div class="pdp-price-row">
				<div>
					<span class="pdp-price-gbp" data-pdp-price>£<?php echo esc_html( number_format( $price_num, 2 ) ); ?></span>
					<span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);display:block;margin-top:0.25rem;">
						<?php esc_html_e( 'Currency: GBP (£) · Small-batch seasonal import', 'penbrae' ); ?>
					</span>
				</div>
				<span class="pdp-stock-badge">
					<?php echo $in_stock ? esc_html__( 'In Stock · Cardiff Dispatch', 'penbrae' ) : esc_html__( 'Harvest Exhausted', 'penbrae' ); ?>
				</span>
			</div>

			<div style="color:var(--color-ink-secondary);margin-bottom:var(--space-4);">
				<?php the_content(); ?>
			</div>

			<?php if ( ! empty( $scoville_shu ) ) : ?>
				<div class="scoville-meter" role="region" aria-label="<?php esc_attr_e( 'Scoville Heat Index', 'penbrae' ); ?>">
					<div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;">
						<span><?php esc_html_e( 'Scoville Heat Register', 'penbrae' ); ?></span>
						<strong><?php echo esc_html( $scoville_shu ); ?></strong>
					</div>
					<div class="scoville-meter__track"><div class="scoville-meter__fill" style="width:82%;"></div></div>
				</div>
			<?php endif; ?>

			<div class="pdp-variant-group" role="radiogroup" aria-label="<?php esc_attr_e( 'Select weight or vessel format', 'penbrae' ); ?>">
				<span style="font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);">
					<?php esc_html_e( 'Select Format / Weight Variant:', 'penbrae' ); ?>
				</span>
				<div class="pdp-variant-options">
					<button type="button" class="pdp-variant-btn" role="radio" aria-checked="true"
						data-variant-option
						data-variant-label="75g Archival Caddy"
						data-variant-price="<?php echo esc_attr( number_format( $price_num, 2, '.', '' ) ); ?>">
						<strong>75g Caddy</strong><br>
						<span>£<?php echo esc_html( number_format( $price_num, 2 ) ); ?></span>
					</button>
					<button type="button" class="pdp-variant-btn" role="radio" aria-checked="false"
						data-variant-option
						data-variant-label="150g Refill Pouch"
						data-variant-price="<?php echo esc_attr( number_format( $price_num * 1.8, 2, '.', '' ) ); ?>">
						<strong>150g Pouch</strong><br>
						<span>£<?php echo esc_html( number_format( $price_num * 1.8, 2 ) ); ?></span>
					</button>
					<button type="button" class="pdp-variant-btn" role="radio" aria-checked="false"
						data-variant-option
						data-variant-label="25g Tasting Sample"
						data-variant-price="<?php echo esc_attr( number_format( $price_num * 0.45, 2, '.', '' ) ); ?>">
						<strong>25g Sample</strong><br>
						<span>£<?php echo esc_html( number_format( $price_num * 0.45, 2 ) ); ?></span>
					</button>
				</div>
			</div>

			<div class="pdp-purchase-actions">
				<div>
					<label for="pdp-quantity-select" class="sr-only"><?php esc_html_e( 'Quantity', 'penbrae' ); ?></label>
					<input type="number" id="pdp-quantity-select" class="pdp-qty-input" value="1" min="1" max="20" data-pdp-qty>
				</div>
				<button type="button" class="btn-editorial" style="justify-content:center;font-size:0.82rem;"
					data-add-to-basket
					data-pdp-add-btn
					data-product-id="<?php echo esc_attr( get_post_field( 'post_name', $post_id ) ); ?>"
					data-product-title="<?php echo esc_attr( get_the_title() ); ?>"
					data-product-variant="75g Archival Caddy"
					data-product-price="<?php echo esc_attr( number_format( $price_num, 2, '.', '' ) ); ?>"
					data-product-qty="1"
					data-product-url="<?php echo esc_url( get_permalink() ); ?>"
					data-product-region="<?php echo esc_attr( $region_name ); ?>">
					<?php esc_html_e( 'Add to Basket — GBP (£)', 'penbrae' ); ?>
				</button>
			</div>

			<table class="pdp-ledger-table" aria-label="<?php esc_attr_e( 'Tasting notes, origin, maker, and preparation details', 'penbrae' ); ?>">
				<tbody>
					<tr>
						<th><?php esc_html_e( 'Tasting Profile', 'penbrae' ); ?></th>
						<td><?php echo esc_html( $tasting_notes ); ?></td>
					</tr>
					<tr>
						<th><?php esc_html_e( 'Origin & Region', 'penbrae' ); ?></th>
						<td><?php echo esc_html( $region_name . ' (' . $elevation . ')' ); ?></td>
					</tr>
					<tr>
						<th><?php esc_html_e( 'Harvest Window', 'penbrae' ); ?></th>
						<td><?php echo esc_html( $harvest_window ); ?></td>
					</tr>
					<tr>
						<th><?php esc_html_e( 'Artisan / Maker', 'penbrae' ); ?></th>
						<td>
							<a href="<?php echo esc_url( $maker_id ? get_permalink( $maker_id ) : home_url( '/maker/upper-assam-orthodox-collective' ) ); ?>" style="color:var(--color-charcoal);font-weight:500;text-decoration:underline;">
								<?php echo esc_html( $maker_id ? get_the_title( $maker_id ) : 'Brahmaputra Smallholder Tea Collective' ); ?> →
							</a>
						</td>
					</tr>
					<tr>
						<th><?php esc_html_e( 'Preparation / Usage', 'penbrae' ); ?></th>
						<td><?php echo esc_html( $prep_guide ); ?></td>
					</tr>
					<tr>
						<th><?php esc_html_e( 'Shipping & Dispatch', 'penbrae' ); ?></th>
						<td>
							<?php esc_html_e( 'Dispatched from Cardiff, Wales in airtight UV-protected vessels.', 'penbrae' ); ?>
							<a href="<?php echo esc_url( home_url( '/shipping-returns' ) ); ?>" style="color:var(--color-charcoal);margin-left:0.35rem;"><?php esc_html_e( 'Shipping Policy', 'penbrae' ); ?></a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<div class="pdp-sticky-mobile-bar" role="region" aria-label="<?php esc_attr_e( 'Quick mobile purchase bar', 'penbrae' ); ?>">
		<div>
			<div style="font-family:var(--font-editorial);font-size:1.15rem;line-height:1.1;"><?php the_title(); ?></div>
			<span class="tabular-nums" data-pdp-price style="font-family:var(--font-mono);font-size:0.85rem;color:var(--color-forest);">£<?php echo esc_html( number_format( $price_num, 2 ) ); ?></span>
		</div>
		<button type="button" class="btn-editorial" style="padding:0.65rem 1.1rem;min-height:44px;"
			data-add-to-basket
			data-pdp-add-btn
			data-product-id="<?php echo esc_attr( get_post_field( 'post_name', $post_id ) ); ?>"
			data-product-title="<?php echo esc_attr( get_the_title() ); ?>"
			data-product-variant="75g Archival Caddy"
			data-product-price="<?php echo esc_attr( number_format( $price_num, 2, '.', '' ) ); ?>"
			data-product-qty="1"
			data-product-url="<?php echo esc_url( get_permalink() ); ?>"
			data-product-region="<?php echo esc_attr( $region_name ); ?>">
			<?php esc_html_e( 'Add to Basket +', 'penbrae' ); ?>
		</button>
	</div>

	<?php
	get_template_part( 'template-parts/non-linear-compass' );
endwhile;

get_footer();
