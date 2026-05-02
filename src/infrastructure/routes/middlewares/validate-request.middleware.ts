import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.Schema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: "Validation Failed",
                details: result.error.format()
            });
        }
        // Replace req.body with validated data to ensure correct types
        req.body = result.data;
        next();
    };
};
