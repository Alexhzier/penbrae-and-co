<?php
/**
 * PAGE 7 — PRODUCT STORY (single-penbrae_story.php)
 * Dedicated long-form provenance monograph for an individual product lot.
 * Includes an obvious yet unobtrusive sticky route back to purchasing the product.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$post_id            = get_the_ID();
	$featured_prod_id   = get_post_meta( $post_id, '_penbrae_featured_product_id', true );
	$maker_id           = get_post_meta( $post_id, '_penbrae_maker_id', true );
	$pullquote          = get_post_meta( $post_id, '_penbrae_pullquote', true ) ?: 'When the November fog settles over the Brahmaputra, leaf growth slows to a whisper—concentrating malted honey and muscatel sap inside every downy bud.';
	$product_url        = $featured_prod_id ? get_permalink( $featured_prod_id ) : home_url( '/product/upper-assam-tippy-orthodox' );
	$product_title      = $featured_prod_id ? get_the_title( $featured_prod_id ) : 'Upper Assam Tippy Orthodox Reserve (Lot 26-A)';
	$maker_url          = $maker_id ? get_permalink( $maker_id ) : home_url( '/maker/upper-assam-orthodox-collective' );
	$maker_title        = $maker_id ? get_the_title( $maker_id ) : 'Brahmaputra Smallholder Tea Collective [Sample]';
	?>

	<!-- Obvious Yet Unobtrusive Sticky Route Back to Product Acquisition -->
	<div class="story-acquisition-ribbon" role="region" aria-label="<?php esc_attr_e( 'Connected Product Acquisition Bar', 'penbrae' ); ?>">
		<div>
			<span style="color:var(--color-terracotta);margin-right:0.5rem;"><?php esc_html_e( 'INGREDIENT MONOGRAPH FOR:', 'penbrae' ); ?></span>
			<a href="<?php echo esc_url( $product_url ); ?>" style="color:var(--color-charcoal);font-weight:600;text-decoration:underline;"><?php echo esc_html( $product_title ); ?></a>
			<span style="color:var(--color-ink-muted);margin-left:0.5rem;">· £28.00 (75g Caddy)</span>
		</div>
		<div style="display:flex;align-items:center;gap:0.85rem;">
			<a href="<?php echo esc_url( $product_url ); ?>" class="link-editorial"><?php esc_html_e( 'Return to Product Dossier →', 'penbrae' ); ?></a>
			<button type="button" class="btn-editorial" style="min-height:38px;padding:0.4rem 1rem;"
				data-add-to-basket
				data-product-id="upper-assam-tippy-orthodox"
				data-product-title="<?php echo esc_attr( $product_title ); ?>"
				data-product-price="28.00"
				data-product-url="<?php echo esc_url( $product_url ); ?>"
				data-product-region="Upper Assam">
				<?php esc_html_e( 'Acquire Lot (£28.00) +', 'penbrae' ); ?>
			</button>
		</div>
	</div>

	<!-- Story Monograph Cover -->
	<article>
		<header class="editorial-section" style="background:var(--color-parchment-deep);">
			<div class="penbrae-container">
				<div class="editorial-grid">
					<div class="col-span-8">
						<span class="kicker-index"><?php esc_html_e( 'PRODUCT PROVENANCE MONOGRAPH · PAGE 07', 'penbrae' ); ?></span>
						<h1 style="margin:0.4rem 0 1rem 0;"><?php the_title(); ?></h1>
						<p class="lead-standfirst">
							<?php echo esc_html( has_excerpt() ? get_the_excerpt() : 'How cool November nights slow leaf growth in Upper Assam, concentrating malted honey and muscatel aromatics in the golden terminal bud.' ); ?>
						</p>
					</div>
					<div class="col-span-4" style="border-left:var(--rule-hairline);padding-left:var(--space-4);">
						<div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);margin-bottom:0.35rem;"><?php esc_html_e( 'ORIGIN & TERROIR', 'penbrae' ); ?></div>
						<p style="font-size:0.9rem;margin-bottom:1rem;">Dibrugarh District, Upper Assam · 27°28′N 94°54′E · 140m ASL</p>
						<div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);margin-bottom:0.35rem;"><?php esc_html_e( 'PRODUCER', 'penbrae' ); ?></div>
						<p style="font-size:0.9rem;margin-bottom:1rem;"><a href="<?php echo esc_url( $maker_url ); ?>" style="color:var(--color-charcoal);"><?php echo esc_html( $maker_title ); ?></a></p>
						<div style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--color-ink-muted);margin-bottom:0.35rem;"><?php esc_html_e( 'HARVEST WINDOW', 'penbrae' ); ?></div>
						<p style="font-size:0.9rem;margin:0;"><?php esc_html_e( 'Late November (Autumnal Tippy Pluck)', 'penbrae' ); ?></p>
					</div>
				</div>
			</div>
		</header>

		<!-- Long-Form Documentary Body -->
		<section class="editorial-section">
			<div class="penbrae-container">
				<div class="editorial-grid">
					<aside class="col-editorial-marginalia">
						<div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-hairline);">
							<span class="kicker-index"><?php esc_html_e( 'HARVEST CHRONOLOGY', 'penbrae' ); ?></span>
							<ol style="font-size:0.88rem;padding-left:1.1rem;margin:1rem 0 0 0;color:var(--color-ink-secondary);display:flex;flex-direction:column;gap:0.75rem;">
								<li><strong>05:30 IST — Morning Fog:</strong> River mist from the Brahmaputra blankets smallholder plots.</li>
								<li><strong>07:15 IST — Two Leaves &amp; a Bud:</strong> Selective hand-plucking of unbroken terminal buds.</li>
								<li><strong>14:00 IST — Bamboo Withering:</strong> 16-hour ambient trough withering on woven bamboo mats.</li>
								<li><strong>Day 2 — Hand-Rolling &amp; Oxidation:</strong> Gentle rolling preserves the golden pubescent tip.</li>
							</ol>
						</div>
					</aside>

					<div class="col-editorial-essay prose-measure">
						<div class="editorial-dropcap">
							<?php the_content(); ?>
						</div>

						<div class="editorial-pullquote">
							<blockquote>“<?php echo esc_html( $pullquote ); ?>”</blockquote>
							<cite><?php esc_html_e( 'PENBRAE FIELD ARCHIVE · AUTUMN DISPATCH', 'penbrae' ); ?></cite>
						</div>

						<?php get_template_part( 'template-parts/audio-documentary' ); ?>

						<!-- Direct Connection Back to Product Page -->
						<div style="margin-top:var(--space-6);padding:var(--space-5);background:var(--color-parchment-deep);border:var(--rule-strong);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;">
							<div>
								<span class="kicker-index"><?php esc_html_e( 'TASTE THIS HARVEST', 'penbrae' ); ?></span>
								<h2 style="font-size:1.85rem;margin:0.35rem 0;"><?php echo esc_html( $product_title ); ?></h2>
								<p style="font-size:0.9rem;color:var(--color-ink-secondary);margin:0;">
									<?php esc_html_e( '75g Archival Caddy · £28.00 · Dispatched from Cardiff, Wales.', 'penbrae' ); ?>
								</p>
							</div>
							<div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
								<a href="<?php echo esc_url( $product_url ); ?>" class="btn-editorial"><?php esc_html_e( 'View Product Dossier & Buy →', 'penbrae' ); ?></a>
								<a href="<?php echo esc_url( $maker_url ); ?>" class="btn-editorial btn-editorial--outline"><?php esc_html_e( 'Meet the Maker →', 'penbrae' ); ?></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</article>

	<?php
	get_template_part( 'template-parts/non-linear-compass' );
endwhile;

get_footer();
