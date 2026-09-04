// City data for /service-areas/* pages. Every claim here must be true and
// specific — these pages must never become thin doorway pages (BAT-16).
export interface ServiceArea {
	slug: string;
	name: string;
	county: string;
	intro: string;
	localNotes: string[];
}

export const serviceAreas: ServiceArea[] = [
	{
		slug: 'homestead',
		name: 'Homestead',
		county: 'Miami-Dade County',
		intro:
			'Battle Electric is based right here in Homestead — when you call us, you are hiring your neighborhood electrician, not a crew driving in from across the county. We handle everything from quick repairs to complete rewires for Homestead homes and businesses.',
		localNotes: [
			'Local response times: our shop is in Homestead, so we can usually get to you faster than out-of-town contractors.',
			'We work with the City of Homestead Development Services on permits regularly and know their review process first-hand.',
			'Many Homestead homes still run on older 100-amp panels — we evaluate and upgrade them to safely support modern appliances, AC, and EV chargers.',
		],
	},
	{
		slug: 'miami',
		name: 'Miami',
		county: 'Miami-Dade County',
		intro:
			'From residential panel upgrades to commercial electrical projects, Battle Electric serves the city of Miami with licensed, insured electrical work — including public-facility and commercial jobs that demand strict code compliance.',
		localNotes: [
			'Experience with City of Miami permitting and inspections for both residential and commercial work.',
			'Commercial capabilities: our team has wired public facilities and commercial spaces across Miami-Dade.',
			'EV charger installations for Miami condos, single-family homes, and business fleets.',
		],
	},
	{
		slug: 'coral-gables',
		name: 'Coral Gables',
		county: 'Miami-Dade County',
		intro:
			'Coral Gables homes are special — historic properties, strict city standards, and increasingly, solar and smart-energy systems. Battle Electric has done full remodel electrical work in Coral Gables, including solar panel removal and reinstallation, service upgrades, and FPL coordination.',
		localNotes: [
			'Real project experience in Coral Gables: complete remodel wiring, 200A to 400A service upgrades, and solar system removal/reinstall during roof work.',
			'FPL coordination: we manage overhead-to-underground service conversions and utility paperwork end to end.',
			'Familiar with Coral Gables’ demanding permitting and inspection standards for renovations.',
		],
	},
	{
		slug: 'miramar',
		name: 'Miramar',
		county: 'Broward County',
		intro:
			'Battle Electric serves Miramar and southern Broward with commercial and residential electrical services — from industrial shop wiring to home panel upgrades and EV chargers.',
		localNotes: [
			'Commercial project experience in Miramar, including industrial shop electrical work with full permit and inspection cycles.',
			'We handle City of Miramar permitting and are registered with the city as an electrical contractor.',
			'Residential services across southern Broward: panels, EV charging, lighting, and troubleshooting.',
		],
	},
];
