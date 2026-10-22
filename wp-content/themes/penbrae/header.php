<?php
/**
 * Theme Masthead & Accessible Navigation Header
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$basket_count = ( function_exists( 'WC' ) && WC()->cart ) ? WC()->cart->get_cart_contents_count() : 1;
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/svg+xml" href="<?php echo esc_url( PENBRAE_THEME_URI . '/assets/images/favicon.svg' ); ?>">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#main-content"><?php esc_html_e( 'Skip to main editorial content', 'penbrae' ); ?></a>

<!-- Top Archival Provenance Bar -->
<div class="editorial-dispatch-bar" role="region" aria-label="<?php esc_attr_e( 'Provenance & Dispatch Notice', 'penbrae' ); ?>">
	<span><?php esc_html_e( 'PENBRAE & CO LTD · CARDIFF, WALES — SMALL-LOT IMPORTERS OF NORTHEAST INDIAN TEAS, SPICES & CHILLIES', 'penbrae' ); ?></span>
	<span class="editorial-dispatch-bar__coords">51°28′N 03°10′W ↔ 26°12′N 92°56′E · CURRENCY: GBP (£)</span>
</div>

<!-- Minimal Editorial Masthead -->
<header class="site-masthead" role="banner">
	<div class="site-masthead__inner">
		<button type="button" class="mobile-menu-toggle" data-mobile-nav-toggle aria-expanded="false" aria-controls="penbrae-mobile-drawer">
			<?php esc_html_e( 'Index [≡]', 'penbrae' ); ?>
		</button>

		<nav aria-label="<?php esc_attr_e( 'Primary Editorial Navigation', 'penbrae' ); ?>">
			<ul class="site-nav-primary">
				<li><a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>"><?php esc_html_e( 'The Stalls', 'penbrae' ); ?></a></li>
				<li><a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>"><?php esc_html_e( 'Teas', 'penbrae' ); ?></a></li>
				<li><a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>"><?php esc_html_e( 'Spices', 'penbrae' ); ?></a></li>
				<li><a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>"><?php esc_html_e( 'Chillies', 'penbrae' ); ?></a></li>
				<li><a href="<?php echo esc_url( home_url( '/makers' ) ); ?>"><?php esc_html_e( 'Meet the Makers', 'penbrae' ); ?></a></li>
			</ul>
		</nav>

		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-brand" aria-label="<?php esc_attr_e( 'Penbrae & Co Ltd — Home', 'penbrae' ); ?>">
			<span class="site-brand__wordmark">Penbrae &amp; Co</span>
			<span class="site-brand__sub"><?php esc_html_e( 'Cardiff · Northeast India', 'penbrae' ); ?></span>
		</a>

		<div class="site-nav-utility">
			<a href="<?php echo esc_url( home_url( '/journal' ) ); ?>" class="hide-mobile"><?php esc_html_e( 'Journal', 'penbrae' ); ?></a>
			<a href="<?php echo esc_url( home_url( '/about' ) ); ?>" class="hide-mobile"><?php esc_html_e( 'Provenance', 'penbrae' ); ?></a>
			<a href="<?php echo esc_url( home_url( '/subscribe' ) ); ?>" class="hide-mobile"><?php esc_html_e( 'Dispatch', 'penbrae' ); ?></a>
			<a href="<?php echo esc_url( home_url( '/my-account' ) ); ?>" class="hide-mobile"><?php esc_html_e( 'Account', 'penbrae' ); ?></a>
			<button type="button" data-basket-open aria-label="<?php esc_attr_e( 'Open shopping basket drawer', 'penbrae' ); ?>">
				<span><?php esc_html_e( 'Basket', 'penbrae' ); ?></span>
				<span class="basket-count-pill" data-basket-count><?php echo esc_html( $basket_count ); ?></span>
			</button>
		</div>
	</div>

	<!-- Touch-Optimised Mobile Navigation Drawer -->
	<nav id="penbrae-mobile-drawer" class="mobile-nav-drawer" aria-label="<?php esc_attr_e( 'Mobile Navigation Index', 'penbrae' ); ?>" aria-hidden="true">
		<div class="kicker-index" style="margin-bottom:0.75rem;"><?php esc_html_e( 'Navigation Index — Products, Makers & Stories', 'penbrae' ); ?></div>
		<ul class="mobile-nav-drawer__list">
			<li><a href="<?php echo esc_url( home_url( '/stalls' ) ); ?>"><span><?php esc_html_e( 'The Three Stalls Overview', 'penbrae' ); ?></span><span class="kicker-index">01</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/stall/teas' ) ); ?>"><span><?php esc_html_e( 'The Tea Stall', 'penbrae' ); ?></span><span class="kicker-index">Assam &amp; Arunachal</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/stall/spices' ) ); ?>"><span><?php esc_html_e( 'The Spice Stall', 'penbrae' ); ?></span><span class="kicker-index">Meghalaya &amp; Ziro</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/stall/chillies' ) ); ?>"><span><?php esc_html_e( 'The Chilli Stall', 'penbrae' ); ?></span><span class="kicker-index">Nagaland &amp; Manipur</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/makers' ) ); ?>"><span><?php esc_html_e( 'Meet the Makers (Interactive Atlas)', 'penbrae' ); ?></span><span class="kicker-index">Map</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/story/mist-over-the-brahmaputra-autumn-pluck' ) ); ?>"><span><?php esc_html_e( 'Product Provenance Stories', 'penbrae' ); ?></span><span class="kicker-index">Archive</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/journal' ) ); ?>"><span><?php esc_html_e( 'The Penbrae Journal', 'penbrae' ); ?></span><span class="kicker-index">Issue 01</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>"><span><?php esc_html_e( 'About Penbrae & Co', 'penbrae' ); ?></span><span class="kicker-index">Cardiff</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/subscribe' ) ); ?>"><span><?php esc_html_e( 'Subscribe to the Dispatch', 'penbrae' ); ?></span><span class="kicker-index">Letters</span></a></li>
			<li><a href="<?php echo esc_url( home_url( '/basket' ) ); ?>"><span><?php esc_html_e( 'Basket & Checkout', 'penbrae' ); ?></span><span class="kicker-index">GBP £</span></a></li>
		</ul>
	</nav>
</header>

<!-- Slide-Over Mini Basket Drawer -->
<div id="penbrae-basket-backdrop" class="basket-drawer-backdrop"></div>
<aside id="penbrae-basket-drawer" class="basket-drawer" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Shopping Basket Ledger', 'penbrae' ); ?>" aria-hidden="true">
	<div class="basket-drawer__header">
		<div>
			<div class="kicker-index"><?php esc_html_e( 'CARDIFF DISPATCH LEDGER', 'penbrae' ); ?></div>
			<h2 style="font-size:1.55rem;margin:0.2rem 0 0 0;"><?php esc_html_e( 'Your Basket', 'penbrae' ); ?></h2>
		</div>
		<button type="button" data-basket-close class="filter-pill" aria-label="<?php esc_attr_e( 'Close basket drawer', 'penbrae' ); ?>"><?php esc_html_e( 'Close [×]', 'penbrae' ); ?></button>
	</div>
	<div id="penbrae-basket-drawer-items" class="basket-drawer__items"></div>
	<div class="basket-drawer__footer">
		<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.5rem;">
			<span style="font-family:var(--font-mono);font-size:0.76rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-muted);"><?php esc_html_e( 'Estimated Subtotal (GBP)', 'penbrae' ); ?></span>
			<span id="penbrae-basket-drawer-subtotal" class="tabular-nums" style="font-family:var(--font-editorial);font-size:1.75rem;">£28.00</span>
		</div>
		<p style="font-size:0.8rem;color:var(--color-ink-muted);margin-bottom:1rem;">
			<?php esc_html_e( 'UK shipping & applicable taxes are calculated at checkout via configured WooCommerce shipping zones.', 'penbrae' ); ?>
		</p>
		<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
			<a href="<?php echo esc_url( home_url( '/basket' ) ); ?>" class="btn-editorial btn-editorial--outline" style="justify-content:center;"><?php esc_html_e( 'View Basket', 'penbrae' ); ?></a>
			<a href="<?php echo esc_url( home_url( '/checkout' ) ); ?>" class="btn-editorial" style="justify-content:center;"><?php esc_html_e( 'Checkout →', 'penbrae' ); ?></a>
		</div>
	</div>
</aside>

<main id="main-content" role="main">
