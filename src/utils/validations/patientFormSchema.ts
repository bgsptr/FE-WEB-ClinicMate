import z from "zod";

const patientFormSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must be at most 100 characters long"),

  email: z.string().email("Invalid email format"),

  phone_number: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),

  gender: z.enum(["MALE", "FEMALE"]),

  birth_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid birth date"),

  birth_place: z.string().min(2, "Birth place must be at least 2 characters"),

  domicile: z.string().min(2, "Domicile must be at least 2 characters"),
});

export default patientFormSchema;
