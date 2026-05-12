import jwt from 'jsonwebtoken';
import { TokenService } from '../../application/interfaces/token-service.interface.js';

/**
 * Service to manage the creation and verification of JWT tokens.
 * Implements the TokenService interface from the application layer.
 */
export class JwtTokenService implements TokenService {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        const secret = process.env.JWT_SECRET;
        // Critical validation: We do not allow starting without the secret in the .env
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        this.secret = secret;
        this.expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    }

    /**
     * Generates a signed JWT token with user data (id and role).
     */
    generateToken(payload: { id: string; role: string }): string {
        // We use (jwt as any) to avoid TypeScript errors with the ESM import
        return (jwt as any).sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    /**
     * Verifies that a token is valid and returns its content.
     */
    verifyToken(token: string): { id: string; role: string } {
        try {
            return (jwt as any).verify(token, this.secret) as { id: string; role: string };
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
