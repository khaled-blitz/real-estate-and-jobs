import { parsePhoneNumberFromString } from 'libphonenumber-js'


/**
 * Formats a phone number into a readable international or national format depending on input.
 * @param phoneNumber - The raw phone number string to format.
 * @param countryCode - Optional country code to prefix the phone number (e.g., "+41", "+1").
 * @returns A formatted phone number string (e.g., "043 543 64 49", "+1 415 555 2671", etc.)
 */
export function getFormattedPhoneNumber(phoneNumber: string, countryCode?: string, includeCountryCode = false): string {
  const parsed = parsePhoneNumberFromString(phoneNumber);

  // If country code is provided and phone number doesn't already have a + prefix, use it
  if (countryCode && !phoneNumber.startsWith('+')) {
    // Try to parse with the country code prefixed
    const parsedWithCountry = parsePhoneNumberFromString(`${countryCode}${phoneNumber}`);
    if (parsedWithCountry) {
      const fromatted = parsedWithCountry.formatInternational();
      return includeCountryCode ? fromatted : fromatted.replace(countryCode, '');
    }
  }

  if (!parsed) {
    // fallback: as-you-type formatting for unknown country
    return heuristicFormatPhoneNumber(phoneNumber);
  }

  // Use national format for local numbers, international format if it starts with +
  return phoneNumber.startsWith('+')
    ? parsed.formatInternational()
    : parsed.formatNational();
}


function heuristicFormatPhoneNumber(phoneNumber: string): string {
    // Remove all spaces and non-digit/non-plus characters first
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Heuristic grouping:
    // Group first 3 digits, then 3 digits, then 2 digits, then 2 digits
    // Adjust groups if length is different
    const groups: string[] = [];

    // Local format
    // Try groups: 3-3-2-2 or fallback to chunks of 3
    if (cleaned.length === 10) {
        groups.push(cleaned.slice(0, 3));
        groups.push(cleaned.slice(3, 6));
        groups.push(cleaned.slice(6, 8));
        groups.push(cleaned.slice(8, 10));
    } else if (cleaned.length === 9) {
        groups.push(cleaned.slice(0, 3));
        groups.push(cleaned.slice(3, 6));
        groups.push(cleaned.slice(6, 9));
    } else if (cleaned.length === 11) {
        groups.push(cleaned.slice(0, 3));
        groups.push(cleaned.slice(3, 7));
        groups.push(cleaned.slice(7, 11));
    } else {
        // fallback: split in chunks of 3, last group can be shorter
        for (let i = 0; i < cleaned.length; i += 3) {
            groups.push(cleaned.slice(i, i + 3));
        }
    }
    return groups.filter(Boolean).join('\u202F');
}
