<?php
/**
 * Theme Editorial Colophon Footer
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
</main><!-- #main-content -->

<footer class="site-colophon" role="contentinfo">
	<div class="penbrae-container">
		<div class="site-colophon__grid">
			<div>
				<div class="kicker-index" style="color:var(--color-brass-light);margin-bottom:0.75rem;"><?php esc_html_e( 'COLOPHON · PENBRAE & CO LTD', 'penbrae' ); ?></div>
				<h2 style="font-size:2.1rem;line-height:1.12;margin-bottom:1rem;">
					<?php esc_html_e( 'Rare single-harvest teas, heirloom rhizomes, and smoked chillies from Northeast India, curated in Cardiff.', 'penbrae' ); ?>
				</h2>
				<p style="color:rgba(245,240,230,0.74);max-width:48ch;font-size:0.95rem;">
					<?php esc_html_e( 'Every seasonal lot is documented alongside the makers who cultivate it, the altitude and micro-climate of its origin, and the craft traditions that shape its character.', 'penbrae' ); ?>
				</p>
				<div style="margin-top:1.5rem;font-family:var(--font-mono);font-size:0.74rem;color:var(--color-brass-light);letter-spacing:0.08em;">
					<?php esc_html_e( 'REGISTERED IN WALES · PENBRAE & CO LTD · CARDIFF, UK', 'penbrae' ); ?>
				</div>
			</div>

			<div>
				<h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">
					<?php esc_html_e( 'The Three Stalls', 'penbrae' ); ?>
				</h3>
				<ul class="site-colophon__list">
					<li><a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>"><?php esc_html_e( 'All Stalls Overview', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>"><?php esc_html_e( 'The Tea Stall (Assam & Arunachal)', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>"><?php esc_html_e( 'The Spice Stall (Meghalaya & Ziro)', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>"><?php esc_html_e( 'The Chilli Stall (Nagaland & Manipur)', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/product/upper-assam-tippy-orthodox' ) ); ?>"><?php esc_html_e( 'Featured Lot: Tippy Orthodox Reserve', 'penbrae' ); ?></a></li>
				</ul>
			</div>

			<div>
				<h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">
					<?php esc_html_e( 'Editorial & Origins', 'penbrae' ); ?>
				</h3>
				<ul class="site-colophon__list">
					<li><a href="<?php echo esc_url( home_url( '/makers' ) ); ?>"><?php esc_html_e( 'Meet the Makers (Interactive Map)', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/maker/upper-assam-orthodox-collective' ) ); ?>"><?php esc_html_e( 'Maker Dossier: Upper Assam Collective', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' ) ); ?>"><?php esc_html_e( 'Product Story: Autumn Tippy Pluck', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/journal' ) ); ?>"><?php esc_html_e( 'The Penbrae Journal', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>"><?php esc_html_e( 'About Penbrae & Co', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/subscribe' ) ); ?>"><?php esc_html_e( 'Subscribe to Dispatch', 'penbrae' ); ?></a></li>
				</ul>
			</div>

			<div>
				<h3 style="font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.11em;text-transform:uppercase;color:var(--color-brass-light);margin-bottom:1.1rem;">
					<?php esc_html_e( 'Commerce & Governance', 'penbrae' ); ?>
				</h3>
				<ul class="site-colophon__list">
					<li><a href="<?php echo esc_url( home_url( '/basket' ) ); ?>"><?php esc_html_e( 'Shopping Basket', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/checkout' ) ); ?>"><?php esc_html_e( 'Checkout (Stripe Test Mode Ready)', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/my-account' ) ); ?>"><?php esc_html_e( 'Customer Account', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/shipping-returns' ) ); ?>"><?php esc_html_e( 'Shipping & Returns Information', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>"><?php esc_html_e( 'Privacy Policy & UK GDPR', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/terms-and-conditions' ) ); ?>"><?php esc_html_e( 'Terms & Conditions', 'penbrae' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>"><?php esc_html_e( 'Contact & Cardiff Enquiries', 'penbrae' ); ?></a></li>
				</ul>
			</div>
		</div>

		<div class="site-colophon__bottom">
			<span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php esc_html_e( 'Penbrae & Co Ltd. All rights reserved. Prices displayed in GBP (£).', 'penbrae' ); ?></span>
			<span><?php esc_html_e( 'CARDIFF, WALES · SMALL-LOT IMPORTERS OF NORTHEAST INDIAN TEAS, SPICES & CHILLIES', 'penbrae' ); ?></span>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
