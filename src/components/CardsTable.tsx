"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import type { StoredCard, TableFilters, EditingCard } from "@/types/components";

// Sample data for demonstration
const initialCards: Array<StoredCard> = [
	// {
	// 	id: "1",
	// 	cardholderName: "Juan Pérez",
	// 	cardNumber: "4532 1234 5678 9012",
	// 	expiryDate: "12/25",
	// 	cardType: "Visa",
	// },
];

export default function CardsTable() {
	// Internal state management
	const [cards, setCards] = useState<Array<StoredCard>>(initialCards);
	const [filters, setFilters] = useState<TableFilters>({
		search: "",
		cardType: "",
		status: "",
		sortBy: "dateAdded",
		sortOrder: "desc",
	});

	const [editingCard, setEditingCard] = useState<EditingCard | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [tempValue, setTempValue] = useState("");
	const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

	// Filter and sort cards
	const filteredAndSortedCards = useMemo(() => {
		const filtered = cards.filter((card) => {
			const matchesSearch = card.cardholderName.toLowerCase().includes(filters.search.toLowerCase()) || card.cardNumber.includes(filters.search);
			return (matchesSearch && !filters.cardType) || card.cardType === filters.cardType;
		});

		return filtered;
	}, [cards, filters]);

	// Focus input when editing starts
	useEffect(() => {
		if (editingCard && inputRef.current) {
			inputRef.current.focus();
			if (inputRef.current instanceof HTMLInputElement) inputRef.current.select();
		}
	}, [editingCard]);

	// Internal functions
	function handleFilterChange(key: keyof TableFilters, value: string): void {
		setIsLoading(() => true);
		setFilters((prev) => ({ ...prev, [key]: value }));
		setTimeout(() => setIsLoading(false), 300);
	}

	const handleSort = (column: TableFilters["sortBy"]) => {
		handleFilterChange("sortBy", column);
		handleFilterChange("sortOrder", filters.sortBy === column && filters.sortOrder === "asc" ? "desc" : "asc");
	};

	const addNewCard = (newCard: Omit<StoredCard, "id">) => setCards((prev) => [{ ...newCard, id: Date.now().toString() }, ...prev]);

	const deleteCard = (id: string) => setCards((prev) => prev.filter((card) => card.id !== id));

	const updateCard = (id: string, updates: Partial<StoredCard>) => {
		setCards((prev) => prev.map((card) => (card.id === id ? { ...card, ...updates } : card)));
	};

	const startEditing = (cardId: string, field: EditingCard["field"], currentValue: string) => {
		setEditingCard({ id: cardId, field, value: currentValue });
		setTempValue(currentValue);
	};

	const cancelEditing = () => {
		setEditingCard(null);
		setTempValue("");
	};

	const saveEdit = () => {
		if (!editingCard) return;

		// Validate the input
		if (editingCard.field === "cardholderName" && tempValue.trim().length < 2) return;

		if (editingCard.field === "expiryDate") {
			if (!/^\d{2}\/\d{2}$/.test(tempValue)) return;
		}

		// Update the card
		updateCard(editingCard.id, { [editingCard.field]: tempValue });

		setEditingCard(null);
		setTempValue("");
	};

	const handleKeyPress = ({ key }: React.KeyboardEvent) => {
		if (key === "Enter") saveEdit();
		else if (key === "Escape") cancelEditing();
	};

	function formatExpiryDate(value: string): string {
		const digits = value.replace(/\D/g, "");
		if (digits.length >= 2) return digits.substring(0, 2) + "/" + digits.substring(2, 4);
		return digits;
	}

	const handleExpiryChange = (value: string) => {
		setTempValue(formatExpiryDate(value));
	};

	const getCardTypeColor = (cardType: string) => {
		switch (cardType.toLowerCase()) {
			case "visa":
				return "bg-blue-100 text-blue-800";
			case "mastercard":
				return "bg-red-100 text-red-800";
			case "amex":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	function maskCardNumber(cardNumber: string): string {
		const cleaned = cardNumber.replace(/\s/g, "");
		return `${cleaned.slice(0, 2)}** **** **** ${cleaned.slice(-4)}`;
	}

	// Icons
	const SearchIcon = () => (
		<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
	);

	const SortIcon = ({ active, direction }: { active: boolean; direction: "asc" | "desc" }) => (
		<svg
			className={`h-4 w-4 transition-colors ${active ? "text-blue-600" : "text-gray-400"}`}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24">
			{direction === "asc" ? <path d="M7 14l5-5 5 5" /> : <path d="M7 10l5 5 5-5" />}
		</svg>
	);

	const EditIcon = () => (
		<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
			<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
		</svg>
	);

	const SaveIcon = () => (
		<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path d="M9 12l2 2 4-4" />
			<circle cx="12" cy="12" r="10" />
		</svg>
	);

	const CancelIcon = () => (
		<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" />
			<line x1="15" y1="9" x2="9" y2="15" />
			<line x1="9" y1="9" x2="15" y2="15" />
		</svg>
	);

	const TrashIcon = () => (
		<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<polyline points="3,6 5,6 21,6" />
			<path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
			<line x1="10" y1="11" x2="10" y2="17" />
			<line x1="14" y1="11" x2="14" y2="17" />
		</svg>
	);

	return (
		<div className="bg-white rounded-lg shadow-xl border border-gray-200">
			{/* Header */}
			<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h2 className="text-xl font-bold text-gray-900">Historico de Tarjetas</h2>
				<p className="text-sm text-gray-600 mt-1">Historico de tarjetas registradas</p>
			</div>

			{/* Filters */}
			<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="px-6 py-4 bg-gray-50 border-b border-gray-200">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Search */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
							<SearchIcon />
						</div>
						<input
							type="text"
							value={filters.search}
							placeholder="Buscar por propietario..."
							onChange={(e) => handleFilterChange("search", e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					{/* Card Type Filter */}
					<select
						value={filters.cardType}
						onChange={(e) => handleFilterChange("cardType", e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
						<option value="">Tipos de tarjetas</option>
						<option value="Visa">Visa</option>
						<option value="Mastercard">Mastercard</option>
						<option value="Amex">American Express</option>
					</select>

					{/* Results Count */}
					<div className="flex items-center text-sm text-gray-600">
						<span className="font-medium">{filteredAndSortedCards.length}</span>
						<span className="ml-1">{filteredAndSortedCards.length === 1 ? "tarjeta" : "tarjetas"} encontradas</span>
					</div>
				</div>
			</motion.div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								<button
									onClick={() => handleSort("cardholderName")}
									className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
									<span>Propietario de la tarjeta</span>
									<SortIcon active={filters.sortBy === "cardholderName"} direction={filters.sortOrder} />
								</button>
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero de Tarjeta</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Tarjeta</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								<button onClick={() => handleSort("expiryDate")} className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
									<span>Fecha de Expiracion</span>
									<SortIcon active={filters.sortBy === "expiryDate"} direction={filters.sortOrder} />
								</button>
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						<AnimatePresence mode="wait">
							{isLoading ? (
								<motion.tr key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
									<td colSpan={7} className="px-6 py-8 text-center">
										<div className="flex items-center justify-center">
											<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
											<span className="ml-2 text-gray-600">Loading...</span>
										</div>
									</td>
								</motion.tr>
							) : filteredAndSortedCards.length === 0 ? (
								<motion.tr key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
									<td colSpan={7} className="px-6 py-8 text-center text-gray-500">
										<div className="flex flex-col items-center">
											<p className="mb-2">No se encontraron Tarjetas!</p>
										</div>
									</td>
								</motion.tr>
							) : (
								filteredAndSortedCards.map((card, index) => (
									<motion.tr
										key={card.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ delay: index * 0.05 }}
										className="hover:bg-gray-50 transition-colors">
										{/* Cardholder Name */}
										<td className="px-6 py-4 whitespace-nowrap">
											{editingCard?.id === card.id && editingCard.field === "cardholderName" ? (
												<motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="flex items-center space-x-2">
													<input
														type="text"
														maxLength={50}
														value={tempValue}
														onKeyDown={handleKeyPress}
														onChange={(e) => setTempValue(e.target.value)}
														ref={inputRef as React.RefObject<HTMLInputElement>}
														className="text-sm font-medium text-gray-900 border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0 flex-1"
													/>
													<div className="flex space-x-1">
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={saveEdit}
															className="text-green-600 hover:text-green-800 p-1">
															<SaveIcon />
														</motion.button>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={cancelEditing}
															className="text-gray-600 hover:text-gray-800 p-1">
															<CancelIcon />
														</motion.button>
													</div>
												</motion.div>
											) : (
												<div className="flex items-center justify-between group">
													<div className="text-sm font-medium text-gray-900">{card.cardholderName}</div>
													<motion.button
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.9 }}
														onClick={() => startEditing(card.id, "cardholderName", card.cardholderName)}
														className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-all p-1">
														<EditIcon />
													</motion.button>
												</div>
											)}
										</td>

										{/* Card Number */}
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900 font-mono">{maskCardNumber(card.cardNumber)}</div>
										</td>

										{/* Card Type */}
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCardTypeColor(card.cardType)}`}>
												{card.cardType}
											</span>
										</td>

										{/* Expiry Date */}
										<td className="px-6 py-4 whitespace-nowrap">
											{editingCard?.id === card.id && editingCard.field === "expiryDate" ? (
												<motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="flex items-center space-x-2">
													<input
														ref={inputRef as React.RefObject<HTMLInputElement>}
														type="text"
														value={tempValue}
														onChange={(e) => handleExpiryChange(e.target.value)}
														onKeyDown={handleKeyPress}
														placeholder="MM/YY"
														className="text-sm text-gray-900 border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-16"
														maxLength={5}
													/>
													<div className="flex space-x-1">
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={saveEdit}
															className="text-green-600 hover:text-green-800 p-1">
															<SaveIcon />
														</motion.button>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={cancelEditing}
															className="text-gray-600 hover:text-gray-800 p-1">
															<CancelIcon />
														</motion.button>
													</div>
												</motion.div>
											) : (
												<div className="flex items-center justify-between group">
													<div className="text-sm text-gray-900">{card.expiryDate}</div>
													<motion.button
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.9 }}
														onClick={() => startEditing(card.id, "expiryDate", card.expiryDate)}
														className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-all p-1">
														<EditIcon />
													</motion.button>
												</div>
											)}
										</td>

										{/* Actions */}
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => deleteCard(card.id)}
												className="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
												disabled={!!editingCard}>
												<TrashIcon />
											</motion.button>
										</td>
									</motion.tr>
								))
							)}
						</AnimatePresence>
					</tbody>
				</table>
			</div>

			{/* Footer */}
			{filteredAndSortedCards.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center">
					<span>
						Showing {filteredAndSortedCards.length} of {cards.length} cards
					</span>
					<span className="text-xs text-gray-500">Click on any field to edit • Press Enter to save • Press Escape to cancel</span>
				</motion.div>
			)}
		</div>
	);
}
