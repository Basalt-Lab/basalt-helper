import { hash, verify, argon2id } from 'argon2';

import { BasaltError } from '@/Common/Error/index.js';
import { ServiceErrorKeys } from '@/Common/Error/Enum/index.js';

/**
 * Hashes a password using Argon2id algorithm.
 *
 * @param password - The plain text password to hash.
 * 
 * @throws ({@link BasaltError}) - Throws an error if the password is empty or if hashing fails. ({@link ServiceErrorKeys.PASSWORD_EMPTY})
 * @throws ({@link BasaltError}) - Throws an error if the password is empty or if hashing fails. ({@link ServiceErrorKeys.PASSWORD_HASHING_FAILED})
 * 
 * @returns A promise that resolves with the hashed password.
 */
function hashPassword(password: string): Promise<string> {
    if (password === '')
        return Promise.reject(new BasaltError({
            messageKey: ServiceErrorKeys.PASSWORD_EMPTY
        }));
    try {
        return hash(password, { type: argon2id });
    } catch (error) {
        throw new BasaltError({
            messageKey: ServiceErrorKeys.PASSWORD_HASHING_FAILED
        });
    }
}


/**
 * Verifies a password against a given hash using Argon2id algorithm.
 * 
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to verify against.
 * 
 * @throws ({@link BasaltError}) - Throws an error if the password is empty. ({@link ServiceErrorKeys.PASSWORD_EMPTY})
 * @throws ({@link BasaltError}) - Throws an error if the password verification fails. ({@link ServiceErrorKeys.PASSWORD_VERIFICATION_FAILED})
 * 
 * @returns A promise that resolves with a boolean indicating if the password is correct.
 */
function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (password === '')
        throw new BasaltError({
            messageKey: ServiceErrorKeys.PASSWORD_EMPTY
        });
    try {
        return verify(hashedPassword, password);
    } catch (error) {
        throw new BasaltError({
            messageKey: ServiceErrorKeys.PASSWORD_VERIFICATION_FAILED
        });
    }
}

export const basaltPassword = {
    hashPassword,
    verifyPassword,
};