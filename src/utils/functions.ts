import { CARD_PATTERNS } from "./consts.ts";

import type { TValidCreditCardType } from "@/types/data.ts";

function sanitizeCardNumber(cardNumber: string): string {
	return cardNumber.replace(/[\s\-\.]/g, "");
}

/**
 * Validates a credit card number using the Luhn algorithm (also known as the "modulus 10" algorithm).
 *
 * The Luhn algorithm is a simple checksum formula used to validate various identification numbers,
 * including credit card numbers, IMEI numbers, and Canadian Social Insurance Numbers. It's designed
 * to protect against accidental errors in transmission or data entry.
 *
 * **Algorithm Steps:**
 * 1. Starting from the rightmost digit, double every second digit (every even position from right)
 * 2. If doubling results in a number greater than 9, subtract 9 from it
 * 3. Sum all the digits
 * 4. If the total sum is divisible by 10, the number is valid
 *
 * @param {string} cardNumber - The credit card number as a string (digits only, no spaces or dashes)
 * @returns {boolean} Returns `true` if the card number passes Luhn validation, `false` otherwise
 *
 * @example
 * // Valid credit card numbers
 * isValidLuhn("4532015112830366"); // returns true (Visa)
 * isValidLuhn("5555555555554444"); // returns true (Mastercard)
 * isValidLuhn("378282246310005");  // returns true (American Express)
 *
 * @example
 * // Invalid credit card numbers
 * isValidLuhn("4532015112830367"); // returns false (last digit changed)
 * isValidLuhn("1234567890123456"); // returns false (not a valid card)
 * isValidLuhn("123");              // returns false (too short)
 *
 * @example
 * // Edge cases and error handling
 * isValidLuhn("0");           // returns true (single digit 0)
 * isValidLuhn("00");          // returns true (double zeros)
 * isValidLuhn("");            // returns false (empty string - improved)
 * isValidLuhn("123abc");      // returns false (contains non-digits)
 * isValidLuhn("4532 0151");   // returns false (contains spaces)
 *
 * @throws {TypeError} Throws if cardNumber is not a string
 *
 * @see {@link https://en.wikipedia.org/wiki/Luhn_algorithm} - Wikipedia article on Luhn algorithm
 * @see {@link https://www.iso.org/standard/31531.html} - ISO/IEC 7812 standard for identification cards
 *
 */
function isValidLuhn(cardNumber: string): boolean {
	// Input validation
	if (typeof cardNumber !== "string" || cardNumber.length === 0 || !/^\d+$/.test(cardNumber)) return false;

	let sum = 0;
	let shouldDouble = false;

	for (let i = cardNumber.length - 1; i >= 0; i--) {
		let digit = parseInt(cardNumber.charAt(i), 10); // Explicit radix

		// Double every second digit (even positions from the right)
		if (shouldDouble) {
			digit *= 2;
			// If the doubled digit is greater than 9, subtract 9 (equivalent to summing the digits)
			if (digit > 9) digit -= 9;
		}

		sum += digit;
		shouldDouble = !shouldDouble; // Toggle for next iteration
	}

	// The number is valid if the sum is divisible by 10
	return sum % 10 === 0;
}

/**
 * Determines the credit card type based on the card number pattern and length.
 *
 * This function identifies major credit card types by analyzing the card number's
 * prefix patterns and validating against known length requirements for each card type.
 * It does NOT validate the card number using the Luhn algorithm - use isValidLuhn() for that.
 *
 * **Supported Card Types:**
 * - VISA (starts with 4, lengths: 13, 16, 19)
 * - AMEX (starts with 34 or 37, length: 15)
 * - MASTERCARD (starts with 51-55 or 22-27, length: 16)
 * - DISCOVER (complex pattern starting with 6011, 644-649, 65, or 622126-622925, lengths: 16, 19)
 * - DINERS (starts with 300-305, 36, or 38, length: 14)
 * - JCB (starts with 3528-3589, length: 16)
 * - CHINA_UNION_PAY (starts with 62 or 81, lengths: 16-19)
 * - MAESTRO (various patterns, lengths: 12-19)
 * - ELO (Brazilian card, various patterns, length: 16)
 * - HIPERCARD (Brazilian card, starts with 6062 or 60XX, length: 16)
 * - MIR (Russian card, starts with 2200-2204, length: 16)
 *
 * @param {string} cardNumber - The credit card number (can include spaces, dashes, or dots)
 * @returns {string} The detected card type name, or "Unknown" if not recognized, or "Invalid" for invalid input
 *
 * @example
 * // Valid card type detection
 * creditCardType("4532015112830366");     // returns "VISA"
 * creditCardType("5555-5555-5555-4444");  // returns "MASTERCARD"
 * creditCardType("378282246310005");      // returns "AMEX"
 * creditCardType("6011 1111 1111 1117");  // returns "DISCOVER"
 * creditCardType("30569309025904");       // returns "DINERS"
 * creditCardType("6212345678901234");     // returns "CHINA_UNION_PAY"
 * creditCardType("6304985028090561");     // returns "MAESTRO"
 *
 * @example
 * // Invalid inputs
 * creditCardType("");                     // returns "Invalid"
 * creditCardType("123");                  // returns "Invalid" (too short)
 * creditCardType("12345678901234567890"); // returns "Invalid" (too long)
 * creditCardType("abc123");               // returns "Invalid" (contains letters)
 * creditCardType(null);                   // returns "Invalid"
 *
 * @example
 * // Unknown card types
 * creditCardType("1234567890123456");     // returns "Unknown" (valid format but unknown type)
 *
 * @throws {TypeError} Throws if cardNumber is not a string (after null/undefined check)
 *
 * @see {@link https://en.wikipedia.org/wiki/Payment_card_number} - Wikipedia on payment card numbers
 * @see {@link https://www.iso.org/standard/31531.html} - ISO/IEC 7812 standard
 */
export function creditCardType(cardNumber: string): string {
	// Handle null, undefined, or non-string inputs
	if (cardNumber == null) return "Invalid";

	if (typeof cardNumber !== "string") throw new TypeError("Card number must be a string");

	// Handle empty string
	if (cardNumber.trim().length === 0) return "Invalid";

	// Sanitize the card number (remove spaces, dashes, dots)
	const sanitized = sanitizeCardNumber(cardNumber);

	// Validate that sanitized string contains only digits
	if (!/^\d+$/.test(sanitized)) return "Invalid";

	// Validate length (credit cards are typically 12-19 digits)
	if (sanitized.length < 12 || sanitized.length > 19) return "Invalid";

	// Check against known card patterns
	for (const cardType of CARD_PATTERNS) {
		if (cardType.pattern.test(sanitized) && cardType.lengths.includes(sanitized.length)) return cardType.name;
	}

	// Valid format but unknown card type
	return "Unknown";
}

export function creditCardTypeWithValidation(cc: string): TValidCreditCardType {
	const cardType = creditCardType(cc);
	return { cardType, isValid: cardType !== undefined && isValidLuhn(sanitizeCardNumber(cc)) };
}

export const formatOnlyNumber = (value: string): string => value.replace(/\D/g, "");

export const formatCardholderName = (value: string): string => value.replace(/[^a-zA-ZÀ-ÿĀ-žА-я\s]/g, "");

export function formatExpirationDate(value: string): string {
	const cleaned = value.replace(/\D/g, "");
	if (cleaned.length >= 2) {
		const month = cleaned.slice(0, 2);
		const year = cleaned.slice(2, 4);
		return year ? `${month}/${year}` : month;
	}
	return cleaned;
}
