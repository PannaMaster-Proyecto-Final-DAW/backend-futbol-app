import { z } from "zod";
import { LeagueCategory } from "../../../domain/entities/league.entity.js";

export const leagueCategorySchema = z.nativeEnum(LeagueCategory);

export const createLeagueSchema = z.object({
    name: z.string().min(1, "League name is required"),
    countryId: z.string().uuid("Invalid country ID format"),
    category: leagueCategorySchema,
    pictureUrl: z.string().url("Invalid picture URL").optional().or(z.literal(''))
});

export const updateLeagueSchema = createLeagueSchema.partial();
