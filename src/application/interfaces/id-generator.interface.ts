/**
 * Port for the ID generation service.
 * Defines the contract for generating unique identifiers.
 */
export interface IdGenerator {
    /**
     * Hashes a plain text password.
     * @returns A string representing the unique ID.
     */
    generate(): string;
}
