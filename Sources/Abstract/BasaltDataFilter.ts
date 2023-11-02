import { IBasaltDataFilter } from '@/Interfaces';

/**
 * Abstract base class for data filtering that includes basic validations.
 * @abstract
 * @class
 * @template T - The type of the data to filter, must be an object.
 */
export abstract class BasaltDataFilter<T extends object> implements IBasaltDataFilter<T> {
    /**
     * Abstract method to filter data. Must be implemented by subclasses.
     * @param {T} data - The data to filter.
     * @param {boolean} excludeNullUndefined - Whether to exclude null and undefined values from the result.
     * @returns {T} - The filtered data.
     */
    public abstract filter(data: T, excludeNullUndefined: boolean): T;

    /**
     * Validates that the data is not null or undefined and is an object.
     * @param {T} data - The data to validate.
     * @throws {Error} If the data is null, undefined, or not an object.
     */
    protected validateData(data: T): void {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');
        if (data.constructor !== Object)
            throw new Error('The provided data object must be an object.');
    }

    /**
     * Validates that the keys are an array.
     * @param {(keyof T)[]} keys - The keys to validate.
     * @throws {Error} If keys are not an array.
     */
    protected validateKeys(keys: (keyof T)[]): void {
        if (typeof keys !== 'object' || !Array.isArray(keys))
            throw new Error('The provided keys must be an array.');
    }
}
