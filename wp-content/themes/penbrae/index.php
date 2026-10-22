<?php
/**
 * Main Fallback Template (index.php)
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
		<?php if ( have_posts() ) : ?>
			<div class="editorial-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article class="col-span-8 prose-measure">
						<span class="kicker-index"><?php esc_html_e( 'PENBRAE ARCHIVE', 'penbrae' ); ?></span>
						<h1><?php the_title(); ?></h1>
						<div><?php the_content(); ?></div>
					</article>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
