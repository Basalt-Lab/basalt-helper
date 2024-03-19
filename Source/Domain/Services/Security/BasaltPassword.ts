import { hash, verify, argon2id } from 'argon2';
import { availableParallelism } from 'os';

import { ErrorBasaltSecurity, BasaltSecurityErrorCodes } from '@/Common/Errors';

/**
 * Hashes a password using Argon2id algorithm with optimal parallelism for the system.
 * @param password - The plain text password to hash.
 * @returns A promise that resolves with the hashed password.
 * @throws {@link ErrorBasaltSecurity} - Throws an error if the password is empty or if hashing fails.
 */
function hashPassword(password: string): Promise<string> {
    if (password === '')
        return Promise.reject(new ErrorBasaltSecurity(BasaltSecurityErrorCodes.BASALT_PASSWORD_EMPTY));
    try {
        return hash(password, {
            parallelism: availableParallelism(),
            saltLength: 32,
            type: argon2id,
        });
    } catch (error) {
        return Promise.reject(new ErrorBasaltSecurity(BasaltSecurityErrorCodes.BASALT_PASSWORD_HASHING_FAILED));
    }
}


/**
 * Verifies a password against a given hash using Argon2id algorithm with optimal parallelism for the system.
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to verify against.
 * @returns A promise that resolves with a boolean indicating if the password is correct.
 * @throws {@link Error} - Throws an error if the password is empty or if verification fails.
 */
function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (password === '')
        return Promise.reject(new ErrorBasaltSecurity(BasaltSecurityErrorCodes.BASALT_PASSWORD_EMPTY));
    try {
        return verify(
            hashedPassword,
            password, {
                parallelism: availableParallelism(),
                saltLength: 32,
                type: argon2id,
            }
        );
    } catch (error) {
        return Promise.reject(new ErrorBasaltSecurity(BasaltSecurityErrorCodes.BASALT_PASSWORD_VERIFICATION_FAILED));
    }
}

export {
    hashPassword,
    verifyPassword,
};