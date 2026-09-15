// Canonical schema.org identity for Battle Electric. Every JSON-LD node that
// refers to the business must reference this @id so parsers merge them into a
// single entity instead of accumulating anonymous duplicates per page.
export const BUSINESS_ID = 'https://www.battleelectricfl.com/#business';

// Florida Electrical Contractor license (DBPR). Single source of truth —
// every page, schema node, and FAQ answer must reference these exports.
export const LICENSE_NUMBER = 'EC13010206';
export const LICENSE_LABEL = `License NO. ${LICENSE_NUMBER}`;
