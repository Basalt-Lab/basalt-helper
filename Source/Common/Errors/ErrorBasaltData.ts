import { ErrorEntity } from './ErrorEntity';

/**
 * Represents the error codes for the Basalt Data.
 */
export enum BasaltDataErrorCodes {
    /**
     * When the data is null.
     */
    DATA_NULL = 'DATA_NULL',
    /**
     * When the data is not a plain object.
     */
    DATA_MUST_BE_PLAIN_OBJECT = 'DATA_MUST_BE_PLAIN_OBJECT',
    /**
     * When the data is empty.
     */
    DATA_EMPTY_KEYS = 'DATA_EMPTY_KEYS'
}

/**
 * Represents an error that occurs during the Basalt Data Service.
 */
export class ErrorBasaltData extends ErrorEntity {}