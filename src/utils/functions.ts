import { CARD_PATTERNS } from "./consts.ts";

import type { TValidCreditCardType, TCardInfo } from "@/types/data.ts";

function isValidLuhn(cardNumber: string): boolean {
	let sum = 0;
	let isEven = false;

	for (let i = cardNumber.length - 1; i >= 0; i--) {
		let digit = parseInt(cardNumber.charAt(i));
		if (isEven) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}
		sum += digit;
		isEven = !isEven;
	}

	return sum % 10 === 0;
}

function sanitizeCardNumber(cardNumber: string): string {
	return cardNumber.replace(/[\s-]/g, "");
}

export function creditCardType(cc: string): string {
	if (!cc || typeof cc !== "string") return "Not Valid!";

	const sanitized = sanitizeCardNumber(cc);

	if (!/^\d+$/.test(sanitized)) return "Not Valid!";

	if (sanitized.length < 12 || sanitized.length > 19) return "Not Valid!";

	for (const cardType of CARD_PATTERNS) {
		if (cardType.pattern.test(sanitized) && cardType.lengths.includes(sanitized.length)) return cardType.name;
	}

	return "Not Valid!";
}

export function creditCardTypeWithValidation(cc: string): TValidCreditCardType {
	const type = creditCardType(cc);
	const sanitized = sanitizeCardNumber(cc);
	const isValid = type !== undefined && isValidLuhn(sanitized);

	return { type, isValid };
}

export function getCardInfo(cc: string): TCardInfo {
	const sanitized = sanitizeCardNumber(cc);
	const type = creditCardType(cc);
	const isValid = type !== undefined && isValidLuhn(sanitized);

	return {
		type,
		isValid,
		sanitized,
		length: sanitized.length,
	};
}
