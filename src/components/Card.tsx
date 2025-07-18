import { useState, type ReactNode } from "react";

interface CardProps {
	cardholderName?: string;
	cardNumber?: string;
	expiryDate?: string;
	cvv?: string;
}

export default function MonobankCard({
	cardholderName = "DONALD FRINGE COOPER",
	cardNumber = "5375 4411 4540 0954",
	expiryDate = "12/28",
	cvv = "123",
}: CardProps): ReactNode {
	const [isFlipped, setIsFlipped] = useState<boolean>(false);

	function onMouse(): void {
		setIsFlipped((old) => !old);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 p-8">
			<div className="relative w-[520px] h-[320px] cursor-pointer perspective-[1000px]" onMouseEnter={onMouse} onMouseLeave={onMouse}>
				<div
					className={`relative w-full h-full transition-transform duration-700 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}
					style={{
						transformStyle: "preserve-3d",
						transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
					}}>
					{/* Front of card */}
					<div className="absolute inset-0 w-full h-full bg-gray-800 rounded-2xl border-4 border-white shadow-2xl overflow-hidden backface-hidden">
						{/* Background pattern */}
						<div
							className="absolute inset-0 opacity-60"
							style={{
								backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						/>

						{/* Card shine effect */}
						<div
							className="absolute inset-0 pointer-events-none"
							style={{
								background:
									"linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 75%, transparent 100%)",
							}}
						/>

						{/* Header */}
						<div className="flex justify-between items-start p-8 pb-0 relative z-10">
							<div className="flex items-center gap-3">
								<span className="text-white text-2xl font-bold tracking-tight">monobank</span>
								<span className="text-gray-400 text-base font-normal tracking-wide">Universal Bank</span>
							</div>
							<div className="relative w-7 h-7 mt-1">
								<div className="absolute inset-0 border-2 border-gray-500 rounded-full border-r-transparent border-b-transparent" />
								<div className="absolute top-1.5 left-1.5 w-4 h-4 border-2 border-gray-500 rounded-full border-r-transparent border-b-transparent" />
							</div>
						</div>

						{/* Enhanced Chip */}
						<div className="absolute left-8 top-20 w-12 h-10 z-10 rounded-sm border border-[oklch(0.63_0.19_81.79/0.4)] shadow-[inset_0_3px_6px_oklch(1_0_0/0.3),inset_0_-3px_6px_oklch(0_0_0/0.3),0_4px_12px_oklch(0_0_0/0.2)] bg-gradient-to-[145deg] from-[oklch(0.88_0.12_97.25)] via-[oklch(0.73_0.13_84.68)] to-[oklch(0.85_0.14_95.19)]">
							<div className="absolute top-1 left-1 w-10 h-8 rounded-sm overflow-hidden bg-gradient-to-[145deg] from-[oklch(0.55_0.16_80.47)] via-[oklch(0.38_0.10_70.03)] to-[oklch(0.66_0.18_84.22)] shadow-[inset_0_2px_4px_oklch(1_0_0/0.2),inset_0_-2px_4px_oklch(0_0_0/0.4)]">
								{/* Grid pattern */}
								<div
									className="absolute inset-0 opacity-40"
									style={{
										background:
											"linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(180deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
										backgroundSize: "5px 5px",
									}}
								/>

								{/* Contact pads */}
								{[
									{ top: "3px", left: "3px" },
									{ top: "3px", left: "15px" },
									{ top: "3px", right: "3px" },
									{ top: "12px", left: "3px" },
									{ top: "12px", left: "15px" },
									{ top: "12px", right: "3px" },
									{ bottom: "3px", left: "3px" },
									{ bottom: "3px", left: "15px" },
									{ bottom: "3px", right: "3px" },
								].map((pos, i) => (
									<div
										key={i}
										className="absolute w-1.5 h-1.5 rounded-sm"
										style={{
											...pos,
											background: "linear-gradient(145deg, #8b6914 0%, #654321 50%, #8b6914 100%)",
											boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.3)",
										}}
									/>
								))}

								{/* Central processing area */}
								<div
									className="absolute top-3 left-3 w-5 h-3 rounded-sm opacity-60"
									style={{ background: "linear-gradient(to bottom right, #d4af37, #b8860b)" }}
								/>
							</div>
						</div>

						{/* Card Number */}
						<div className="absolute left-8 top-36 text-white text-3xl font-mono tracking-widest z-10 font-light">{cardNumber}</div>

						{/* World Text */}
						<div className="absolute right-8 top-44 text-gray-600 text-base uppercase tracking-wider font-medium z-10">world</div>

						{/* Bottom Info */}
						<div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
							<div className="flex flex-col gap-1">
								<div className="text-white text-lg font-medium uppercase tracking-wide leading-tight">{cardholderName}</div>
								<div className="text-gray-400 text-base font-normal">{expiryDate}</div>
							</div>
							<div className="flex items-center">
								<div className="w-10 h-10 rounded-full relative z-20 bg-[#eb001b]" />
								<div className="w-10 h-10 rounded-full relative z-10 -ml-5 bg-[#ff5f00]" />
							</div>
						</div>
					</div>

					{/* Back of card */}
					<div className="absolute inset-0 w-full h-full bg-gray-800 rounded-2xl border-4 border-white shadow-2xl overflow-hidden backface-hidden transform-[rotateY(180deg)]">
						{/* Background pattern */}
						<div
							className="absolute inset-0 opacity-60"
							style={{
								backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						/>

						{/* Magnetic stripe */}
						<div className="absolute top-12 left-0 right-0 h-16 bg-black shadow-inner" />

						{/* Signature strip */}
						<div className="absolute top-40 left-8 right-8 h-12 bg-white rounded-md flex items-center justify-end px-6 shadow-md">
							<div className="text-gray-700 text-base italic font-medium">
								{cardholderName.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
							</div>
						</div>

						{/* CVV area */}
						<div className="absolute top-56 right-8 w-20 h-10 bg-white rounded-md flex items-center justify-center shadow-md">
							<div className="text-black text-base font-mono font-bold">{cvv}</div>
						</div>

						{/* CVV label */}
						<div className="absolute top-68 right-8 text-gray-400 text-sm">CVV</div>

						{/* Bank info */}
						<div className="absolute bottom-6 left-8 right-32 text-white text-sm leading-relaxed">
							<div className="mb-3 text-xl font-bold">monobank</div>
							<div className="text-gray-400 mb-2">Universal Bank • Customer Service: 1-800-MONO-BANK</div>
							<div className="text-gray-400 mb-1">This card is property of Universal Bank</div>
							<div className="text-gray-500 text-xs mt-3">Report lost or stolen cards immediately</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
