import { CheckCircleIcon, WarningCircleIcon, CreditCardIcon, UserIcon, LockIcon, CalendarDotsIcon } from "@phosphor-icons/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
import { motion } from "motion/react";
import MonobankCard from "./Card";
import { z } from "zod";

const cardSchema = z.object({
	number: z
		.string()
		.min(16, "Numero de tarjeta demasiado corto!, El numero de tarjeta debe de ser de minimo de 16 caracteres!")
		.max(19, "Numero de tarjeta demasiado largo!, El numero de tarjeta debe de ser de maximo de 19 caracteres!")
		.regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "El numero de tarjeta provisto no es valido!"),
	holder: z
		.string()
		.min(2, "Nombre demasiado corto!, el nombre debe de contener minimo 2 letras!")
		.max(20, "Nombre demasiado largo!, el nombre debe de contener maximo 20 letras!")
		.regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
	expirationDate: z
		.string()
		.min(1, "Please select a month")
		.regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
	cvv: z
		.string()
		.min(3, "CVV demasiado corto!, debe de ser minimo de 3 digitos")
		.max(4, "CVV demasiado largo!, debe de ser maximo de 3 digitos")
		.regex(/^\d{3,4}$/, "CVV must be numeric"),
});

type TCardFormData = z.infer<typeof cardSchema>;

export default function CardForm(): ReactNode {
	// RHF
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<TCardFormData>({
		defaultValues: { number: "", holder: "", expirationDate: "", cvv: "" },
		resolver: zodResolver(cardSchema),
	});

	// RHF Errors
	const { holder: holderError, number: numberError, cvv: cvvError, expirationDate: expirationDateError } = errors;

	const { holder: dirtyHolder, number: dirtyNumber, cvv: dirtyCvv, expirationDate: dirtyExpirationDate } = dirtyFields;

	// Functions
	const submitHandler: SubmitHandler<TCardFormData> = function (_data): void {};

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 20 }}
			className="w-full bg-white rounded-lg shadow-xl border border-gray-200">
			<form className="px-6 py-6 space-y-6" onSubmit={handleSubmit(submitHandler)}>
				{/* Card */}
				<motion.div
					className="relative mb-6"
					transition={{ delay: 0.2 }}
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.9 }}>
					<div className="flex justify-center">
						<div className="scale-75 sm:scale-90 lg:scale-100 origin-center">
							<MonobankCard />
						</div>
					</div>
				</motion.div>

				{/* Fields */}

				{/* Cardholder Name */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
					<label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
						Nombre Titular
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
							<UserIcon />
						</div>
						<input
							type="text"
							id="cardholderName"
							{...register("holder")}
							placeholder="Juan Pérez"
							className={`
                  w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                  ${
										holderError
											? "border-red-500 focus:border-red-500 focus:ring-red-500"
											: !holderError && dirtyHolder
											? "border-green-500 focus:border-green-500 focus:ring-green-500"
											: "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
									}
                `}
							aria-describedby={holderError ? "cardholderName-error" : undefined}
							aria-invalid={!!holderError}
						/>
						{holderError && (
							<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-y-0 right-0 pr-3 flex items-center">
								{holderError === undefined && dirtyHolder ? (
									<div className="text-green-500">
										<CheckCircleIcon />
									</div>
								) : (
									<div className="text-red-500">
										<WarningCircleIcon />
									</div>
								)}
							</motion.div>
						)}
					</div>
					{holderError && (
						<motion.p
							role="alert"
							id="cardholderName-error"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: -10 }}
							className="text-sm text-red-600">
							{holderError.message}
						</motion.p>
					)}
				</motion.div>

				<motion.div
					transition={{ delay: 0.3 }}
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					className="grid grid-cols-2 gap-4">
					{/* Card Number */}
					<div className="col-span-2 space-y-2">
						<label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
							Número de Tarjeta
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
								<CreditCardIcon />
							</div>
							<input
								type="text"
								id="cardNumber"
								{...register("number")}
								placeholder="1234 5678 9012 3456"
								className={`
                    w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                    ${
											numberError
												? "border-red-500 focus:border-red-500 focus:ring-red-500"
												: !numberError && dirtyNumber
												? "border-green-500 focus:border-green-500 focus:ring-green-500"
												: "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
										}
                  `}
								aria-describedby={numberError ? "cardNumber-error" : undefined}
								aria-invalid={!!numberError}
								maxLength={19}
							/>
							{numberError && (
								<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-y-0 right-0 pr-3 flex items-center">
									{!numberError && dirtyNumber ? (
										<div className="text-green-500">
											<CheckCircleIcon />
										</div>
									) : (
										<div className="text-red-500">
											<WarningCircleIcon />
										</div>
									)}
								</motion.div>
							)}
						</div>
						{numberError && (
							<motion.p
								role="alert"
								id="cardNumber-error"
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -10 }}
								className="text-sm text-red-600">
								{numberError.message}
							</motion.p>
						)}
					</div>

					{/* Expiration Date */}
					<div className="space-y-2">
						<label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
							Fecha Vencimiento
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
								<CalendarDotsIcon />
							</div>
							<input
								type="text"
								placeholder="MM/YY"
								id="expirationDate"
								{...register("expirationDate")}
								className={`
                    w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                    ${
											expirationDateError
												? "border-red-500 focus:border-red-500 focus:ring-red-500"
												: !expirationDateError && dirtyExpirationDate
												? "border-green-500 focus:border-green-500 focus:ring-green-500"
												: "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
										}
                  `}
								aria-describedby={expirationDateError ? "expirationDate-error" : undefined}
								aria-invalid={!!expirationDateError}
								maxLength={5}
							/>
							{expirationDateError && (
								<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-y-0 right-0 pr-3 flex items-center">
									{!expirationDateError && dirtyExpirationDate ? (
										<div className="text-green-500">
											<CheckCircleIcon />
										</div>
									) : (
										<div className="text-red-500">
											<WarningCircleIcon />
										</div>
									)}
								</motion.div>
							)}
						</div>
						{expirationDateError && (
							<motion.p
								role="alert"
								id="expirationDate-error"
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -10 }}
								className="text-sm text-red-600">
								{expirationDateError.message}
							</motion.p>
						)}
					</div>

					{/* CVV */}
					<div className="space-y-2">
						<label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
							CVV
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
								<LockIcon />
							</div>
							<input
								id="cvv"
								type="password"
								placeholder="123"
								{...register("cvv")}
								className={`
                    w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                    ${
											cvvError
												? "border-red-500 focus:border-red-500 focus:ring-red-500"
												: !cvvError && dirtyCvv
												? "border-green-500 focus:border-green-500 focus:ring-green-500"
												: "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
										}
                  `}
								aria-describedby={cvvError ? "cvv-error" : undefined}
								aria-invalid={!!cvvError}
								maxLength={4}
							/>
							{cvvError && (
								<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-y-0 right-0 pr-3 flex items-center">
									{!cvvError && dirtyCvv ? (
										<div className="text-green-500">
											<CheckCircleIcon />
										</div>
									) : (
										<div className="text-red-500">
											<WarningCircleIcon />
										</div>
									)}
								</motion.div>
							)}
						</div>
						{cvvError && (
							<motion.p
								role="alert"
								id="cvv-error"
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -10 }}
								className="text-sm text-red-600">
								{cvvError.message}
							</motion.p>
						)}
					</div>
				</motion.div>
				<motion.div
					transition={{ delay: 0.3 }}
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					className="flex justify-end-safe gap-4">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" type="submit">
						Agregar
					</button>
					<button
						type="button"
						onClick={() => reset()}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">
						Limpiar
					</button>
				</motion.div>
			</form>
		</motion.div>
	);
}
