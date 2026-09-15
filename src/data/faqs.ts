import { LICENSE_LABEL } from './business';

// Shared FAQ copy (BAT-34). Each page must render a DISTINCT set: identical
// FAQPage JSON-LD on multiple URLs reads as duplicated markup to Google.
// GENERAL_FAQS belongs to the homepage; CONTACT_FAQS is process-oriented
// copy for /contact-us. /services keeps its own inline set (already unique).
export interface FaqItem {
	question: string;
	answer: string;
}

export const GENERAL_FAQS: FaqItem[] = [
	{
		question: 'What areas does Battle Electric serve?',
		answer:
			'We serve residential and commercial clients across Miami-Dade, Broward, and Monroe County (Upper Keys), plus Southwest Florida and Greater Orlando, from our base in Homestead, Florida.',
	},
	{
		question: 'What electrical services do you offer?',
		answer:
			'We install and replace electrical panels, install EV chargers (Level 1, 2, and 3, including Tesla Wall Connectors), and install SPAN smart panels. We also handle general electrical work: rewiring, troubleshooting and repairs, lighting, smoke detectors, outlets and switches, and temporary power for construction.',
	},
	{
		question: 'Is Battle Electric licensed and insured?',
		answer: `Yes. Battle Electric, LLC is a Florida certified electrical contractor, ${LICENSE_LABEL}, and fully insured. You can verify our license at MyFloridaLicense.com.`,
	},
	{
		question: 'Do you offer free estimates?',
		answer:
			'Yes, estimates are free. Call (786) 404-3885 or request a quote through our contact page and we will get back to you with a quote for your project.',
	},
	{
		question: 'Do you handle emergencies?',
		answer:
			'Yes. Our regular hours are Monday to Saturday, 7:00 AM to 7:00 PM, and we offer 24/7 emergency service for urgent electrical issues.',
	},
];

export const CONTACT_FAQS: FaqItem[] = [
	{
		question: 'How quickly will I hear back after contacting you?',
		answer:
			'We usually respond the same business day. Requests sent through the booking form go straight to our scheduling system, so a phone call at (786) 404-3885 is only faster for emergencies.',
	},
	{
		question: 'What should I include in my request?',
		answer:
			'Tell us the service you need (panel, EV charger, smart panel, or repair), your city, and anything relevant about your home — panel brand and age, garage or outdoor installation, EV model. Photos of your panel help us quote faster.',
	},
	{
		question: 'How does scheduling a visit work?',
		answer:
			'After you book online or call, we confirm a time window that works for you. For most estimates we visit the property, review the work on site, and send you a written quote — free of charge.',
	},
	{
		question: 'Who do I call for an electrical emergency?',
		answer:
			'Call (786) 404-3885 any time. We offer 24/7 emergency service across Miami-Dade, Broward, and Monroe County for urgent issues like burning smells, sparking panels, or total power loss.',
	},
];
