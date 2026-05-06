import { z } from "zod";
import { PlayerPosition, PlayerGender, GeneralPosition } from "../../../domain/entities/player.entity.js";

export const playerPositionSchema = z.nativeEnum(PlayerPosition);
export const playerGenderSchema = z.nativeEnum(PlayerGender);
export const generalPositionSchema = z.nativeEnum(GeneralPosition);

export const createPlayerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().int().min(0, "Age cannot be negative"),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in YYYY-MM-DD format"),
    position: z.array(playerPositionSchema).min(1, "At least one position is required"),
    generalPosition: generalPositionSchema,
    teamId: z.string().uuid("Invalid team ID format"),
    countryId: z.string().uuid("Invalid country ID format"),
    pictureUrl: z.string().url("Invalid picture URL").optional().or(z.literal('')),
    tier: z.number().int().min(1).max(3).optional(),
    gender: playerGenderSchema
});

export const updatePlayerSchema = createPlayerSchema.partial();
