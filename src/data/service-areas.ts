// City data for /service-areas/* pages. Every claim here must be true and
// specific — these pages must never become thin doorway pages (BAT-16).
export interface CityFaq {
	question: string;
	answer: string;
}

export interface ServiceArea {
	slug: string;
	name: string;
	county: string;
	intro: string;
	intro2: string;
	localNotes: string[];
	faqs: CityFaq[];
}

// Full verified "Areas We Serve" list (BAT-20). Names checked against real
// Florida geography; cities with a deep service-area page carry an href.
export interface AreaPlace {
	name: string;
	href?: string;
}

export interface AreaGroup {
	group: string;
	places: AreaPlace[];
}

export const areasWeServe: AreaGroup[] = [
	{
		group: 'Miami-Dade County',
		places: [
			{ name: 'Miami', href: '/service-areas/miami' },
			{ name: 'Homestead', href: '/service-areas/homestead' },
			{ name: 'Coral Gables', href: '/service-areas/coral-gables' },
			{ name: 'Kendall' },
			{ name: 'Kendall West' },
			{ name: 'Doral' },
			{ name: 'Key Biscayne' },
			{ name: 'Keystone Islands' },
			{ name: 'Miami Shores' },
			{ name: 'North Miami' },
			{ name: 'North Miami Beach' },
			{ name: 'Pinecrest' },
			{ name: 'Sans Souci' },
			{ name: 'Surfside' },
			{ name: 'Coconut Grove' },
			{ name: 'Cutler Bay' },
			{ name: 'Eastern Shores' },
			{ name: 'South Miami' },
			{ name: 'Palmetto Bay' },
			{ name: 'Sweetwater' },
			{ name: 'Miami Springs' },
			{ name: 'Florida City' },
			{ name: 'Medley' },
			{ name: 'West Miami' },
			{ name: 'Westchester' },
			{ name: 'Tamiami' },
			{ name: 'The Hammocks' },
			{ name: 'Country Walk' },
			{ name: 'Virginia Gardens' },
			{ name: 'West Perrine' },
			{ name: 'University Park' },
		],
	},
	{
		group: 'Broward County',
		places: [
			{ name: 'Fort Lauderdale' },
			{ name: 'Miramar', href: '/service-areas/miramar' },
			{ name: 'Hollywood' },
			{ name: 'Pembroke Pines' },
			{ name: 'Coconut Creek' },
			{ name: 'Coral Springs' },
			{ name: 'Dania Beach' },
			{ name: 'Davie' },
			{ name: 'Deerfield Beach' },
			{ name: 'Hallandale Beach' },
			{ name: 'Hillsboro Beach' },
			{ name: 'Lauderdale-by-the-Sea' },
			{ name: 'North Lauderdale' },
			{ name: 'Oakland Park' },
			{ name: 'Parkland' },
			{ name: 'Plantation' },
			{ name: 'Pompano Beach' },
			{ name: 'Sea Ranch Lakes' },
			{ name: 'Sunrise' },
			{ name: 'Tamarac' },
			{ name: 'Weston' },
			{ name: 'Wilton Manors' },
		],
	},
	{
		group: 'Monroe County — Upper Keys',
		places: [
			{ name: 'Key Largo' },
			{ name: 'North Key Largo' },
			{ name: 'Tavernier' },
			{ name: 'Islamorada (Village of Islands)' },
		],
	},
	{
		group: 'Southwest Florida — Lee County',
		places: [{ name: 'Fort Myers' }, { name: 'Lehigh Acres' }],
	},
	{
		group: 'Greater Orlando — Orange & Seminole County',
		places: [
			{ name: 'Winter Park' },
			{ name: 'Azalea Park' },
			{ name: 'Altamonte Springs' },
			{ name: 'Goldenrod' },
			{ name: 'Avalon Park' },
		],
	},
];

export const serviceAreas: ServiceArea[] = [
	{
		slug: 'homestead',
		name: 'Homestead',
		county: 'Miami-Dade County',
		intro:
			'Battle Electric is based right here in Homestead — when you call us, you are hiring your neighborhood electrician, not a crew driving in from across the county. We handle everything from quick repairs to complete rewires for Homestead homes and businesses.',
		intro2:
			'Homestead mixes fast-growing new developments with an older housing core, and each needs different electrical work: new construction calls for EV-ready wiring and smart panels, while many established homes still run on 100-amp panels that struggle with modern AC, appliances, and chargers. We work on both every week — and being local, we can usually get to you faster than out-of-town contractors.',
		localNotes: [
			'Our shop is in Homestead (13254 SW 263rd St) — local response times, no travel surcharges.',
			'We work with the City of Homestead Development Services on permits regularly and know their review process first-hand.',
			'Panel upgrades for older Homestead homes: we evaluate 100-amp services and upgrade them to safely support modern loads.',
			'We also cover Florida City, Leisure City, and the surrounding South Dade area.',
		],
		faqs: [
			{
				question: 'How fast can you get to a job in Homestead?',
				answer:
					'Our shop is in Homestead, so we are usually the fastest option in town — for both scheduled work and 24/7 emergency calls in the South Dade area.',
			},
			{
				question: 'Do you handle City of Homestead electrical permits?',
				answer:
					'Yes. We pull permits with the City of Homestead Development Services regularly and manage the inspection process for you, as a licensed Florida electrical contractor (License NO. EC13010206).',
			},
			{
				question: 'Do you also serve Florida City and the surrounding area?',
				answer:
					'Yes. We serve all of South Miami-Dade, including Florida City, Leisure City, Princeton, and the Redland area around Homestead.',
			},
		],
	},
	{
		slug: 'miami',
		name: 'Miami',
		county: 'Miami-Dade County',
		intro:
			'From residential panel upgrades to commercial electrical projects, Battle Electric serves the city of Miami with licensed, insured electrical work — including public-facility and commercial jobs that demand strict code compliance.',
		intro2:
			'Miami electrical work comes in every size: high-rise condos that need EV charging with property-management coordination, single-family homes due for panel upgrades, and commercial spaces where downtime costs money. Our team has wired public facilities and commercial spaces across Miami-Dade, and we bring the same code-first approach to every residential job.',
		localNotes: [
			'Experience with City of Miami permitting and inspections for both residential and commercial work.',
			'Commercial capabilities: our team has wired public facilities and commercial spaces across Miami-Dade.',
			'EV charger installations for Miami condos, single-family homes, and business fleets.',
			'Smart panel (SPAN) installations for Miami homes that want energy monitoring and load management.',
		],
		faqs: [
			{
				question: 'Do you install EV chargers in Miami condos?',
				answer:
					'Yes. We install Level 2 chargers in condos, single-family homes, and businesses across Miami, and we handle the electrical permit and inspection required for the installation.',
			},
			{
				question: 'Do you pull City of Miami electrical permits?',
				answer:
					'Yes. As a licensed Florida electrical contractor (License NO. EC13010206) we manage City of Miami permits and inspections for residential and commercial projects.',
			},
			{
				question: 'Do you take commercial electrical projects in Miami?',
				answer:
					'Yes. Our team has performed commercial electrical work across Miami-Dade, including public facilities — from new circuits and lighting to full electrical build-outs.',
			},
		],
	},
	{
		slug: 'coral-gables',
		name: 'Coral Gables',
		county: 'Miami-Dade County',
		intro:
			'Coral Gables homes are special — historic properties, strict city standards, and increasingly, solar and smart-energy systems. Battle Electric has done full remodel electrical work in Coral Gables, including solar panel removal and reinstallation, service upgrades, and FPL coordination.',
		intro2:
			'A recent Coral Gables project says it best: a full home remodel where we relocated temporary power, removed a complete solar system (panels, inverter, and batteries) for roof work, upgraded the service from 200 to 400 amps, coordinated an overhead-to-underground FPL conversion, and wired the entire home to current code. If your Gables project involves that level of complexity, we have already done it.',
		localNotes: [
			'Real project experience in Coral Gables: complete remodel wiring, 200A to 400A service upgrades, and solar system removal/reinstall during roof work.',
			'FPL coordination: we manage overhead-to-underground service conversions and utility paperwork end to end.',
			'Familiar with Coral Gables’ demanding permitting and inspection standards for renovations.',
			'Smart panel and battery-ready installations for homes combining solar, storage, and EV charging.',
		],
		faqs: [
			{
				question: 'Can you handle the Coral Gables permit process for a remodel?',
				answer:
					'Yes. We have completed full remodel electrical work in Coral Gables and are familiar with the city’s demanding permitting and inspection standards. We manage the process end to end.',
			},
			{
				question: 'Do you work on Coral Gables homes with solar panels?',
				answer:
					'Yes. We have removed and reinstalled complete solar systems — panels, inverter, and batteries — during Coral Gables roof and remodel work, and we rewire and recommission the system afterwards.',
			},
			{
				question: 'Can you upgrade my electrical service for a larger home?',
				answer:
					'Yes. We perform service upgrades such as 200 to 400 amps, including load calculations, FPL coordination, and overhead-to-underground conversions when the project calls for it.',
			},
		],
	},
	{
		slug: 'miramar',
		name: 'Miramar',
		county: 'Broward County',
		intro:
			'Battle Electric serves Miramar and southern Broward with commercial and residential electrical services — from industrial shop wiring to home panel upgrades and EV chargers.',
		intro2:
			'Miramar’s commercial corridors are where we have done some of our most demanding work — industrial shop electrical with full permit and inspection cycles through the City of Miramar. On the residential side, we bring the same licensed, insured crew to panel upgrades, EV chargers, lighting, and troubleshooting across southern Broward.',
		localNotes: [
			'Commercial project experience in Miramar, including industrial shop electrical work with full permit and inspection cycles.',
			'We handle City of Miramar permitting and are registered with the city as an electrical contractor.',
			'Residential services across southern Broward: panels, EV charging, lighting, and troubleshooting.',
			'Nearby coverage: Pembroke Pines, Hollywood, and the rest of our Broward service area.',
		],
		faqs: [
			{
				question: 'Do you do commercial and industrial electrical work in Miramar?',
				answer:
					'Yes. We have completed industrial shop electrical projects in Miramar with full permit and inspection cycles, and we are registered with the City of Miramar as an electrical contractor.',
			},
			{
				question: 'Do you serve homes in Miramar too?',
				answer:
					'Yes. We handle residential panel upgrades, EV charger installations, lighting, and troubleshooting in Miramar and across southern Broward, including Pembroke Pines and Hollywood.',
			},
			{
				question: 'Who pulls the electrical permit in Miramar?',
				answer:
					'We do. As a licensed Florida electrical contractor (License NO. EC13010206), Battle Electric manages City of Miramar permits and inspections for every job that requires them.',
			},
		],
	},
];
