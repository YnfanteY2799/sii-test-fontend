import ThemeProvider from "@/components/providers/ThemeProvider.tsx";
import CardForm from "./components/CardForm.tsx";
import { motion } from "motion/react";

import type { ReactNode } from "react";

export default function App(): ReactNode {
	return (
		<ThemeProvider defaultTheme="dark">
			<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
				<div className="container mx-auto px-4 py-8">
					{/* Header */}
					<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
						<h1 className="text-4xl font-bold text-gray-900 mb-2">Card Holder App</h1>
						<p className="text-gray-600">Registra y gestiona tus tarjetas de pago de forma segura</p>
					</motion.div>
					{/* Form */}
					<motion.div
						exit={{ opacity: 0, x: 20 }}
						className="max-w-2xl mx-auto"
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}
						initial={{ opacity: 0, x: -20 }}>
						<CardForm />
					</motion.div>
				</div>
			</main>
		</ThemeProvider>
	);
}
