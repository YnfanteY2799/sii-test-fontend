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
	cvv?: string;
}
