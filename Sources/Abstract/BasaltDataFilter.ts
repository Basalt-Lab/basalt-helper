/**
 * Abstract base class for data filtering that includes basic validations.
 * @abstract
 * @class
 */
export abstract class BasaltDataFilter {

    /**
     * Validates that the data is not null or undefined and is an object.
     * This method is generic and will be used in subclasses to ensure that
     * the provided data meets the basic requirements for filtering operations.
     * @template T - The type of the data to validate, must be an object.
     * @param {T} data - The data to validate.
     * @throws {Error} If the data is null, undefined, or not an object.
     */
    protected validateData<T extends object> (data: T): void {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');
        if (typeof data !== 'object')
            throw new Error('The provided data object must be an object.');
    }

    /**
     * Validates that the keys are an array and that each key is a valid property key of T.
     * This method is generic and should be used in subclasses to validate that
     * the provided keys array contains keys that are actually properties of the data object.
     * @template T - The type of the object keys to validate.
     * @param {(keyof T)[]} keys - The keys to validate as an array.
     * @throws {Error} If keys are not an array.
     */
    protected validateKeys<T extends object> (keys: (keyof T)[]): void {
        if (typeof keys !== 'object' || !Array.isArray(keys))
            throw new Error('The provided keys must be an array.');
    }
}
