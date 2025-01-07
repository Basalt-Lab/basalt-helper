import { argon2id, hash, verify } from 'argon2';

import { BasaltError } from '#/error/basaltError';
import { CORE_SECURITY_KEY_ERROR } from '#/error/key/coreSecurityKeyError';

/**
 * Hashes a password using Argon2id algorithm.
 *
 * @param password - The plain text password to hash.
 *
 * @throws ({@link BasaltError}) - Throws an error if the password is empty or if hashing fails. ({@link CORE_SECURITY_KEY_ERROR}.PASSWORD_EMPTY)
 * @throws ({@link BasaltError}) - Throws an error if the password is empty or if hashing fails. ({@link CORE_SECURITY_KEY_ERROR}.PASSWORD_HASHING_FAILED)
 *
 * @returns A promise that resolves with the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    if (!password)
        return Promise.reject(new BasaltError({
            key: CORE_SECURITY_KEY_ERROR.PASSWORD_EMPTY
        }));
    try {
        return await hash(password, { type: argon2id });
    } catch {
        throw new BasaltError({
            key: CORE_SECURITY_KEY_ERROR.PASSWORD_HASHING_FAILED
        });
    }
}


/**
 * Verifies a password against a given hash using Argon2id algorithm.
 *
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to verify against.
 *
 * @throws ({@link BasaltError}) - Throws an error if the password is empty. ({@link CORE_SECURITY_KEY_ERROR}.PASSWORD_EMPTY)
 * @throws ({@link BasaltError}) - Throws an error if the password verification fails. ({@link CORE_SECURITY_KEY_ERROR}.PASSWORD_VERIFICATION_FAILED)
 *
 * @returns A promise that resolves with a boolean indicating if the password is correct.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password)
        throw new BasaltError({
            key: CORE_SECURITY_KEY_ERROR.PASSWORD_EMPTY
        });
    try {
        return await verify(hashedPassword, password);
    } catch {
        throw new BasaltError({
            key: CORE_SECURITY_KEY_ERROR.PASSWORD_VERIFICATION_FAILED
        });
    }
}