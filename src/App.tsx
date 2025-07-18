import ThemeProvider from "@/components/providers/ThemeProvider.tsx";
import MonobankCard from "./components/Card.tsx";

import type { ReactNode } from "react";

export default function App(): ReactNode {
	return (
		<ThemeProvider defaultTheme="dark">
			<MonobankCard />
		</ThemeProvider>
	);
}
