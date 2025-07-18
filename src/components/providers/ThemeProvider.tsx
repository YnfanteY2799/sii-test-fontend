import { createContext, useContext, useEffect, useState } from "react";

import type { Theme, ThemeProviderProps, ThemeProviderState } from "@/types/components.ts";

const ThemeProviderContext = createContext<ThemeProviderState>({ theme: "system", setTheme: () => null });

export default function ThemeProvider({ children, defaultTheme = "system", storageKey = "appTheme", ...props }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			root.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
			return;
		}
		root.classList.add(theme);
		root.dataset.theme = theme;
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export function UseTheme(): ThemeProviderState {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
