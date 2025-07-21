import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

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
		}),
		handler: async ({ email, name, surname, phone, message }) => {
			try {
				const normalizedPhone = normalizePhoneNumber(phone);
				const fullName = `${name} ${surname}`.trim();

				const contactData = {
					fullName,
					email: email.toLowerCase(),
					phone: normalizedPhone,
					message: message.trim(),
					submittedAt: new Date().toISOString(),
					source: 'website-contact-form',
				};

				console.log('Processing contact form:', contactData);

				// 🚀 Aquí implementarías la lógica real:
				// - Guardar en base de datos
				// - Enviar email de notificación al admin
				// - Enviar email de confirmación al usuario
				// - Integrar con CRM (HubSpot, Salesforce, etc.)
				// - Slack notification al equipo de ventas

				// 📧 Simular envío de email
				await simulateEmailSending(contactData);

				return {
					success: true,
					message: `Thank you ${name}! Your message has been sent successfully. We'll get back to you within 24 hours.`,
					contactId: `contact_${Date.now()}`, // ID para tracking
					timestamp: new Date().toISOString(),
				};
			} catch (error) {
				console.error('Contact form error:', {
					error: error instanceof Error ? error.message : error,
					formData: { email, name, surname },
					timestamp: new Date().toISOString(),
				});

				if (error instanceof Error && error.message.includes('Spam')) {
					throw new Error('Invalid form submission. Please try again.');
				}

				throw new Error(
					'We encountered an issue processing your message. Please try again or contact us directly.'
				);
			}
		},
	}),
};

// 🔧 Helper function para simular envío de email
async function simulateEmailSending(contactData: any): Promise<void> {
	// Simular delay de API externa
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Aquí integrarías con servicios reales como:
	// - SendGrid
	// - Mailgun
	// - AWS SES
	// - Resend

	console.log('Email sent successfully:', {
		to: 'admin@yourcompany.com',
		subject: `New Contact Form Submission from ${contactData.fullName}`,
		template: 'contact-form-notification',
	});
}
