import { BrowserRouter, createBrowserRouter } from "react-router";
import type { ReactNode } from "react";

export default function App(): ReactNode {
	const router = createBrowserRouter([]);

	return (
		<ThemeProvider>
			<BrowserRouter></BrowserRouter>
		</ThemeProvider>
	);
}
