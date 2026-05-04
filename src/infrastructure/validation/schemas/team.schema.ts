import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string().min(1, "Team name is required"),
    leagueId: z.string().uuid("Invalid league ID format"),
    pictureUrl: z.string().url("Invalid picture URL").optional().or(z.literal('')),
    tier: z.number().int().min(1).max(3).optional()
});

export const updateTeamSchema = createTeamSchema.partial();
