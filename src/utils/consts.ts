import type { CardPattern } from "@/types/data.ts";

export const CARD_PATTERNS: Array<CardPattern> = [
	{
		lengths: [13, 16, 19],
		pattern: /^4/,
		name: "VISA",
	},
	{
		pattern: /^3[47]/,
		lengths: [15],
		name: "AMEX",
	},
	{
		pattern: /^(5[1-5]|2[2-7])/,
		name: "MASTERCARD",
		lengths: [16],
	},
	{
		pattern: /^(6011|64[4-9]|65|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]))/,
		lengths: [16, 19],
		name: "DISCOVER",
	},
	{
		pattern: /^(30[0-5]|36|38)/,
		name: "DINERS",
		lengths: [14],
	},
	{
		pattern: /^35(2[89]|[3-8][0-9])/,
		lengths: [16],
		name: "JCB",
	},
	{
		lengths: [16, 17, 18, 19],
		name: "CHINA_UNION_PAY",
		pattern: /^(62|81)/,
	},
	{
		pattern: /^(5018|5020|5038|5893|6304|6759|676[1-3])/,
		lengths: [12, 13, 14, 15, 16, 17, 18, 19],
		name: "MAESTRO",
	},
	{
		pattern: /^(4011|4312|4389|4514|4573|4576|5041|5066|5067|6277|6362|6363|6504|6505|6516)/,
		lengths: [16],
		name: "ELO",
	},
	{
		pattern: /^(6062|60[0-9]{2})/,
		name: "HIPERCARD",
		lengths: [16],
	},
	{
		pattern: /^220[0-4]/,
		lengths: [16],
		name: "MIR",
	},
];
