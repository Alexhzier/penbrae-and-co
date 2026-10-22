<?php
/**
 * PAGE 10 — JOURNAL ARTICLE (single.php)
 * Long-form editorial reading experience with:
 * - Expressive editorial typography & drop caps
 * - Captions, pull quotes, embedded video & accessible audio with transcript
 * - Connected ingredients (WooCommerce products) & related stories/articles
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$post_id          = get_the_ID();
	$featured_prod_id = get_post_meta( $post_id, '_penbrae_featured_product_id', true );
	$maker_id         = get_post_meta( $post_id, '_penbrae_maker_id', true );
	$pullquote        = get_post_meta( $post_id, '_penbrae_pullquote', true ) ?: 'In the monsoon belt of Northeast India, preservation is not an afterthought—it is where raw harvest becomes culinary architecture.';
	?>

	<article>
		<header class="editorial-section" style="background:var(--color-parchment-deep);">
			<div class="penbrae-container">
				<div class="editorial-grid">
					<div class="col-span-8">
						<span class="kicker-index"><?php esc_html_e( 'THE PENBRAE JOURNAL · LONG-FORM ESSAY · PAGE 10', 'penbrae' ); ?></span>
						<h1 style="margin:0.4rem 0 1rem 0;"><?php the_title(); ?></h1>
						<p class="lead-standfirst">
							<?php echo esc_html( has_excerpt() ? get_the_excerpt() : 'From bamboo smoke-lofts in Mon District to sun-warmed slate courtyards in Meghalaya, how traditional preservation shapes the flavour of Northeast India.' ); ?>
						</p>
					</div>
					<div class="col-span-4" style="border-left:var(--rule-hairline);padding-left:var(--space-4);font-family:var(--font-mono);font-size:0.75rem;">
						<div style="color:var(--color-ink-muted);"><?php esc_html_e( 'PUBLISHED BY', 'penbrae' ); ?></div>
						<strong style="display:block;margin-bottom:1rem;"><?php esc_html_e( 'Penbrae Editorial Desk, Cardiff', 'penbrae' ); ?></strong>
						<div style="color:var(--color-ink-muted);"><?php esc_html_e( 'READING TIME', 'penbrae' ); ?></div>
						<strong style="display:block;margin-bottom:1rem;"><?php esc_html_e( '8 Minutes', 'penbrae' ); ?></strong>
						<a href="<?php echo esc_url( home_url( '/journal' ) ); ?>" class="link-editorial"><?php esc_html_e( '← All Journal Essays', 'penbrae' ); ?></a>
					</div>
				</div>
			</div>
		</header>

		<section class="editorial-section">
			<div class="penbrae-container">
				<div class="editorial-grid">
					<!-- Marginalia Sidebar: Connected Ingredients & Makers -->
					<aside class="col-editorial-marginalia">
						<div style="padding:var(--space-4);background:var(--color-parchment-light);border:var(--rule-strong);">
							<span class="kicker-index"><?php esc_html_e( 'INGREDIENTS IN THIS ESSAY', 'penbrae' ); ?></span>
							<div style="margin-top:1rem;padding-top:1rem;border-top:var(--rule-hairline);">
								<h3 style="font-size:1.25rem;margin-bottom:0.25rem;">
									<a href="<?php echo esc_url( $featured_prod_id ? get_permalink( $featured_prod_id ) : home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
										<?php esc_html_e( 'Alder-Smoked Naga King Chilli Pods', 'penbrae' ); ?>
									</a>
								</h3>
								<p style="font-size:0.84rem;color:var(--color-ink-secondary);margin-bottom:0.75rem;">
									<?php esc_html_e( 'Mon District, Nagaland · £22.00 / 40g Jar', 'penbrae' ); ?>
								</p>
								<a href="<?php echo esc_url( home_url( '/product/alder-smoked-naga-king-chilli' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Inspect Ingredient →', 'penbrae' ); ?></a>
							</div>
							<div style="margin-top:1rem;padding-top:1rem;border-top:var(--rule-hairline);">
								<h3 style="font-size:1.25rem;margin-bottom:0.25rem;">
									<a href="<?php echo esc_url( home_url( '/product/lakadong-turmeric-reserve' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;">
										<?php esc_html_e( 'Single-Harvest Lakadong Rhizome Reserve', 'penbrae' ); ?>
									</a>
								</h3>
								<p style="font-size:0.84rem;color:var(--color-ink-secondary);margin-bottom:0.75rem;">
									<?php esc_html_e( 'West Jaintia Hills, Meghalaya · £18.50 / 80g', 'penbrae' ); ?>
								</p>
								<a href="<?php echo esc_url( home_url( '/product/lakadong-turmeric-reserve' ) ); ?>" class="link-editorial"><?php esc_html_e( 'Inspect Ingredient →', 'penbrae' ); ?></a>
							</div>
						</div>
					</aside>

					<!-- Main Reading Column -->
					<div class="col-editorial-essay prose-measure">
						<div class="editorial-dropcap">
							<?php the_content(); ?>
						</div>

						<div class="editorial-pullquote">
							<blockquote>“<?php echo esc_html( $pullquote ); ?>”</blockquote>
							<cite><?php esc_html_e( 'ISSUE 01 · PENBRAE EDITORIAL ARCHIVE', 'penbrae' ); ?></cite>
						</div>

						<?php get_template_part( 'template-parts/audio-documentary' ); ?>
					</div>
				</div>
			</div>
		</section>
	</article>

	<?php
	get_template_part( 'template-parts/non-linear-compass' );
endwhile;

get_footer();
