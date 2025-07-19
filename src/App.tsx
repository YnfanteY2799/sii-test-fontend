import ThemeProvider from "@/components/providers/ThemeProvider.tsx";
import { AnimatePresence, motion } from "motion/react";
import CardsTable from "./components/CardsTable.tsx";
import { useState, type ReactNode } from "react";
import CardForm from "./components/CardForm.tsx";

export default function App(): ReactNode {
	// State
	const [activeTab, setActiveTab] = useState<"registro" | "historico">("registro");

	return (
		<ThemeProvider defaultTheme="dark">
			<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
				<div className="container mx-auto px-4 py-8">
					{/* Header */}
					<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
						<h1 className="text-4xl font-bold text-gray-900 mb-2">Card Holder App</h1>
						<p className="text-gray-600">Registra y gestiona tus tarjetas de pago de forma segura</p>
					</motion.div>

					{/* Tab Navigation */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="flex justify-center mb-8">
						<div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
							<button
								onClick={() => setActiveTab("registro")}
								className={`px-6 py-2 rounded-md font-medium transition-all hover:cursor-pointer ${
									activeTab === "registro" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
								}`}>
								Registrar Nueva Tarjeta
							</button>
							<button
								onClick={() => setActiveTab("historico")}
								className={`px-6 py-2 rounded-md font-medium transition-all hover:cursor-pointer ${
									activeTab === "historico" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
								}`}>
								Historial de tarjetas
							</button>
						</div>
					</motion.div>

					{/* Content */}
					<div className="max-w-6xl mx-auto">
						<AnimatePresence mode="wait">
							{activeTab === "registro" ? (
								<motion.div
									key="registro"
									exit={{ opacity: 0, x: 20 }}
									className="max-w-2xl mx-auto"
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3 }}
									initial={{ opacity: 0, x: -20 }}>
									<CardForm />
								</motion.div>
							) : (
								<motion.div
									key="historico"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}>
									<CardsTable />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</main>
		</ThemeProvider>
	);
}
