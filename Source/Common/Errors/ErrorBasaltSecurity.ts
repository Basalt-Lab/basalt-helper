import { ErrorEntity } from './ErrorEntity';

/**
 * Represents the error codes for the Basalt Security.
 */
export enum BasaltSecurityErrorCodes {
    BASALT_PASSWORD_EMPTY = 'BASALT_PASSWORD_EMPTY',
    BASALT_PASSWORD_HASHING_FAILED = 'BASALT_PASSWORD_HASHING_FAILED',
    BASALT_PASSWORD_VERIFICATION_FAILED = 'BASALT_PASSWORD_VERIFICATION_FAILED',

}

/**
 * Represents an error that occurs during the Basalt Security Service.
 */
export class ErrorBasaltSecurity extends ErrorEntity {}