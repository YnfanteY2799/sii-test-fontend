export interface CardPattern {
	lengths: Array<number>;
	pattern: RegExp;
	name: string;
}

export type TValidCreditCardType = {
	isValid: boolean;
	type: string;
};

export type TCardInfo = {
	sanitized: string;
	isValid: boolean;
	length: number;
	type: string;
};
