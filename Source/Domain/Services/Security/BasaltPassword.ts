import { hash, verify, argon2id } from 'argon2';

import { ErrorBasaltSecurity, BasaltSecurityErrorCodes } from '@/Common/Errors';

/**
 * Hashes a password using Argon2id algorithm.
 * @param password - The plain text password to hash.
 * @returns A promise that resolves with the hashed password.
 * @throws {@link ErrorBasaltSecurity} - Throws an error if the password is empty or if hashing fails. {@link BasaltSecurityErrorCodes.PASSWORD_EMPTY}
 * @throws {@link ErrorBasaltSecurity} - Throws an error if the password is empty or if hashing fails. {@link BasaltSecurityErrorCodes.PASSWORD_HASHING_FAILED}
 */
function hashPassword(password: string): Promise<string> {
    if (password === '')
        return Promise.reject(new ErrorBasaltSecurity(BasaltSecurityErrorCodes.PASSWORD_EMPTY));
    try {
        return hash(password, { type: argon2id });
    } catch (error) {
        throw new ErrorBasaltSecurity(BasaltSecurityErrorCodes.PASSWORD_HASHING_FAILED);
    }
}


/**
 * Verifies a password against a given hash using Argon2id algorithm.
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to verify against.
 * @returns A promise that resolves with a boolean indicating if the password is correct.
 * @throws {@link ErrorBasaltSecurity} - Throws an error if the password is empty. {@link BasaltSecurityErrorCodes.PASSWORD_EMPTY}
 * @throws {@link ErrorBasaltSecurity} - Throws an error if the password verification fails. {@link BasaltSecurityErrorCodes.PASSWORD_VERIFICATION_FAILED}
 */
function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (password === '')
        throw new ErrorBasaltSecurity(BasaltSecurityErrorCodes.PASSWORD_EMPTY);
    try {
        return verify(hashedPassword, password);
    } catch (error) {
        throw new ErrorBasaltSecurity(BasaltSecurityErrorCodes.PASSWORD_VERIFICATION_FAILED);
    }
}

export {
    hashPassword,
    verifyPassword,
};