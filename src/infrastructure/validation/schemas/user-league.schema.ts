import { z } from "zod";

export const createUserLeagueSchema = z.object({
    name: z.string().min(1, "League name is required")
});

export const updateUserLeagueSchema = createUserLeagueSchema.partial();

export const joinUserLeagueSchema = z.object({
    inviteCode: z.string().length(6, "Invite code must be exactly 6 characters")
});
