export interface CardPattern {
	lengths: Array<number>;
	pattern: RegExp;
	name: string;
}

export type TValidCreditCardType = {
	isValid: boolean;
	cardType: string;
};
