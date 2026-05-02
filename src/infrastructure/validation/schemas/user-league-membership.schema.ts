import { z } from "zod";

export const createUserLeagueMembershipSchema = z.object({
    userId: z.string().uuid("Invalid user ID format"),
    leagueId: z.string().uuid("Invalid league ID format"),
    score: z.number().int().min(0).optional()
});

export const updateUserLeagueMembershipSchema = z.object({
    score: z.number().int().min(0)
});

export const incrementScoreSchema = z.object({
    amount: z.number().int().positive("Amount must be positive")
});
