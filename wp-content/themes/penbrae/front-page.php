<?php
/**
 * PAGE 1 — HOME (front-page.php)
 * Immersive, Photography-Led Editorial Landing Page for Penbrae & Co Ltd
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$img_base = PENBRAE_THEME_URI . '/assets/images';
?>

<!-- 1. ART-DIRECTED ASYMMETRIC EDITORIAL HERO -->
<section class="home-hero" aria-label="<?php esc_attr_e( 'Editorial Monograph Cover', 'penbrae' ); ?>">
	<div class="home-hero__grid">
		<div class="home-hero__editorial-column">
			<div class="home-hero__issue-meta">
				<span><?php esc_html_e( 'MONOGRAPH NO. 01 · AUTUMN / WINTER', 'penbrae' ); ?></span>
				<span><?php esc_html_e( 'CARDIFF ↔ NORTHEAST INDIA', 'penbrae' ); ?></span>
			</div>

			<div>
				<span class="kicker-index"><?php esc_html_e( 'SINGLE-HARVEST INGREDIENT HOUSE', 'penbrae' ); ?></span>
				<h1 class="home-hero__headline">
					<?php esc_html_e( 'Where River Mist, Limestone & Alder Smoke Shape the Harvest.', 'penbrae' ); ?>
				</h1>
				<p class="lead-standfirst">
					<?php esc_html_e( 'Rare orthodox teas, heirloom rhizomes, and hearth-smoked chillies from smallholder gardens across Northeast India—curated in Cardiff.', 'penbrae' ); ?>
				</p>
				<div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:var(--space-5);">
					<a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>" class="btn-editorial">
						<span><?php esc_html_e( 'Enter The Three Stalls', 'penbrae' ); ?></span>
						<span aria-hidden="true">→</span>
					</a>
					<a href="<?php echo esc_url( home_url( '/makers' ) ); ?>" class="btn-editorial btn-editorial--outline">
						<span><?php esc_html_e( 'Explore Maker Atlas', 'penbrae' ); ?></span>
					</a>
				</div>
			</div>

			<div class="home-hero__ledger-foot">
				<div>
					<div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);"><?php esc_html_e( 'ORIGIN CORRIDOR', 'penbrae' ); ?></div>
					<strong><?php esc_html_e( 'Assam · Meghalaya · Nagaland · Arunachal · Manipur', 'penbrae' ); ?></strong>
				</div>
				<div>
					<div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;color:var(--color-ink-muted);"><?php esc_html_e( 'HOME PORT', 'penbrae' ); ?></div>
					<strong><?php esc_html_e( 'Cardiff, Wales · GBP (£)', 'penbrae' ); ?></strong>
				</div>
			</div>
		</div>

		<div class="home-hero__visual-column">
			<img class="home-hero__visual-art" src="<?php echo esc_url( $img_base . '/hero-assam-mist.png' ); ?>" alt="<?php esc_attr_e( 'Morning mist over tea terraces and shade trees in Upper Assam', 'penbrae' ); ?>">
			<div class="specimen-figure__scrim"></div>

			<div style="position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;">
				<span class="specimen-figure__badge"><?php esc_html_e( 'UPPER ASSAM · 27°28′N 94°54′E', 'penbrae' ); ?></span>
				<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);"><?php esc_html_e( 'PLATE I · DEV MEDIA STUDY', 'penbrae' ); ?></span>
			</div>

			<div class="home-hero__visual-overlay">
				<span class="kicker-index" style="color:var(--color-brass-light);"><?php esc_html_e( 'FEATURED ARRIVAL · LOT 26-A', 'penbrae' ); ?></span>
				<h2 style="font-size:1.95rem;margin:0.35rem 0;color:var(--color-parchment);">
					<?php esc_html_e( 'Upper Assam Tippy Orthodox Reserve', 'penbrae' ); ?>
				</h2>
				<p style="font-size:0.9rem;color:rgba(245,240,230,0.86);margin-bottom:0.85rem;">
					<?php esc_html_e( 'Late-November whole-leaf pluck rich in downy golden tips. Notes of toasted malt, heather honey, and orchard plum.', 'penbrae' ); ?>
				</p>
				<div style="display:flex;justify-content:space-between;align-items:center;padding-top:0.75rem;border-top:var(--rule-light-on-dark);">
					<a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>" class="link-editorial" style="color:var(--color-parchment);border-color:var(--color-brass-light);">
						<?php esc_html_e( 'Inspect Lot (£28.00)', 'penbrae' ); ?> →
					</a>
					<a href="<?php echo esc_url( home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' ) ); ?>" style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);text-decoration:underline;">
						<?php esc_html_e( 'Provenance Story', 'penbrae' ); ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 2. BRAND INTRODUCTION WITH EDITORIAL STILL-LIFE -->
<section class="editorial-section" aria-label="<?php esc_attr_e( 'Brand Philosophy', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div class="editorial-grid" style="align-items:center;">
			<div class="col-span-5">
				<figure class="specimen-figure">
					<div class="specimen-figure__canvas" style="--aspect:4/4.6;">
						<img class="specimen-figure__img" src="<?php echo esc_url( $img_base . '/tea-infusion-cup.png' ); ?>" alt="<?php esc_attr_e( 'Amber orthodox tea infusion in stoneware cup on parchment', 'penbrae' ); ?>" loading="lazy">
						<span class="specimen-figure__badge"><?php esc_html_e( 'CARDIFF CUPPING TABLE', 'penbrae' ); ?></span>
					</div>
					<figcaption class="specimen-figure__caption">
						<span><?php esc_html_e( 'First infusion of Lot 26-A steeped at 92°C.', 'penbrae' ); ?></span>
						<span class="specimen-figure__caption-id">FIG. 02</span>
					</figcaption>
				</figure>
			</div>
			<div class="col-span-7" style="padding-left:var(--space-4);">
				<span class="kicker-index"><?php esc_html_e( '01 · QUIET LUXURY & PROVENANCE', 'penbrae' ); ?></span>
				<h2 style="font-size:clamp(2.1rem, 3.1vw, 3.25rem);line-height:1.12;margin:0.5rem 0 var(--space-4) 0;">
					<?php esc_html_e( 'An ingredient is never anonymous. Behind every leaf, rhizome, and smoked pod stands a landscape and a human hand.', 'penbrae' ); ?>
				</h2>
				<p style="color:var(--color-ink-secondary);max-width:56ch;">
					<?php esc_html_e( 'From our tasting room in Cardiff, Penbrae & Co documents and imports small-lot harvests from Assam, Meghalaya, Nagaland, Arunachal Pradesh, and Manipur—preserving the exact garden, harvest week, and craft tradition of every lot.', 'penbrae' ); ?>
				</p>
				<div style="margin-top:var(--space-4);">
					<a href="<?php echo esc_url( home_url( '/about' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read the Penbrae Manifesto →', 'penbrae' ); ?></a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 3. THREE VISUALLY DISTINCT ENTRIES INTO TEAS, SPICES & CHILLIES -->
<section class="editorial-section" style="padding-bottom:0;border-bottom:none;" aria-label="<?php esc_attr_e( 'The Three Stalls', 'penbrae' ); ?>">
	<div class="penbrae-container" style="margin-bottom:var(--space-5);">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
			<div>
				<span class="kicker-index"><?php esc_html_e( '02 · THREE CURATED EDITORIAL ENVIRONMENTS', 'penbrae' ); ?></span>
				<h2 style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'Enter The Stalls', 'penbrae' ); ?></h2>
			</div>
			<a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Compare All Three Stalls →', 'penbrae' ); ?></a>
		</div>
	</div>

	<div class="stall-triptych">
		<!-- TEA STALL -->
		<article class="stall-portal stall-portal--teas">
			<div>
				<div class="stall-portal__number">
					<span><?php esc_html_e( 'STALL I · CAMELLIA SINENSIS', 'penbrae' ); ?></span>
					<span><?php esc_html_e( 'ASSAM & ARUNACHAL', 'penbrae' ); ?></span>
				</div>
				<div class="stall-portal__photo">
					<img src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.png' ); ?>" alt="<?php esc_attr_e( 'Whole-leaf orthodox Assam tea with golden tips', 'penbrae' ); ?>" loading="lazy">
				</div>
				<h3 class="stall-portal__title"><?php esc_html_e( 'The Tea Stall', 'penbrae' ); ?></h3>
				<div class="stall-portal__mood"><?php esc_html_e( 'Calm, ceremonial, delicate, contemplative.', 'penbrae' ); ?></div>
				<p style="color:var(--color-ink-secondary);font-size:0.94rem;">
					<?php esc_html_e( 'Unblended orthodox Assamica, high-altitude white buds, and Singpho hearth-smoked bamboo teas.', 'penbrae' ); ?>
				</p>
			</div>
			<div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
				<a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>" class="btn-editorial"><?php esc_html_e( 'Enter Tea Stall →', 'penbrae' ); ?></a>
				<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £24.00</span>
			</div>
		</article>

		<!-- SPICE STALL -->
		<article class="stall-portal stall-portal--spices">
			<div>
				<div class="stall-portal__number">
					<span><?php esc_html_e( 'STALL II · RHIZOMES & BARKS', 'penbrae' ); ?></span>
					<span><?php esc_html_e( 'MEGHALAYA & ZIRO', 'penbrae' ); ?></span>
				</div>
				<div class="stall-portal__photo">
					<img src="<?php echo esc_url( $img_base . '/stall-spice-lakadong.png' ); ?>" alt="<?php esc_attr_e( 'Freshly sliced Lakadong turmeric rhizomes and wild hill peppercorns', 'penbrae' ); ?>" loading="lazy">
				</div>
				<h3 class="stall-portal__title"><?php esc_html_e( 'The Spice Stall', 'penbrae' ); ?></h3>
				<div class="stall-portal__mood"><?php esc_html_e( 'Warm, textured, aromatic, expressive.', 'penbrae' ); ?></div>
				<p style="color:var(--color-ink-secondary);font-size:0.94rem;">
					<?php esc_html_e( 'High-curcumin Lakadong turmeric from the West Jaintia Hills, sun-cured Sohra ginger, and citrus wild pepper.', 'penbrae' ); ?>
				</p>
			</div>
			<div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
				<a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>" class="btn-editorial" style="background:var(--color-terracotta);border-color:var(--color-terracotta);"><?php esc_html_e( 'Enter Spice Stall →', 'penbrae' ); ?></a>
				<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £16.00</span>
			</div>
		</article>

		<!-- CHILLI STALL -->
		<article class="stall-portal stall-portal--chillies">
			<div>
				<div class="stall-portal__number">
					<span><?php esc_html_e( 'STALL III · CAPSICUM CHINENSE', 'penbrae' ); ?></span>
					<span><?php esc_html_e( 'NAGALAND & MANIPUR', 'penbrae' ); ?></span>
				</div>
				<div class="stall-portal__photo">
					<img src="<?php echo esc_url( $img_base . '/stall-chilli-smoked.png' ); ?>" alt="<?php esc_attr_e( 'Whole alder-smoked crimson Naga King Chilli pods', 'penbrae' ); ?>" loading="lazy">
				</div>
				<h3 class="stall-portal__title"><?php esc_html_e( 'The Chilli Stall', 'penbrae' ); ?></h3>
				<div class="stall-portal__mood"><?php esc_html_e( 'Bold, energetic, intense, sophisticated.', 'penbrae' ); ?></div>
				<p style="color:var(--color-ink-secondary);font-size:0.94rem;">
					<?php esc_html_e( 'Alder-smoked Naga King Chilli from Mon District and sun-ripened crimson Hathei chillies from Ukhrul Ridge.', 'penbrae' ); ?>
				</p>
			</div>
			<div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:var(--rule-hairline);">
				<a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>" class="btn-editorial" style="background:var(--color-oxblood);border-color:var(--color-oxblood);"><?php esc_html_e( 'Enter Chilli Stall →', 'penbrae' ); ?></a>
				<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--color-ink-muted);">From £19.50</span>
			</div>
		</article>
	</div>
</section>

<!-- 4. FEATURED RARE PRODUCT & FEATURED MAKER STORY -->
<section class="editorial-section editorial-section--deep" aria-label="<?php esc_attr_e( 'Featured Harvest & Maker Story', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<!-- Featured Rare Product -->
			<div class="col-span-6" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
				<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:0.75rem;border-bottom:var(--rule-hairline);margin-bottom:1rem;">
					<span class="kicker-index"><?php esc_html_e( '03 · FEATURED RARE LOT', 'penbrae' ); ?></span>
					<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">LOT 26-C · NAGALAND</span>
				</div>
				<div class="journal-card__media" style="aspect-ratio:16/9;">
					<img src="<?php echo esc_url( $img_base . '/stall-chilli-smoked.png' ); ?>" alt="<?php esc_attr_e( 'Whole Alder-Smoked Naga King Chilli Pods', 'penbrae' ); ?>" loading="lazy">
				</div>
				<h2 style="font-size:2rem;margin:0.5rem 0 0.25rem 0;">
					<a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
						<?php esc_html_e( 'Whole Alder-Smoked Naga King Chilli Pods', 'penbrae' ); ?>
					</a>
				</h2>
				<div class="latin-taxonomy" style="margin-bottom:0.85rem;">Capsicum chinense · Mon District, Nagaland · 1,460m ASL</div>
				<p style="color:var(--color-ink-secondary);font-size:0.94rem;">
					<?php esc_html_e( 'Cured for fourteen days on bamboo racks above smouldering alder-wood hearths. Slow-building warmth layered with dried sour cherry and woodsmoke.', 'penbrae' ); ?>
				</p>
				<div style="padding:1rem 0;margin:1rem 0;border-top:var(--rule-hairline);border-bottom:var(--rule-hairline);display:flex;justify-content:space-between;align-items:center;">
					<div>
						<span class="tabular-nums" style="font-family:var(--font-editorial);font-size:1.85rem;">£22.00</span>
						<span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--color-ink-muted);margin-left:0.5rem;">/ 40g Glass Jar</span>
					</div>
					<button type="button" class="btn-editorial"
						data-add-to-basket
						data-product-id="alder-smoked-naga-king-chilli"
						data-product-title="Whole Alder-Smoked Naga King Chilli Pods"
						data-product-variant="40g Sealed Glass Jar"
						data-product-price="22.00"
						data-product-qty="1"
						data-product-url="/product/alder-smoked-naga-king-chilli"
						data-product-region="Mon District, Nagaland">
						<?php esc_html_e( 'Add to Basket +', 'penbrae' ); ?>
					</button>
				</div>
				<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;">
					<a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Tasting Dossier →', 'penbrae' ); ?></a>
					<a href="<?php echo esc_url( home_url( '/story/alder-smoke-and-monsoon-mist' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Product Story →', 'penbrae' ); ?></a>
				</div>
			</div>

			<!-- Featured Maker Story -->
			<div class="col-span-6" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
				<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:0.75rem;border-bottom:var(--rule-hairline);margin-bottom:1rem;">
					<span class="kicker-index"><?php esc_html_e( '04 · FEATURED MAKER DOCUMENTARY', 'penbrae' ); ?></span>
					<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-ink-muted);">DOSSIER M-01 · UPPER ASSAM</span>
				</div>
				<div class="journal-card__media" style="aspect-ratio:16/9;">
					<img src="<?php echo esc_url( $img_base . '/maker-hands-crafting.png' ); ?>" alt="<?php esc_attr_e( 'Artisan hands rolling withered tea leaves on woven bamboo tray', 'penbrae' ); ?>" loading="lazy">
				</div>
				<h2 style="font-size:2rem;margin:0.5rem 0 0.25rem 0;">
					<a href="<?php echo esc_url( home_url( '/maker/upper-assam-orthodox-collective' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
						<?php esc_html_e( 'Brahmaputra Smallholder Tea Collective', 'penbrae' ); ?>
					</a>
				</h2>
				<div class="latin-taxonomy" style="margin-bottom:0.85rem;">Dibrugarh &amp; Tinsukia, Upper Assam · 27°28′N 94°54′E</div>
				<?php get_template_part( 'template-parts/audio-documentary' ); ?>
				<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;margin-top:1rem;">
					<a href="<?php echo esc_url( home_url( '/maker/upper-assam-orthodox-collective' ) ); ?>" class="btn-editorial btn-editorial--outline"><?php esc_html_e( 'Read Maker Profile →', 'penbrae' ); ?></a>
					<a href="<?php echo esc_url( home_url( '/makers' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Locate on Map →', 'penbrae' ); ?></a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 5. VISUAL INTRODUCTION TO NORTHEAST INDIA -->
<section class="editorial-section editorial-section--forest" aria-label="<?php esc_attr_e( 'Northeast India Origins', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div class="editorial-grid" style="margin-bottom:var(--space-5);">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( '05 · GEOGRAPHY OF ORIGIN', 'penbrae' ); ?></span>
				<h2 style="margin-top:0.5rem;"><?php esc_html_e( 'The Landscapes of Northeast India', 'penbrae' ); ?></h2>
			</div>
			<div class="col-span-7">
				<p class="lead-standfirst">
					<?php esc_html_e( 'From the misty floodplains of the Brahmaputra at 140 metres to cloud-wrapped limestone plateaus and ridges above 1,700 metres.', 'penbrae' ); ?>
				</p>
			</div>
		</div>

		<div class="editorial-grid">
			<div class="col-span-4">
				<div class="region-card__photo">
					<img src="<?php echo esc_url( $img_base . '/hero-assam-mist.png' ); ?>" alt="<?php esc_attr_e( 'Upper Assam tea gardens in morning fog', 'penbrae' ); ?>" loading="lazy">
				</div>
				<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">27°28′N 94°54′E · 140m ASL</div>
				<h3 style="margin:0.35rem 0;"><?php esc_html_e( 'Upper Assam', 'penbrae' ); ?></h3>
				<p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">
					<?php esc_html_e( 'Alluvial clay and heavy river fog nurturing tippy orthodox Assamica and Singpho bamboo-smoked teas.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>" class="link-editorial" style="color:var(--color-brass-light);"><?php esc_html_e( 'Explore Assam Lots →', 'penbrae' ); ?></a>
			</div>

			<div class="col-span-4">
				<div class="region-card__photo">
					<img src="<?php echo esc_url( $img_base . '/landscape-meghalaya-hills.png' ); ?>" alt="<?php esc_attr_e( 'Cloud-wrapped limestone hills of Meghalaya', 'penbrae' ); ?>" loading="lazy">
				</div>
				<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">25°26′N 92°17′E · 1,280m ASL</div>
				<h3 style="margin:0.35rem 0;"><?php esc_html_e( 'Meghalaya Plateau', 'penbrae' ); ?></h3>
				<p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">
					<?php esc_html_e( 'Limestone uplands in West Jaintia and Sohra yielding high-curcumin Lakadong turmeric and heirloom hill ginger.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>" class="link-editorial" style="color:var(--color-brass-light);"><?php esc_html_e( 'Explore Meghalaya Lots →', 'penbrae' ); ?></a>
			</div>

			<div class="col-span-4">
				<div class="region-card__photo">
					<img src="<?php echo esc_url( $img_base . '/journal-preservation-loft.png' ); ?>" alt="<?php esc_attr_e( 'Traditional bamboo drying loft in Nagaland', 'penbrae' ); ?>" loading="lazy">
				</div>
				<div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">26°43′N 95°01′E · 1,460m ASL</div>
				<h3 style="margin:0.35rem 0;"><?php esc_html_e( 'Nagaland & Manipur Uplands', 'penbrae' ); ?></h3>
				<p style="font-size:0.9rem;color:rgba(245,240,230,0.8);">
					<?php esc_html_e( 'Terraced ridges cultivating alder-smoked Raja Mircha and Sirarakhong Hathei crimson chillies.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>" class="link-editorial" style="color:var(--color-brass-light);"><?php esc_html_e( 'Explore Nagaland & Manipur →', 'penbrae' ); ?></a>
			</div>
		</div>
	</div>
</section>

<!-- 6. EDITORIAL JOURNAL HIGHLIGHT -->
<section class="editorial-section" aria-label="<?php esc_attr_e( 'The Penbrae Journal', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:var(--space-5);">
			<div>
				<span class="kicker-index"><?php esc_html_e( '06 · THE PENBRAE JOURNAL · ISSUE 01', 'penbrae' ); ?></span>
				<h2 style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'Essays on Terroir, Craft & Culinary Tradition', 'penbrae' ); ?></h2>
			</div>
			<a href="<?php echo esc_url( home_url( '/journal' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Full Journal Archive →', 'penbrae' ); ?></a>
		</div>

		<div class="editorial-grid">
			<article class="col-span-7 journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-5);">
				<div class="journal-card__media">
					<img src="<?php echo esc_url( $img_base . '/journal-preservation-loft.png' ); ?>" alt="<?php esc_attr_e( 'Woven bamboo trays inside a traditional drying loft', 'penbrae' ); ?>" loading="lazy">
				</div>
				<span class="kicker-index"><?php esc_html_e( 'LEAD ESSAY · TERROIR & TRADITION', 'penbrae' ); ?></span>
				<h3 style="font-size:2.1rem;margin:0.4rem 0 0.75rem 0;">
					<a href="<?php echo esc_url( home_url( '/journal/smoke-mist-and-limestone-terroir' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
						<?php esc_html_e( 'Smoke, Mist & Limestone: Why Preservation Is the Second Harvest of Northeast India', 'penbrae' ); ?>
					</a>
				</h3>
				<p style="color:var(--color-ink-secondary);font-size:0.95rem;">
					<?php esc_html_e( 'From bamboo smoke-lofts in Mon District to sun-warmed slate courtyards in Meghalaya, how preservation shapes flavour.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/journal/smoke-mist-and-limestone-terroir' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Essay (8 Min Read) →', 'penbrae' ); ?></a>
			</article>

			<div class="col-span-5" style="display:flex;flex-direction:column;gap:var(--space-4);">
				<article class="journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-4);">
					<div class="journal-card__media" style="aspect-ratio:21/9;">
						<img src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.png' ); ?>" alt="<?php esc_attr_e( 'Orthodox Assam tea leaves', 'penbrae' ); ?>" loading="lazy">
					</div>
					<span class="kicker-index"><?php esc_html_e( 'TEA CEREMONY & VESSEL', 'penbrae' ); ?></span>
					<h3 style="font-size:1.45rem;margin:0.35rem 0;">
						<a href="<?php echo esc_url( home_url( '/journal/orthodox-vs-ctc-assam-leaf' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
							<?php esc_html_e( 'Beyond the Breakfast Blend: Reading Whole-Leaf Orthodox Assam', 'penbrae' ); ?>
						</a>
					</h3>
					<a href="<?php echo esc_url( home_url( '/journal/orthodox-vs-ctc-assam-leaf' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Article →', 'penbrae' ); ?></a>
				</article>

				<article class="journal-card" style="border:var(--rule-hairline);background:var(--color-parchment-light);padding:var(--space-4);">
					<div class="journal-card__media" style="aspect-ratio:21/9;">
						<img src="<?php echo esc_url( $img_base . '/stall-spice-lakadong.png' ); ?>" alt="<?php esc_attr_e( 'Lakadong turmeric and spices', 'penbrae' ); ?>" loading="lazy">
					</div>
					<span class="kicker-index"><?php esc_html_e( 'CULINARY NOTES', 'penbrae' ); ?></span>
					<h3 style="font-size:1.45rem;margin:0.35rem 0;">
						<a href="<?php echo esc_url( home_url( '/journal/tempering-lakadong-and-smoked-chilli' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
							<?php esc_html_e( 'Tempering in Warm Fat: Lakadong & Alder-Smoked Chilli', 'penbrae' ); ?>
						</a>
					</h3>
					<a href="<?php echo esc_url( home_url( '/journal/tempering-lakadong-and-smoked-chilli' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Read Article →', 'penbrae' ); ?></a>
				</article>
			</div>
		</div>
	</div>
</section>

<?php get_template_part( 'template-parts/instagram-field-notes' ); ?>

<!-- 7. NEWSLETTER INVITATION -->
<section class="editorial-section editorial-section--deep" aria-label="<?php esc_attr_e( 'Subscribe to the Penbrae Dispatch', 'penbrae' ); ?>">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-6">
				<span class="kicker-index"><?php esc_html_e( '07 · THE PENBRAE DISPATCH', 'penbrae' ); ?></span>
				<h2 style="margin-top:0.4rem;"><?php esc_html_e( 'Seasonal Harvest Letters & First-Lot Allocations', 'penbrae' ); ?></h2>
				<p style="color:var(--color-ink-secondary);">
					<?php esc_html_e( 'Subscribers receive field dispatches from Northeast India, maker interviews, and 48-hour advance notice when limited seasonal lots arrive in Cardiff.', 'penbrae' ); ?>
				</p>
			</div>
			<div class="col-span-6">
				<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" data-penbrae-newsletter-form data-ajax-preview="true" style="background:var(--color-parchment-light);padding:var(--space-5);border:var(--rule-strong);">
					<input type="hidden" name="action" value="penbrae_newsletter_subscribe">
					<?php wp_nonce_field( 'penbrae_subscribe_action', 'penbrae_newsletter_nonce' ); ?>
					<div class="editorial-form-field">
						<label for="home-subscriber-email"><?php esc_html_e( 'Electronic Mail Address', 'penbrae' ); ?></label>
						<input type="email" id="home-subscriber-email" name="subscriber_email" required placeholder="reader@domain.co.uk">
					</div>
					<div class="consent-checkbox-box">
						<input type="checkbox" id="home-gdpr-consent" name="gdpr_consent" value="1" required>
						<label for="home-gdpr-consent">
							<?php esc_html_e( 'I explicitly consent to receive editorial dispatches and seasonal harvest notices from Penbrae & Co Ltd (UK GDPR).', 'penbrae' ); ?>
						</label>
					</div>
					<button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">
						<?php esc_html_e( 'Register for the Seasonal Dispatch →', 'penbrae' ); ?>
					</button>
					<p data-newsletter-status aria-live="polite" style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.76rem;"></p>
				</form>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
