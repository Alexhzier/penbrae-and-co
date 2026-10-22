<?php
/**
 * Template Name: Page 2 — The Stalls Overview
 * Template Post Type: page
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
				<span class="kicker-index"><?php esc_html_e( 'ARCHITECTURAL CATALOGUE · PAGE 02', 'penbrae' ); ?></span>
				<h1 style="margin-top:0.4rem;"><?php esc_html_e( 'The Three Stalls', 'penbrae' ); ?></h1>
			</div>
			<div class="col-span-7">
				<p class="lead-standfirst">
					<?php esc_html_e( 'Three dedicated editorial environments—each shaped by the sensory discipline, harvest calendar, and preservation craft of its ingredients.', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- STICKY STALL ENVIRONMENT SWITCHER BAR -->
<div class="stalls-environment-bar" data-stalls-env-bar data-active-env="teas" role="navigation" aria-label="<?php esc_attr_e( 'Switch or scroll between Stall environments', 'penbrae' ); ?>">
	<div class="stalls-environment-bar__inner">
		<span class="kicker-index" style="margin:0;"><?php esc_html_e( 'STALL ATMOSPHERE INDEX · SCROLL OR SELECT', 'penbrae' ); ?></span>
		<div class="stalls-environment-bar__tabs">
			<a href="#stall-env-teas" class="stalls-env-tab is-active" data-env-target="teas">
				<span class="stalls-env-tab__dot" style="background:var(--color-forest);"></span>
				<span><?php esc_html_e( 'I. The Tea Stall', 'penbrae' ); ?></span>
			</a>
			<a href="#stall-env-spices" class="stalls-env-tab" data-env-target="spices">
				<span class="stalls-env-tab__dot" style="background:var(--color-terracotta);"></span>
				<span><?php esc_html_e( 'II. The Spice Stall', 'penbrae' ); ?></span>
			</a>
			<a href="#stall-env-chillies" class="stalls-env-tab" data-env-target="chillies">
				<span class="stalls-env-tab__dot" style="background:var(--color-oxblood);"></span>
				<span><?php esc_html_e( 'III. The Chilli Stall', 'penbrae' ); ?></span>
			</a>
		</div>
	</div>
</div>

<!-- ENVIRONMENT I: THE TEA STALL -->
<section id="stall-env-teas" data-stall-section="teas" class="editorial-section stall-theme-teas" style="background:#EFECE1;" aria-labelledby="stall-heading-teas">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'STALL I · CALM & CEREMONIAL', 'penbrae' ); ?></span>
				<h2 id="stall-heading-teas" style="font-size:clamp(2.4rem,3.5vw,3.6rem);margin:0.4rem 0;"><?php esc_html_e( 'The Tea Stall', 'penbrae' ); ?></h2>
				<p class="latin-taxonomy" style="font-size:1.25rem;margin-bottom:1.1rem;"><?php esc_html_e( 'Camellia sinensis var. assamica · Upper Assam & Arunachal', 'penbrae' ); ?></p>
				<p style="color:var(--color-ink-secondary);">
					<?php esc_html_e( 'Delicate, contemplative, and unhurried. Smallholder gardens that pluck whole terminal buds and hand-roll orthodox leaf on woven bamboo mats.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>" class="btn-editorial" style="margin-top:1rem;"><?php esc_html_e( 'Enter The Tea Stall →', 'penbrae' ); ?></a>
			</div>

			<div class="col-span-7">
				<div class="editorial-grid">
					<article class="col-span-6 product-specimen">
						<div class="product-specimen__header"><span>LOT 26-A</span><span>140m ASL · ASSAM</span></div>
						<a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>" class="product-specimen__media">
							<img src="<?php echo esc_url( $img_base . '/stall-tea-orthodox.jpg' ); ?>" alt="<?php esc_attr_e( 'Upper Assam Tippy Orthodox Reserve', 'penbrae' ); ?>" class="product-specimen__img" loading="lazy">
						</a>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'Dibrugarh, Upper Assam', 'penbrae' ); ?></div>
							<h3 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>"><?php esc_html_e( 'Upper Assam Tippy Orthodox Reserve', 'penbrae' ); ?></a></h3>
							<p class="product-specimen__notes"><?php esc_html_e( 'Toasted malt, dark heather honey, stewed orchard plum.', 'penbrae' ); ?></p>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£28.00 <span class="product-specimen__weight">/ 75g</span></span>
							<a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>" class="product-specimen__add-btn" style="display:inline-flex;align-items:center;text-decoration:none;"><?php esc_html_e( 'Inspect →', 'penbrae' ); ?></a>
						</div>
					</article>

					<article class="col-span-6 product-specimen">
						<div class="product-specimen__header"><span>LOT 26-B</span><span>380m ASL · ASSAM/ARUNACHAL</span></div>
						<a href="<?php echo esc_url( home_url( '/product/singpho-bamboo-smoked-tea' ) ); ?>" class="product-specimen__media">
							<img src="<?php echo esc_url( $img_base . '/tea-bamboo-smoked.jpg' ); ?>" alt="<?php esc_attr_e( 'Singpho Hearth-Smoked Bamboo Tea', 'penbrae' ); ?>" class="product-specimen__img" loading="lazy">
						</a>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'Margherita & Lohit Border', 'penbrae' ); ?></div>
							<h3 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/singpho-bamboo-smoked-tea' ) ); ?>"><?php esc_html_e( 'Singpho Hearth-Smoked Bamboo Tea (Phalap)', 'penbrae' ); ?></a></h3>
							<p class="product-specimen__notes"><?php esc_html_e( 'Roasted green bamboo internode, sweet woodsmoke, dried apricot.', 'penbrae' ); ?></p>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£34.00 <span class="product-specimen__weight">/ 60g</span></span>
							<a href="<?php echo esc_url( home_url( '/product/singpho-bamboo-smoked-tea' ) ); ?>" class="product-specimen__add-btn" style="display:inline-flex;align-items:center;text-decoration:none;"><?php esc_html_e( 'Inspect →', 'penbrae' ); ?></a>
						</div>
					</article>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ENVIRONMENT II: THE SPICE STALL -->
<section id="stall-env-spices" data-stall-section="spices" class="editorial-section stall-theme-spices" style="background:#F3E8DA;" aria-labelledby="stall-heading-spices">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-7">
				<div class="editorial-grid">
					<article class="col-span-6 product-specimen">
						<div class="product-specimen__header"><span>LOT 26-D</span><span>1,280m ASL · MEGHALAYA</span></div>
						<a href="<?php echo esc_url( home_url( '/product/lakadong-turmeric-reserve' ) ); ?>" class="product-specimen__media">
							<img src="<?php echo esc_url( $img_base . '/stall-spice-lakadong.jpg' ); ?>" alt="<?php esc_attr_e( 'Single-Harvest Lakadong Rhizome Reserve', 'penbrae' ); ?>" class="product-specimen__img" loading="lazy">
						</a>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'West Jaintia Hills, Meghalaya', 'penbrae' ); ?></div>
							<h3 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/lakadong-turmeric-reserve' ) ); ?>"><?php esc_html_e( 'Single-Harvest Lakadong Rhizome Reserve', 'penbrae' ); ?></a></h3>
							<p class="product-specimen__notes"><?php esc_html_e( 'High-curcumin deep saffron-orange rhizome; ginger blossom & resin.', 'penbrae' ); ?></p>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£18.50 <span class="product-specimen__weight">/ 80g</span></span>
							<a href="<?php echo esc_url( home_url( '/product/lakadong-turmeric-reserve' ) ); ?>" class="product-specimen__add-btn" style="display:inline-flex;align-items:center;text-decoration:none;"><?php esc_html_e( 'Inspect →', 'penbrae' ); ?></a>
						</div>
					</article>

					<article class="col-span-6 product-specimen">
						<div class="product-specimen__header"><span>LOT 26-E</span><span>1,680m ASL · ARUNACHAL</span></div>
						<a href="<?php echo esc_url( home_url( '/product/arunachal-wild-hill-pepper' ) ); ?>" class="product-specimen__media">
							<img src="<?php echo esc_url( $img_base . '/spice-wild-pepper.jpg' ); ?>" alt="<?php esc_attr_e( 'Arunachal Citrus-Husk Wild Hill Pepper', 'penbrae' ); ?>" class="product-specimen__img" loading="lazy">
						</a>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'Ziro Valley, Lower Subansiri', 'penbrae' ); ?></div>
							<h3 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/arunachal-wild-hill-pepper' ) ); ?>"><?php esc_html_e( 'Arunachal Citrus-Husk Wild Hill Pepper', 'penbrae' ); ?></a></h3>
							<p class="product-specimen__notes"><?php esc_html_e( 'Kaffir lime leaf, crushed pine needle, gentle tingling warmth.', 'penbrae' ); ?></p>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£21.00 <span class="product-specimen__weight">/ 45g</span></span>
							<a href="<?php echo esc_url( home_url( '/product/arunachal-wild-hill-pepper' ) ); ?>" class="product-specimen__add-btn" style="display:inline-flex;align-items:center;text-decoration:none;"><?php esc_html_e( 'Inspect →', 'penbrae' ); ?></a>
						</div>
					</article>
				</div>
			</div>

			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'STALL II · WARM, TEXTURED & AROMATIC', 'penbrae' ); ?></span>
				<h2 id="stall-heading-spices" style="font-size:clamp(2.4rem,3.5vw,3.6rem);margin:0.4rem 0;"><?php esc_html_e( 'The Spice Stall', 'penbrae' ); ?></h2>
				<p class="latin-taxonomy" style="font-size:1.25rem;margin-bottom:1.1rem;"><?php esc_html_e( 'Curcuma longa & Zanthoxylum · Meghalaya & Ziro Valley', 'penbrae' ); ?></p>
				<p style="color:var(--color-ink-secondary);">
					<?php esc_html_e( 'Expressive, resinous, and deeply aromatic. Limestone uplands in the West Jaintia Hills and subtropical valleys in Arunachal yield extraordinary essential oil concentration.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>" class="btn-editorial" style="margin-top:1rem;background:var(--color-terracotta);border-color:var(--color-terracotta);"><?php esc_html_e( 'Enter The Spice Stall →', 'penbrae' ); ?></a>
			</div>
		</div>
	</div>
</section>

<!-- ENVIRONMENT III: THE CHILLI STALL -->
<section id="stall-env-chillies" data-stall-section="chillies" class="editorial-section stall-theme-chillies" style="background:#EFE3DE;" aria-labelledby="stall-heading-chillies">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'STALL III · BOLD, ENERGETIC & INTENSE', 'penbrae' ); ?></span>
				<h2 id="stall-heading-chillies" style="font-size:clamp(2.4rem,3.5vw,3.6rem);margin:0.4rem 0;"><?php esc_html_e( 'The Chilli Stall', 'penbrae' ); ?></h2>
				<p class="latin-taxonomy" style="font-size:1.25rem;margin-bottom:1.1rem;"><?php esc_html_e( 'Capsicum chinense & Capsicum annuum · Nagaland & Manipur', 'penbrae' ); ?></p>
				<p style="color:var(--color-ink-secondary);">
					<?php esc_html_e( 'Intense yet remarkably complex. Revered across Nagaland and Manipur for fruit-forward aromatics, alder-smoke depth, and natural crimson staining.', 'penbrae' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>" class="btn-editorial" style="margin-top:1rem;background:var(--color-oxblood);border-color:var(--color-oxblood);"><?php esc_html_e( 'Enter The Chilli Stall →', 'penbrae' ); ?></a>
			</div>

			<div class="col-span-7">
				<div class="editorial-grid">
					<article class="col-span-6 product-specimen">
						<div class="product-specimen__header"><span>LOT 26-C</span><span>1,460m ASL · NAGALAND</span></div>
						<a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>" class="product-specimen__media">
							<img src="<?php echo esc_url( $img_base . '/stall-chilli-smoked.jpg' ); ?>" alt="<?php esc_attr_e( 'Whole Alder-Smoked Naga King Chilli Pods', 'penbrae' ); ?>" class="product-specimen__img" loading="lazy">
						</a>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'Mon District, Nagaland', 'penbrae' ); ?></div>
							<h3 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>"><?php esc_html_e( 'Whole Alder-Smoked Naga King Chilli Pods', 'penbrae' ); ?></a></h3>
							<p class="product-specimen__notes"><?php esc_html_e( 'Alder-hearth smoke, dried sour cherry, slow-building volcanic warmth.', 'penbrae' ); ?></p>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£22.00 <span class="product-specimen__weight">/ 40g</span></span>
							<a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>" class="product-specimen__add-btn" style="display:inline-flex;align-items:center;text-decoration:none;"><?php esc_html_e( 'Inspect →', 'penbrae' ); ?></a>
						</div>
					</article>

					<article class="col-span-6 product-specimen">
						<div class="product-specimen__header"><span>LOT 26-F</span><span>1,750m ASL · MANIPUR</span></div>
						<a href="<?php echo esc_url( home_url( '/product/sirarakhong-hathei-chilli' ) ); ?>" class="product-specimen__media">
							<img src="<?php echo esc_url( $img_base . '/chilli-hathei-crimson.jpg' ); ?>" alt="<?php esc_attr_e( 'Sirarakhong Sun-Cured Hathei Crimson Chilli', 'penbrae' ); ?>" class="product-specimen__img" loading="lazy">
						</a>
						<div class="product-specimen__body">
							<div class="product-specimen__region"><?php esc_html_e( 'Sirarakhong, Ukhrul District', 'penbrae' ); ?></div>
							<h3 class="product-specimen__title"><a href="<?php echo esc_url( home_url( '/product/sirarakhong-hathei-chilli' ) ); ?>"><?php esc_html_e( 'Sirarakhong Sun-Cured Hathei Crimson Chilli', 'penbrae' ); ?></a></h3>
							<p class="product-specimen__notes"><?php esc_html_e( 'Sun-dried red bell fruitiness, toasted carob, vibrant crimson oil.', 'penbrae' ); ?></p>
						</div>
						<div class="product-specimen__footer">
							<span class="product-specimen__price">£20.00 <span class="product-specimen__weight">/ 65g</span></span>
							<a href="<?php echo esc_url( home_url( '/product/sirarakhong-hathei-chilli' ) ); ?>" class="product-specimen__add-btn" style="display:inline-flex;align-items:center;text-decoration:none;"><?php esc_html_e( 'Inspect →', 'penbrae' ); ?></a>
						</div>
					</article>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
