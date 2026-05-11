import { z } from "zod";
import { UserRole } from "../../../domain/entities/user.entity.js";

export const userRoleSchema = z.nativeEnum(UserRole);

export const createUserSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: userRoleSchema.default(UserRole.USER)
});

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

export const updateUserSchema = createUserSchema.partial();
