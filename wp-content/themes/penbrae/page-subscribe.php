<?php
/**
 * Template Name: Page 11 — Subscribe & Future Tea/Spice Club
 * Template Post Type: page
 *
 * Includes:
 * - Newsletter registration
 * - Clear description of what subscribers receive
 * - Explicit UK GDPR marketing consent
 * - Future-ready section for an optional Tea or Spice Club (without premature recurring billing checkout)
 *
 * @package Penbrae
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="editorial-section" style="background:var(--color-parchment-deep);">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'READER REGISTRATION · PAGE 11', 'penbrae' ); ?></span>
				<h1 style="margin-top:0.4rem;"><?php esc_html_e( 'Subscribe to the Penbrae Dispatch', 'penbrae' ); ?></h1>
			</div>
			<div class="col-span-7">
				<p class="lead-standfirst">
					<?php esc_html_e( 'Receive occasional harvest letters, documentary field notes from Northeast India, and 48-hour advance notice when limited seasonal lots arrive in Cardiff.', 'penbrae' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Newsletter Registration + What Subscribers Receive -->
<section class="editorial-section">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'WHAT SUBSCRIBERS RECEIVE', 'penbrae' ); ?></span>
				<h2 style="font-size:2rem;margin:0.5rem 0 1rem 0;"><?php esc_html_e( 'Written like a correspondence, never a promotional circular.', 'penbrae' ); ?></h2>
				<ul style="list-style:none;padding:0;margin:0;border-top:var(--rule-hairline);">
					<li style="padding:1rem 0;border-bottom:var(--rule-hairline);">
						<strong style="display:block;font-family:var(--font-editorial);font-size:1.3rem;"><?php esc_html_e( 'I. Seasonal Arrival Notices', 'penbrae' ); ?></strong>
						<span style="font-size:0.9rem;color:var(--color-ink-secondary);"><?php esc_html_e( 'Direct notification when Second Flush, Autumnal Tippy, or Winter Rhizome lots clear inspection in Cardiff.', 'penbrae' ); ?></span>
					</li>
					<li style="padding:1rem 0;border-bottom:var(--rule-hairline);">
						<strong style="display:block;font-family:var(--font-editorial);font-size:1.3rem;"><?php esc_html_e( 'II. Field Monographs & Audio Dispatches', 'penbrae' ); ?></strong>
						<span style="font-size:0.9rem;color:var(--color-ink-secondary);"><?php esc_html_e( 'New maker interviews, regional essays, and transcribed field recordings from Assam, Meghalaya, Nagaland, Arunachal, and Manipur.', 'penbrae' ); ?></span>
					</li>
					<li style="padding:1rem 0;border-bottom:var(--rule-hairline);">
						<strong style="display:block;font-family:var(--font-editorial);font-size:1.3rem;"><?php esc_html_e( 'III. Preparation & Culinary Notes', 'penbrae' ); ?></strong>
						<span style="font-size:0.9rem;color:var(--color-ink-secondary);"><?php esc_html_e( 'Infusion parameters, spice tempering ratios, and tasting notes from our Cardiff table.', 'penbrae' ); ?></span>
					</li>
				</ul>
			</div>

			<div class="col-span-7">
				<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" data-penbrae-newsletter-form data-ajax-preview="true" style="background:var(--color-parchment-light);padding:var(--space-6);border:var(--rule-strong);">
					<input type="hidden" name="action" value="penbrae_newsletter_subscribe">
					<?php wp_nonce_field( 'penbrae_subscribe_action', 'penbrae_newsletter_nonce' ); ?>

					<span class="kicker-index"><?php esc_html_e( 'DISPATCH LEDGER REGISTRATION', 'penbrae' ); ?></span>
					<h2 style="font-size:1.95rem;margin:0.4rem 0 1.5rem 0;"><?php esc_html_e( 'Join the Reading List', 'penbrae' ); ?></h2>

					<div class="editorial-form-field">
						<label for="sub-full-name"><?php esc_html_e( 'Your Name (Optional)', 'penbrae' ); ?></label>
						<input type="text" id="sub-full-name" name="subscriber_name" placeholder="Eleanor Vance">
					</div>

					<div class="editorial-form-field">
						<label for="sub-email"><?php esc_html_e( 'Electronic Mail Address (Required)', 'penbrae' ); ?></label>
						<input type="email" id="sub-email" name="subscriber_email" required placeholder="reader@domain.co.uk">
					</div>

					<fieldset style="border:var(--rule-hairline);padding:1rem;margin-bottom:var(--space-4);">
						<legend style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;padding:0 0.5rem;color:var(--color-ink-muted);">
							<?php esc_html_e( 'Stall Preferences (Optional)', 'penbrae' ); ?>
						</legend>
						<div style="display:flex;flex-wrap:wrap;gap:1.25rem;font-size:0.92rem;">
							<label><input type="checkbox" name="stall_interests[]" value="teas" checked> <?php esc_html_e( 'The Tea Stall', 'penbrae' ); ?></label>
							<label><input type="checkbox" name="stall_interests[]" value="spices" checked> <?php esc_html_e( 'The Spice Stall', 'penbrae' ); ?></label>
							<label><input type="checkbox" name="stall_interests[]" value="chillies" checked> <?php esc_html_e( 'The Chilli Stall', 'penbrae' ); ?></label>
							<label><input type="checkbox" name="stall_interests[]" value="club_waitlist"> <?php esc_html_e( 'Future Tea & Spice Club Interest', 'penbrae' ); ?></label>
						</div>
					</fieldset>

					<div class="consent-checkbox-box">
						<input type="checkbox" id="sub-gdpr-consent" name="gdpr_consent" value="1" required>
						<label for="sub-gdpr-consent">
							<?php esc_html_e( 'Explicit Marketing Consent (UK GDPR): I consent to Penbrae & Co Ltd storing my email address to send editorial dispatches and seasonal harvest announcements. I understand that my data is never sold and I may withdraw consent at any time via the unsubscribe link in every email.', 'penbrae' ); ?>
						</label>
					</div>

					<button type="submit" class="btn-editorial" style="width:100%;justify-content:center;">
						<?php esc_html_e( 'Confirm Dispatch Subscription →', 'penbrae' ); ?>
					</button>
					<p data-newsletter-status aria-live="polite" style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.78rem;"></p>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- Future-Ready Section for Optional Tea or Spice Club (No Premature Recurring Checkout) -->
<section class="editorial-section editorial-section--forest" aria-labelledby="club-preview-heading">
	<div class="penbrae-container">
		<div class="editorial-grid">
			<div class="col-span-6">
				<span class="kicker-index"><?php esc_html_e( 'FUTURE-READY ARCHITECTURE · FORTHCOMING ARCHIVE', 'penbrae' ); ?></span>
				<h2 id="club-preview-heading" style="margin-top:0.4rem;"><?php esc_html_e( 'The Penbrae Seasonal Tasting Society (Tea & Spice Club)', 'penbrae' ); ?></h2>
				<p class="lead-standfirst">
					<?php esc_html_e( 'We are preparing a quarterly curation of micro-lot teas, single-harvest rhizomes, and smoked chillies accompanied by printed monograph notes.', 'penbrae' ); ?>
				</p>
			</div>
			<div class="col-span-6">
				<div style="padding:var(--space-5);border:var(--rule-light-on-dark);background:rgba(0,0,0,0.2);">
					<span style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.09em;color:var(--color-brass-light);display:block;margin-bottom:0.5rem;">
						<?php esc_html_e( 'COMMERCE GOVERNANCE NOTICE', 'penbrae' ); ?>
					</span>
					<p style="font-size:0.94rem;color:rgba(245,240,230,0.86);margin-bottom:1rem;">
						<?php esc_html_e( 'Recurring subscription billing and automated checkout are intentionally disabled until final club allocations, quarterly billing terms, and UK fulfilment schedules are ratified by Penbrae & Co Ltd. Select "Future Tea & Spice Club Interest" in the dispatch form above to receive the inaugural prospectus.', 'penbrae' ); ?>
					</p>
					<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--color-brass-light);">
						<?php esc_html_e( 'STATUS: PROSPECTUS REGISTRATION ONLY · NO RECURRING CHARGE COLLECTED', 'penbrae' ); ?>
					</span>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
