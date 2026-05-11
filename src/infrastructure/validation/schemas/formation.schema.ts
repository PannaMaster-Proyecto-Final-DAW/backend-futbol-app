import { z } from "zod";
import { PlayerPosition } from "../../../domain/entities/player.entity.js";

const playerPositionSchema = z.nativeEnum(PlayerPosition);

export const createFormationSchema = z.object({
    name: z.string().min(1, "Formation name is required"),
    goalkeeper: playerPositionSchema.optional(),
    defenders: z.array(playerPositionSchema).optional(),
    midfielders: z.array(playerPositionSchema).optional(),
    forwards: z.array(playerPositionSchema).optional(),
    positionsList: z.array(playerPositionSchema).length(11, "A formation must have exactly 11 positions").optional()
}).refine(data => {
    return data.positionsList !== undefined || (data.goalkeeper !== undefined && data.defenders !== undefined);
}, {
    message: "Either positionsList or manual position groups must be provided",
    path: ["positionsList"]
});

export const updateFormationSchema = z.object({
    name: z.string().min(1, "Formation name is required").optional(),
    goalkeeper: playerPositionSchema.optional(),
    defenders: z.array(playerPositionSchema).optional(),
    midfielders: z.array(playerPositionSchema).optional(),
    forwards: z.array(playerPositionSchema).optional(),
    positionsList: z.array(playerPositionSchema).length(11, "A formation must have exactly 11 positions").optional()
});
