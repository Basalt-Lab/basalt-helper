import { hash, verify } from 'argon2';
import { availableParallelism } from 'os';

/**
 * Class providing password hashing and verification using Argon2.
 */
export class BasaltPassword {

    /**
     * The level of parallelism to use for password hashing. Determined by the available hardware concurrency.
     * @type {number}
     * @private
     * @readonly
     */
    private static readonly _parallelism: number = availableParallelism();

    /**
     * Hashes a password using Argon2 algorithm with optimal parallelism for the system.
     * @param {string} password - The plain text password to hash.
     * @returns {Promise<string>} - A promise that resolves with the hashed password.
     * @throws {Error} - Throws an error if the password is empty or if hashing fails.
     */
    public static async hashPassword(password: string): Promise<string> {
        try {
            if (password === '')
                throw new Error('The password cannot be empty.');
            return await hash(password, {
                parallelism: BasaltPassword._parallelism,
                saltLength: 32,
            });
        } catch (error) {
            throw new Error('An error occurred while hashing the password.');
        }
    }

    /**
     * Verifies a password against a given hash using Argon2 algorithm.
     * @param {string} password - The plain text password to verify.
     * @param {string} hashedPassword - The hashed password to verify against.
     * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if the password is correct.
     * @throws {Error} - Throws an error if the password is empty or if verification fails.
     */
    public static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            if (password === '')
                throw new Error('The password cannot be empty.');
            return await verify(hashedPassword, password);
        } catch (error) {
            throw new Error('An error occurred while verifying the password.');
        }
    }
}
