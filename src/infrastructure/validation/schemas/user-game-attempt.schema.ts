import { z } from "zod";
import { AttemptStatus } from "../../../domain/entities/user-game-attempt.entity.js";

export const attemptStatusSchema = z.nativeEnum(AttemptStatus);

export const saveUserGameAttemptSchema = z.object({
    id: z.string().uuid("Invalid attempt ID format").optional(),
    userId: z.string().uuid("Invalid user ID format"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD"),
    gameId: z.string().min(1, "Game ID is required"),
    modeId: z.string().min(1, "Mode ID is required"),
    score: z.number().int().min(0, "Score must be a positive integer"),
    status: attemptStatusSchema,
    history: z.any().optional()
});
