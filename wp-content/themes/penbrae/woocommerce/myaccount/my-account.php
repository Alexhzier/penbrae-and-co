<?php
/**
 * Bespoke WooCommerce My Account Template (woocommerce/myaccount/my-account.php)
 *
 * @package Penbrae
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section">
	<div class="penbrae-container">
		<div style="margin-bottom:var(--space-5);padding-bottom:var(--space-4);border-bottom:var(--rule-strong);">
			<span class="kicker-index"><?php esc_html_e( 'PATRON ARCHIVE & DISPATCH HISTORY', 'penbrae' ); ?></span>
			<h1 style="margin:0.35rem 0 0 0;"><?php esc_html_e( 'My Penbrae Account', 'penbrae' ); ?></h1>
		</div>

		<div class="editorial-grid">
			<nav class="col-span-4" aria-label="<?php esc_attr_e( 'Account Navigation', 'penbrae' ); ?>">
				<div style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-4);">
					<span class="kicker-index"><?php esc_html_e( 'ACCOUNT SECTIONS', 'penbrae' ); ?></span>
					<ul style="list-style:none;padding:0;margin:1rem 0 0 0;border-top:var(--rule-hairline);font-family:var(--font-mono);font-size:0.78rem;">
						<li style="padding:0.75rem 0;border-bottom:var(--rule-hairline);"><a href="#orders" style="color:var(--color-charcoal);text-decoration:none;"><?php esc_html_e( '01 · Seasonal Order Ledger', 'penbrae' ); ?></a></li>
						<li style="padding:0.75rem 0;border-bottom:var(--rule-hairline);"><a href="#addresses" style="color:var(--color-charcoal);text-decoration:none;"><?php esc_html_e( '02 · Delivery Addresses', 'penbrae' ); ?></a></li>
						<li style="padding:0.75rem 0;border-bottom:var(--rule-hairline);"><a href="<?php echo esc_url( home_url( '/subscribe' ) ); ?>" style="color:var(--color-charcoal);text-decoration:none;"><?php esc_html_e( '03 · Dispatch Preferences', 'penbrae' ); ?></a></li>
					</ul>
				</div>
			</nav>

			<div class="col-span-8" style="background:var(--color-parchment-light);border:var(--rule-hairline);padding:var(--space-5);">
				<?php
				if ( function_exists( 'woocommerce_account_content' ) ) {
					woocommerce_account_content();
				} else {
					?>
					<h2 style="font-size:1.85rem;margin-bottom:1rem;"><?php esc_html_e( 'Patron Sign-In & Order History', 'penbrae' ); ?></h2>
					<p style="color:var(--color-ink-secondary);">
						<?php esc_html_e( 'Sign in to inspect past seasonal allocations, manage UK delivery addresses, or update your Penbrae Dispatch preferences.', 'penbrae' ); ?>
					</p>
					<form method="post" style="max-width:460px;margin-top:1.5rem;">
						<div class="editorial-form-field">
							<label for="account-email"><?php esc_html_e( 'Email Address', 'penbrae' ); ?></label>
							<input type="email" id="account-email" name="username" required>
						</div>
						<div class="editorial-form-field">
							<label for="account-password"><?php esc_html_e( 'Password', 'penbrae' ); ?></label>
							<input type="password" id="account-password" name="password" required>
						</div>
						<button type="submit" class="btn-editorial"><?php esc_html_e( 'Sign In to Patron Ledger →', 'penbrae' ); ?></button>
					</form>
					<?php
				}
				?>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
