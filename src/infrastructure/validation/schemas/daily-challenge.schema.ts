import { z } from "zod";

export const createDailyChallengeSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD"),
    gameId: z.string().min(1, "Game ID is required"),
    modeId: z.string().min(1, "Mode ID is required"),
    challengeData: z.record(z.string(), z.any()).or(z.array(z.any()))
});

export const updateDailyChallengeSchema = z.object({
    challengeData: z.record(z.string(), z.any()).or(z.array(z.any()))
});
