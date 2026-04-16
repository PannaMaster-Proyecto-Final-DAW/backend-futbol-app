/**
 * Port for the password hashing service.
 * Defines the contract for hashing and comparing passwords.
 */
export interface PasswordHasher {
    /**
     * Hashes a plain text password.
     * @param password - The password to hash.
     * @returns A promise that resolves to the hashed password.
     */
    hash(password: string): Promise<string>;

    /**
     * Compares a plain text password with a hashed password.
     * @param plain - The plain text password.
     * @param hashed - The hashed password to compare against.
     * @returns A promise that resolves to true if they match, false otherwise.
     */
    compare(plain: string, hashed: string): Promise<boolean>;
}
