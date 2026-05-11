import { z } from "zod";

export class ValidationError extends Error {
    constructor(public errors: any) {
        super("Validation Failed");
        this.name = "ValidationError";
    }
}

export const validateData = <T>(schema: z.Schema<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new ValidationError(result.error.format());
    }
    return result.data;
};
