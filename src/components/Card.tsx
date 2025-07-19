import { useState, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import type { ICardProps } from "@/types/components.ts";

export default function MonobankCard(props: ICardProps): ReactNode {
	// Props
	const { cardholderName = "XXXX XXXXX XXXXX", cardNumber = "XXXX XXXX XXXX XXXX", expiryDate = "00/00", cvv = "000" } = props;

	// State
	const [isFlipped, setIsFlipped] = useState<boolean>(false);

	// Functions
	function onMouse(): void {
		setIsFlipped((old) => !old);
	}

	// Animation variants
	const cardVariants: Variants = {
		front: { rotateY: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
		back: { rotateY: 180, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
	};

	const containerVariants: Variants = {
		initial: { scale: 1, y: 0 },
		hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
	};

	const shineVariants: Variants = {
		initial: { opacity: 0, x: "-100%" },
		hover: { opacity: 1, x: "100%", transition: { duration: 1.2, ease: "easeInOut" } },
	};

	const chipVariants: Variants = {
		initial: { scale: 1 },
		hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } },
	};

	const numberVariants: Variants = {
		initial: { opacity: 1 },
		hover: { opacity: 0.9, transition: { duration: 0.2 } },
	};

	return (
		<motion.div
			initial="initial"
			whileHover="hover"
			onMouseEnter={onMouse}
			onMouseLeave={onMouse}
			variants={containerVariants}
			style={{ perspective: "1000px" }}
			className="relative w-[580px] h-[310px] cursor-pointer">
			<motion.div
				initial="front"
				variants={cardVariants}
				className="relative w-full h-full"
				animate={isFlipped ? "back" : "front"}
				style={{ transformStyle: "preserve-3d" }}>
				{/* Front of card */}
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.9 }}
					style={{ backfaceVisibility: "hidden" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="absolute inset-0 w-full h-full bg-gray-800 rounded-2xl border-4 shadow-2xl overflow-hidden">
					{/* Background pattern */}
					<div
						className="absolute inset-0 opacity-60"
						style={{
							backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>

					{/* Enhanced Card shine effect with Framer Motion */}
					<motion.div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						variants={shineVariants}
						initial="initial"
						whileHover="hover">
						<div
							className="absolute inset-0 w-full h-full"
							style={{
								background: "linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
								transform: "skewX(-25deg)",
								width: "150%",
								left: "-50%",
							}}
						/>
					</motion.div>

					{/* Header */}
					<motion.div
						className="flex justify-between items-start p-8 pb-0 relative z-10"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}>
						<div className="flex items-center gap-3">
							<motion.span className="text-white text-2xl font-bold tracking-tight" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
								monobank
							</motion.span>
							<span className="text-gray-400 text-base font-normal tracking-wide">Universal Bank</span>
						</div>
						<motion.div className="relative w-7 h-7 mt-1" whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
							<div className="absolute inset-0 border-2 border-gray-500 rounded-full border-r-transparent border-b-transparent" />
							<div className="absolute top-1.5 left-1.5 w-4 h-4 border-2 border-gray-500 rounded-full border-r-transparent border-b-transparent" />
						</motion.div>
					</motion.div>

					{/* Enhanced Chip */}
					<motion.div
						initial="initial"
						whileHover="hover"
						variants={chipVariants}
						className="absolute left-8 top-20 w-12 h-10 z-10 rounded-sm border border-[oklch(0.63_0.19_81.79/0.4)] shadow-[inset_0_3px_6px_oklch(1_0_0/0.3),inset_0_-3px_6px_oklch(0_0_0/0.3),0_4px_12px_oklch(0_0_0/0.2)] bg-gradient-to-[145deg] from-[oklch(0.88_0.12_97.25)] via-[oklch(0.73_0.13_84.68)] to-[oklch(0.85_0.14_95.19)]">
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
								<motion.div
									key={i}
									className="absolute w-1.5 h-1.5 rounded-sm"
									style={{
										...pos,
										background: "linear-gradient(145deg, #8b6914 0%, #654321 50%, #8b6914 100%)",
										boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.3)",
									}}
									initial={{ opacity: 0.8 }}
									transition={{ delay: i * 0.05 }}
									whileHover={{ opacity: 1, scale: 1.1 }}
								/>
							))}

							{/* Central processing area */}
							<div
								className="absolute top-3 left-3 w-5 h-3 rounded-sm opacity-60"
								style={{ background: "linear-gradient(to bottom right, #d4af37, #b8860b)" }}
							/>
						</div>
					</motion.div>

					{/* Card Number */}
					<motion.div
						initial="initial"
						whileHover="hover"
						variants={numberVariants}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className="absolute left-8 top-36 text-white text-3xl font-mono tracking-widest z-10 font-light">
						{cardNumber}
					</motion.div>

					{/* World Text */}
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: 20 }}
						whileHover={{ color: "#9ca3af" }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="absolute right-8 top-44 text-gray-600 text-base uppercase tracking-wider font-medium z-10">
						world
					</motion.div>

					{/* Bottom Info */}
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{ delay: 0.6, duration: 0.5 }}
						className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
						<div className="flex flex-col gap-1">
							<motion.div
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.2 }}
								className="text-white text-lg font-medium uppercase tracking-wide leading-tight">
								{cardholderName}
							</motion.div>
							<div className="text-gray-400 text-base font-normal">{expiryDate}</div>
						</div>
						<motion.div className="flex items-center" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
							<motion.div className="w-10 h-10 rounded-full relative z-20 bg-[#eb001b]" whileHover={{ x: -2 }} transition={{ duration: 0.2 }} />
							<motion.div
								whileHover={{ x: 2 }}
								transition={{ duration: 0.2 }}
								className="w-10 h-10 rounded-full relative z-10 -ml-5 bg-[#ff5f00]"
							/>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Back of card */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					style={{ transform: "rotateY(180deg)" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="absolute inset-0 w-full h-full bg-gray-800 rounded-2xl border-4 shadow-2xl overflow-hidden backface-hidden">
					{/* Background pattern */}
					<div
						className="absolute inset-0 opacity-60"
						style={{
							backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>

					{/* Magnetic stripe */}
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
						className="absolute top-12 left-0 right-0 h-12 bg-black shadow-inner"
					/>

					{/* Signature strip */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="absolute top-28 left-8 right-8 h-12 bg-white rounded-md flex items-center justify-end px-6 shadow-md">
						<div className="text-gray-700 text-base italic font-medium capitalize">{cardholderName}</div>
					</motion.div>

					{/* CVV area */}
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						initial={{ opacity: 0, scale: 0.8 }}
						transition={{ delay: 0.7, duration: 0.4 }}
						whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
						className="absolute top-56 right-8 w-20 h-10 bg-white rounded-md flex items-center justify-center shadow-md">
						<div className="text-black text-base font-mono font-bold">{cvv}</div>
					</motion.div>

					{/* CVV label */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.3 }}
						className="absolute top-66 right-8 text-gray-400 text-sm">
						CVV
					</motion.div>

					{/* Bank info */}
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{ delay: 0.9, duration: 0.5 }}
						className="absolute bottom-6 left-8 right-32 text-white text-sm leading-relaxed">
						<motion.div className="mb-3 text-xl font-bold" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
							monobank
						</motion.div>
						<div className="text-gray-400 mb-2">Universal Bank • Customer Service: 1-800-MONO-BANK</div>
						<div className="text-gray-400 mb-1">This card is property of Universal Bank</div>
						<div className="text-gray-500 text-xs mt-3">Report lost or stolen cards immediately</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
