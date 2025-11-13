import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const ZAPIER_WEBHOOK_URL = import.meta.env.ZAPIER_WEBHOOK_URL || '';

const US_PHONE_REGEX = /^(\+1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

const normalizePhoneNumber = (phone: string): string => {
	const cleaned = phone.replace(/\D/g, '');
	if (cleaned.length === 11 && cleaned.startsWith('1')) {
		return cleaned.substring(1);
	}
	return cleaned;
};

const phoneValidation = z
	.string()
	.min(1, 'Phone number is required')
	.refine(
		(phone) => {
			const cleaned = normalizePhoneNumber(phone);
			return cleaned.length === 10 && US_PHONE_REGEX.test(phone);
		},
		{
			message: 'Please enter a valid US phone number (e.g., (786) 404-3885 or 786-404-3885)',
		}
	);

const nameValidation = z
	.string()
	.min(2, 'Name must be at least 2 characters')
	.max(50, 'Name must be less than 50 characters')
	.regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
	.transform((name) => name.trim());

export const server = {
	contact: defineAction({
		accept: 'form',
		input: z.object({
			email: z
				.string()
				.min(1, 'Email address is required')
				.email('Please enter a valid email address')
				.max(100, 'Email address is too long'),
			name: nameValidation,
			surname: nameValidation,
			phone: phoneValidation,
			message: z
				.string()
				.min(10, 'Message must be at least 10 characters')
				.max(1000, 'Message must be less than 1000 characters')
				.transform((msg) => msg.trim()),
			phone_verify: z.string().optional(),
		}),
		handler: async ({ email, name, surname, phone, message, phone_verify }) => {
			let contactId = `contact_${Date.now()}`;

			try {
				// 🛡️ PROTECCIÓN ANTI-BOT
				if (phone_verify && phone_verify.trim() !== '') {
					console.log('🤖 Bot detected - honeypot');

					return {
						success: true,
						message: 'Thank you! Your message has been sent.',
						contactId: contactId,
						timestamp: new Date().toISOString(),
					};
				}
				const normalizedPhone = normalizePhoneNumber(phone);
				const fullName = `${name} ${surname}`.trim();

				const contactData = {
					fullName,
					firstName: name,
					lastName: surname,
					email: email.toLowerCase(),
					phone: normalizedPhone,
					message: message.trim(),
					submittedDate: new Date().toLocaleDateString('en-US'),
					submittedTime: new Date().toLocaleTimeString('en-US'),
					submittedAt: new Date().toISOString(),
					source: 'website-contact-form',
					contactId: contactId,
				};

				console.log('📧 Processing contact form:', contactData);

				if (ZAPIER_WEBHOOK_URL) {
					try {
						const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(contactData),
						});

						if (zapierResponse.ok) {
							console.log('✅ Data sent to Zapier successfully');
						} else {
							console.error('⚠️ Zapier responded with error:', zapierResponse.status);
						}
					} catch (zapierError) {
						console.error('❌ Error sending to Zapier:', zapierError);
					}
				} else {
					console.warn('⚠️ ZAPIER_WEBHOOK_URL not configured');
				}

				const adminEmail = await resend.emails.send({
					from: 'Battle Electric <onboarding@resend.dev>',
					to: ['battleelectric050@gmail.com'],
					subject: `🔔 New Contact: ${fullName} - ${new Date().toLocaleDateString()}`,
					html: generateAdminEmailTemplate(contactData),
					replyTo: email,
				});

				if (adminEmail.error) {
					console.error('❌ Admin email failed:', adminEmail.error);
					throw new Error('Failed to send notification email');
				}

				console.log('✅ Admin email sent:', adminEmail.data?.id);

				const userEmail = await resend.emails.send({
					from: 'Battle Electric <onboarding@resend.dev>',
					to: [email],
					subject: 'Thank you for contacting Battle Electric!',
					html: generateUserConfirmationTemplate(contactData),
				});

				if (userEmail.error) {
					console.error('❌ User email failed:', userEmail.error);
				} else {
					console.log('✅ User confirmation sent:', userEmail.data?.id);
				}

				return {
					success: true,
					message: `Thank you ${name}! Your message has been sent successfully. We'll get back to you within 24 hours.`,
					contactId: contactId,
					timestamp: new Date().toISOString(),
				};
			} catch (error) {
				console.error('❌ Contact form error:', {
					error: error instanceof Error ? error.message : error,
					formData: { email, name, surname },
					timestamp: new Date().toISOString(),
				});

				throw new Error(
					'We encountered an issue processing your message. Please try again or contact us directly at battleelectric050@gmail.com'
				);
			}
		},
	}),
};

function generateAdminEmailTemplate(data: any): string {
	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<title>New Contact - Battle Electric</title>
			<style>
				body { 
					font-family: Arial, sans-serif; 
					line-height: 1.6; 
					color: #333; 
					max-width: 600px; 
					margin: 0 auto; 
					padding: 20px; 
				}
				.header { 
					background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
					color: white; 
					padding: 30px 20px; 
					border-radius: 8px 8px 0 0; 
					text-align: center; 
				}
				.content { 
					background: #f9fafb; 
					padding: 30px 20px; 
					border-radius: 0 0 8px 8px; 
				}
				.info-row { 
					display: flex; 
					justify-content: space-between; 
					margin-bottom: 15px; 
					padding: 10px; 
					background: white; 
					border-radius: 5px; 
				}
				.label { font-weight: bold; color: #374151; }
				.value { color: #1f2937; }
				.message-box { 
					background: white; 
					padding: 20px; 
					border-radius: 8px; 
					border-left: 4px solid #3b82f6; 
					margin: 20px 0; 
				}
				.actions { 
					text-align: center; 
					margin-top: 30px; 
				}
				.btn { 
					display: inline-block; 
					background: #3b82f6; 
					color: white; 
					padding: 12px 24px; 
					text-decoration: none; 
					border-radius: 6px; 
					margin: 0 10px; 
				}
				.btn-call { background: #10b981; }
			</style>
		</head>
		<body>
			<div class="header">
				<h1>⚡ New Contact - Battle Electric</h1>
				<p>Someone just submitted your contact form</p>
			</div>
			
			<div class="content">
				<div class="info-row">
					<span class="label">👤 Contact Person:</span>
					<span class="value">${data.fullName}</span>
				</div>
				
				<div class="info-row">
					<span class="label">📧 Email Address:</span>
					<span class="value">
						<a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a>
					</span>
				</div>
				
				<div class="info-row">
					<span class="label">📞 Phone Number:</span>
					<span class="value">
						<a href="tel:+1${data.phone}" style="color: #3b82f6;">+1 ${data.phone}</a>
					</span>
				</div>
				
				<div class="info-row">
					<span class="label">📅 Submitted:</span>
					<span class="value">${new Date(data.submittedAt).toLocaleString()}</span>
				</div>

				<div class="message-box">
					<h3 style="margin-top: 0; color: #374151;">💬 Message Content</h3>
					<p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
				</div>

				<div class="actions">
					<a href="mailto:${data.email}?subject=Re: Your inquiry to Battle Electric&body=Hi ${data.fullName.split(' ')[0]},%0D%0A%0D%0AThank you for contacting Battle Electric..." 
					   class="btn">
						📧 Reply to ${data.fullName.split(' ')[0]}
					</a>
					<a href="tel:+1${data.phone}" class="btn btn-call">
						📞 Call Now
					</a>
				</div>
				
				<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
					<strong>Lead Source:</strong> ${data.source}<br>
					<strong>Reference ID:</strong> ${data.contactId}<br>
					<strong>⚡ Priority:</strong> Respond within 4 hours for best conversion
				</div>
			</div>
		</body>
		</html>
	`;
}

function generateUserConfirmationTemplate(data: any): string {
	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<title>Thank you - Battle Electric</title>
			<style>
				body { 
					font-family: Arial, sans-serif; 
					line-height: 1.6; 
					color: #333; 
					max-width: 600px; 
					margin: 0 auto; 
					padding: 20px; 
				}
				.header { 
					background: linear-gradient(135deg, #10b981 0%, #059669 100%);
					color: white; 
					padding: 40px 20px; 
					border-radius: 8px 8px 0 0; 
					text-align: center; 
				}
				.content { 
					background: #f0f9ff; 
					padding: 40px 30px; 
					border-radius: 0 0 8px 8px; 
				}
				.message-summary { 
					background: white; 
					padding: 25px; 
					border-radius: 8px; 
					border-left: 4px solid #3b82f6; 
					margin: 25px 0; 
				}
				.next-steps { 
					background: #fefce8; 
					padding: 25px; 
					border-radius: 8px; 
					margin: 25px 0; 
				}
				.footer { 
					text-align: center; 
					color: #6b7280; 
					margin-top: 30px; 
					padding-top: 20px; 
					border-top: 1px solid #e5e7eb; 
				}
				ul { padding-left: 0; list-style: none; }
				li { margin-bottom: 10px; }
				a { color: #3b82f6; text-decoration: none; }
			</style>
		</head>
		<body>
			<div class="header">
				<h1>✅ Message Received!</h1>
				<p>Thank you for contacting Battle Electric</p>
			</div>
			
			<div class="content">
				<div style="font-size: 18px; margin-bottom: 25px;">
					Hi ${data.fullName.split(' ')[0]} 👋
				</div>
				
				<p>Thank you for reaching out to <strong>Battle Electric</strong>! We've received your message and our team will get back to you within <strong>24 hours</strong>.</p>

				<div class="message-summary">
					<h3 style="margin-top: 0; color: #374151;">📝 Your Message</h3>
					<p style="font-style: italic; white-space: pre-wrap; margin: 0;">"${data.message}"</p>
					<p style="color: #6b7280; font-size: 14px; margin-top: 15px; margin-bottom: 0;">
						Submitted on ${new Date(data.submittedAt).toLocaleDateString()}
					</p>
				</div>

				<div class="next-steps">
					<h3 style="margin-top: 0; color: #92400e;">⚡ What Happens Next?</h3>
					<ul>
						<li>🔍 <strong>Review:</strong> Our electrical experts will review your request</li>
						<li>📞 <strong>Contact:</strong> We'll reach out within 24 hours via phone or email</li>
						<li>📋 <strong>Quote:</strong> If applicable, we'll provide a detailed estimate</li>
						<li>⚡ <strong>Service:</strong> We'll schedule your electrical work at your convenience</li>
					</ul>
				</div>

				<div style="background: white; padding: 25px; border-radius: 8px;">
					<h3 style="margin-top: 0;">⚡ Emergency Electrical Services</h3>
					<p>If you have an electrical emergency, please call us immediately:</p>
					<p style="text-align: center;">
						<a href="tel:+15551234567" style="font-size: 20px; font-weight: bold; color: #dc2626;">
							📞 (555) 123-HELP
						</a>
					</p>
				</div>
			</div>

			<div class="footer">
				<strong style="color: #374151;">⚡ Battle Electric</strong><br>
				Professional Electrical Services<br><br>
				📧 <a href="mailto:battleelectric050@gmail.com">battleelectric050@gmail.com</a><br>
				📞 <a href="tel:+15551234567">(555) 123-4567</a><br>
				🌐 <a href="https://battleelectric.com">battleelectric.com</a>
				
				<div style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
					Reference ID: ${data.contactId}
				</div>
			</div>
		</body>
		</html>
	`;
}
