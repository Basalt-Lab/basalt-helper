import { argon2id, hash, verify } from 'argon2';

import { BasaltError } from '#/common/error/basalt.error.ts';
import { GLOBAL_ERRORS } from '#/common/error/global.error.ts';

/**
 * Hashes a password using Argon2id algorithm.
 *
 * @param password - The plain text password to hash.
 *
 * @throws ({@link BasaltError}) - Throws an error if the password is empty or if hashing fails. ({@link GLOBAL_ERRORS.PASSWORD_EMPTY})
 * @throws ({@link BasaltError}) - Throws an error if the password is empty or if hashing fails. ({@link GLOBAL_ERRORS.PASSWORD_HASHING_FAILED})
 *
 * @returns A promise that resolves with the hashed password.
 */
export function hashPassword(password: string): Promise<string> {
    if (!password)
        return Promise.reject(new BasaltError({
            key: GLOBAL_ERRORS.PASSWORD_EMPTY
        }));
    try {
        return hash(password, { type: argon2id });
    } catch {
        throw new BasaltError({
            key: GLOBAL_ERRORS.PASSWORD_HASHING_FAILED
        });
    }
}


/**
 * Verifies a password against a given hash using Argon2id algorithm.
 *
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to verify against.
 *
 * @throws ({@link BasaltError}) - Throws an error if the password is empty. ({@link GLOBAL_ERRORS.PASSWORD_EMPTY})
 * @throws ({@link BasaltError}) - Throws an error if the password verification fails. ({@link GLOBAL_ERRORS.PASSWORD_VERIFICATION_FAILED})
 *
 * @returns A promise that resolves with a boolean indicating if the password is correct.
 */
export function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password)
        throw new BasaltError({
            key: GLOBAL_ERRORS.PASSWORD_EMPTY
        });
    try {
        return verify(hashedPassword, password);
    } catch {
        throw new BasaltError({
            key: GLOBAL_ERRORS.PASSWORD_VERIFICATION_FAILED
        });
    }
}