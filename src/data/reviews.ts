// Featured Google reviews shown on the site. The Places API was removed on
// purpose (see CLAUDE.md) — reviews are curated by hand from the Google
// Business Profile. Refresh routine (quarterly): open GBP → Reviews, pick
// recent favorites, paste them here with a `date` label like 'March 2026'.
export const reviewStats = {
	rating: '5.0',
	countLabel: '100+',
	// TODO(owner): replace with the exact Google Maps listing URL from GBP.
	listingUrl:
		'https://www.google.com/maps/search/?api=1&query=Battle+Electric+13254+SW+263rd+St+Homestead+FL',
	// TODO(owner): replace with the "Ask for reviews" short link (g.page/r/...).
	reviewUrl:
		'https://www.google.com/maps/search/?api=1&query=Battle+Electric+13254+SW+263rd+St+Homestead+FL',
};

export interface Review {
	author_name: string;
	rating: number;
	text: string;
	/** Month label shown on the card, e.g. 'March 2026'. Fill from GBP. */
	date?: string;
}

export const reviews: Review[] = [
	{
		author_name: 'Damy Fee',
		rating: 5,
		text: "I had an outstanding experience with Battle Electric LLC installing a Tesla charger at my home, and I highly recommend them to anyone considering an EV charger installation. From the start, their team was professional, knowledgeable, and extremely responsive. They walked me through the entire process and made sure everything was installed safely, efficiently, and up to code.\n\nWhat impressed me most was their attention to detail and willingness to make sure the setup worked perfectly for my specific needs—even though I'm using the Tesla charger for a non-Tesla electric vehicle. They made sure everything was configured correctly and took the time to explain how it all works.\n\nThe installation was clean, quick, and looks great. It's clear they take pride in their work and care about customer satisfaction. If you're looking for a reliable electrician for EV charger installation or any electrical work, Battle Electric LLC is the company to call.",
	},
	{
		author_name: 'David H',
		rating: 5,
		text: "I couldn't be happier with the work done by Battle Electric! They recently installed a new Span panel system and completely reconfigured the wiring in my home, and the entire experience was outstanding from start to finish.\n\nThe team was professional, punctual, and incredibly knowledgeable. Both the owner and supervisor (Richard and Maria Battle) were present and oversaw the whole process while their team worked diligently for the entire two days. The installation itself was done with great attention to detail, and the final result looks fantastic and works perfectly.\n\nWhat really stood out was their commitment to quality and customer service. The final pricing was incredibly reasonable for the large amount of work involved. We've had quotes from other contractors that were more than double of what we paid with Battle Electric.\n\nIf you're considering upgrading your electrical system or installing a Span panel, I highly recommend Battle Electric.",
	},
	{
		author_name: 'Robert',
		rating: 5,
		text: 'I highly recommend Battle Electric, they went above and beyond my expectations. They installed my new panel without any problems. Great installers and staff, really made it an enjoyable experience. Call them first!',
	},
	{
		author_name: 'Ivelisse Betances',
		rating: 5,
		text: 'I contacted them for installation of a brand new Tesla charger in my house. 10:10!!!! Fast service, friendly service, and excellent installation. Prices are very reasonable too 😃',
	},
	{
		author_name: 'William Conde',
		rating: 5,
		text: 'Very professional and do a great job. They arrived when they said they would, did the job, and the communication from estimate to invoice was extremely professional. I would highly recommend.',
	},
];
