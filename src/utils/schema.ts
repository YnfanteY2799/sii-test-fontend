import { z } from "zod";

export const cardSchema = z.object({
	number: z
		.string()
		.min(16, "Numero de tarjeta demasiado corto!, El numero de tarjeta debe de ser de 16 caracteres!")
		.max(16, "Numero de tarjeta demasiado largo!, El numero de tarjeta debe de ser de 16 caracteres!")
		.regex(/^\d{16}$/, "El numero de tarjeta debe contener exactamente 16 digitos!"),
	holder: z
		.string()
		.min(2, "Nombre demasiado corto!, el nombre debe de contener minimo 2 letras!")
		.max(20, "Nombre demasiado largo!, el nombre debe de contener maximo 20 letras!")
		.regex(/^[a-zA-ZÀ-ÿĀ-žА-я\s]+$/, "El nombre solo puede contener letras, espacios y acentos"),
	expirationDate: z
		.string()
		.min(5, "Formato de fecha incorrecto")
		.max(5, "Formato de fecha incorrecto")
		.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato debe ser MM/YY"),
	cvv: z
		.string()
		.min(3, "CVV demasiado corto!, debe de ser minimo de 3 digitos")
		.max(4, "CVV demasiado largo!, debe de ser maximo de 4 digitos")
		.regex(/^\d{3,4}$/, "CVV debe contener solo numeros"),
});

export type TCardFormData = z.infer<typeof cardSchema>;
