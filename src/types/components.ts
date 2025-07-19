import type { ReactNode } from "react";

/** Default Handled Theme Type */
export type Theme = "dark" | "light" | "system";

export interface CommonComponentProps {
	children?: ReactNode;
}

export interface ThemeProviderProps {
	storageKey?: string;
	children: ReactNode;
	defaultTheme?: Theme;
}

/** Type Provider State */
export type ThemeProviderState = {
	setTheme: (theme: Theme) => void;
	theme: Theme;
};

export interface ICardProps {
	cardholderName?: string;
	cardNumber?: string;
	expiryDate?: string;
	handleFlip?: Function;
	cvv?: string;
}

export interface StoredCard {
	cardholderName: string;
	cardNumber: string;
	expiryDate: string;
	cardType: string;
	id: string;
}

export interface TableFilters {
	sortBy: "cardholderName" | "dateAdded" | "lastUsed" | "expiryDate";
	sortOrder: "asc" | "desc";
	cardType: string;
	search: string;
	status: string;
}

export interface EditingCard {
	field: "cardholderName" | "expiryDate" | "status";
	value: string;
	id: string;
}
