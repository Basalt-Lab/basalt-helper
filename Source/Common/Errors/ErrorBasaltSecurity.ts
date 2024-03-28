import { ErrorEntity } from './ErrorEntity';

/**
 * Represents the error codes for the Basalt Security.
 */
export enum BasaltSecurityErrorCodes {
    /**
     * When the password is empty.
     */
    PASSWORD_EMPTY = 'PASSWORD_EMPTY',
    /**
     * When argon2id has internal error during hashing.
     */
    PASSWORD_HASHING_FAILED = 'PASSWORD_HASHING_FAILED',

    /**
     * When argon2id has internal error during password verification.
     */
    PASSWORD_VERIFICATION_FAILED = 'PASSWORD_VERIFICATION_FAILED',
}

/**
 * Represents an error that occurs during the Basalt Security Service.
 */
export class ErrorBasaltSecurity extends ErrorEntity {}