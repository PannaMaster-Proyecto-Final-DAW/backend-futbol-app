import { z } from "zod";

export const createCountrySchema = z.object({
    name: z.string().min(1, "Country name is required"),
    pictureUrl: z.string().url("Invalid picture URL").optional().or(z.literal('')),
    tierMale: z.number().int().min(1).max(3).default(1),
    tierFemale: z.number().int().min(1).max(3).default(1)
});

export const updateCountrySchema = createCountrySchema.partial();
