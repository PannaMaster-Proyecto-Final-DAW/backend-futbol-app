export interface TokenService {
    /**
     * Generates a JWT token for a payload.
     * @param payload - The data to include in the token.
     * @returns The generated token string.
     */
    generateToken(payload: { id: string; role: string }): string;

    /**
     * Verifies a JWT token and returns the decoded payload.
     * @param token - The token to verify.
     * @returns The decoded payload if valid.
     * @throws Error if the token is invalid or expired.
     */
    verifyToken(token: string): { id: string; role: string };
}
