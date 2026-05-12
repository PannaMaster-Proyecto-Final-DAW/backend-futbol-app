import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../../container.js';

/**
 * Extended Request interface to include authenticated user data.
 */
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

/**
 * Middleware to protect routes that require authentication.
 * Verifies the JWT token sent in the Authorization header.
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    // If there is no header or it doesn't start with "Bearer ", we reject
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // We extract the token (skipping the 7 characters of "Bearer ")
    const token = authHeader.slice(7);

    try {
        // We verify the token using the centralized service
        const decoded = tokenService.verifyToken(token);
        
        // We attach the user data to the request for controllers to use
        req.user = decoded;
        
        // We continue to the next middleware or controller
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
