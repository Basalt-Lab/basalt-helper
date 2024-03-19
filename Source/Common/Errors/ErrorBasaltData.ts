import { ErrorEntity } from './ErrorEntity';

/**
 * Represents the error codes for the Basalt Data.
 */
export enum BasaltDataErrorCodes {
    BASALT_DATA_NULL = 'BASALT_DATA_NULL',
    BASALT_DATA_MUST_BE_PLAIN_OBJECT = 'BASALT_DATA_MUST_BE_PLAIN_OBJECT',
    BASALT_DATA_EMPTY_KEYS = 'BASALT_DATA_EMPTY_KEYS'
}

/**
 * Represents an error that occurs during the Basalt Data Service.
 */
export class ErrorBasaltData extends ErrorEntity {}