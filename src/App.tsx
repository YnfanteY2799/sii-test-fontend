import ThemeProvider from "@/components/providers/ThemeProvider";

import type { ReactNode } from "react";
import MonobankCard from "./components/Card";

export default function App(): ReactNode {
	return (
		<ThemeProvider defaultTheme="dark">
			<MonobankCard />
		</ThemeProvider>
	);
}
