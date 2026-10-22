<?php
/**
 * Template Name: Contact & Cardiff Enquiries
 * Template Post Type: page
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
		<div class="editorial-grid">
			<div class="col-span-5">
				<span class="kicker-index"><?php esc_html_e( 'CORRESPONDENCE · CARDIFF, WALES', 'penbrae' ); ?></span>
				<h1 style="margin:0.4rem 0 1rem 0;"><?php esc_html_e( 'Contact Penbrae & Co Ltd', 'penbrae' ); ?></h1>
				<p style="color:var(--color-ink-secondary);">
					<?php esc_html_e( 'For enquiries regarding seasonal lot availability, culinary & restaurant allocations, press requests, or provenance documentation, write to our Cardiff desk.', 'penbrae' ); ?>
				</p>
				<dl style="font-family:var(--font-mono);font-size:0.78rem;margin-top:2rem;border-top:var(--rule-hairline);padding-top:1rem;">
					<dt style="color:var(--color-ink-muted);"><?php esc_html_e( 'REGISTERED OFFICE', 'penbrae' ); ?></dt>
					<dd style="margin:0.25rem 0 1rem 0;"><?php esc_html_e( 'Penbrae & Co Ltd, Cardiff, Wales, United Kingdom', 'penbrae' ); ?></dd>
					<dt style="color:var(--color-ink-muted);"><?php esc_html_e( 'DISPATCH HOURS', 'penbrae' ); ?></dt>
					<dd style="margin:0.25rem 0 0 0;"><?php esc_html_e( 'Monday – Friday, 09:00 – 17:30 GMT', 'penbrae' ); ?></dd>
				</dl>
			</div>

			<div class="col-span-7">
				<form method="post" style="background:var(--color-parchment-light);border:var(--rule-strong);padding:var(--space-5);">
					<span class="kicker-index"><?php esc_html_e( 'DIRECT DISPATCH INQUIRY', 'penbrae' ); ?></span>
					<div class="editorial-form-field" style="margin-top:1rem;">
						<label for="contact-name"><?php esc_html_e( 'Your Name *', 'penbrae' ); ?></label>
						<input type="text" id="contact-name" name="contact_name" required>
					</div>
					<div class="editorial-form-field">
						<label for="contact-email"><?php esc_html_e( 'Email Address *', 'penbrae' ); ?></label>
						<input type="email" id="contact-email" name="contact_email" required>
					</div>
					<div class="editorial-form-field">
						<label for="contact-subject"><?php esc_html_e( 'Enquiry Subject', 'penbrae' ); ?></label>
						<select id="contact-subject" name="contact_subject">
							<option value="order"><?php esc_html_e( 'Seasonal Lot / Order Enquiry', 'penbrae' ); ?></option>
							<option value="trade"><?php esc_html_e( 'Restaurant, Tea Room & Sommelier Allocation', 'penbrae' ); ?></option>
							<option value="editorial"><?php esc_html_e( 'Editorial & Provenance Press Enquiry', 'penbrae' ); ?></option>
						</select>
					</div>
					<div class="editorial-form-field">
						<label for="contact-message"><?php esc_html_e( 'Message *', 'penbrae' ); ?></label>
						<textarea id="contact-message" name="contact_message" required></textarea>
					</div>
					<button type="submit" class="btn-editorial"><?php esc_html_e( 'Send Correspondence →', 'penbrae' ); ?></button>
				</form>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
