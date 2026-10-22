<?php
/**
 * Unified Search Results Template (search.php)
 * Searches across WooCommerce Products, Makers, Provenance Stories, and Journal Articles.
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section">
	<div class="penbrae-container">
		<span class="kicker-index"><?php esc_html_e( 'UNIFIED ARCHIVE SEARCH', 'penbrae' ); ?></span>
		<h1 style="margin:0.4rem 0 2rem 0;">
			<?php
			/* translators: %s: search query. */
			printf( esc_html__( 'Search Results for “%s”', 'penbrae' ), get_search_query() );
			?>
		</h1>

		<?php if ( have_posts() ) : ?>
			<div class="editorial-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article class="col-span-6" style="background:var(--color-parchment-light);border:var(--rule-hairline);padding:var(--space-4);">
						<span class="kicker-index"><?php echo esc_html( strtoupper( get_post_type() ) ); ?></span>
						<h2 style="font-size:1.6rem;margin:0.4rem 0;"><a href="<?php the_permalink(); ?>" style="color:var(--color-charcoal);text-decoration:none;"><?php the_title(); ?></a></h2>
						<p style="font-size:0.9rem;color:var(--color-ink-secondary);"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
						<a href="<?php the_permalink(); ?>" class="link-editorial"><?php esc_html_e( 'Open Entry →', 'penbrae' ); ?></a>
					</article>
				<?php endwhile; ?>
			</div>
		<?php else : ?>
			<p><?php esc_html_e( 'No matching harvest lots, makers, or journal essays were found. Explore The Three Stalls below.', 'penbrae' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php
get_template_part( 'template-parts/non-linear-compass' );
get_footer();
