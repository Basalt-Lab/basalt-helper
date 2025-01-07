import { BasaltError } from '#/error/basaltError';
import { CORE_DATA_KEY_ERROR } from '#/error/key/coreDataKeyError';
import type { BasaltKeyTransformer } from '#/types/data/basaltKeyTransformer';

/**
 * Checks if the provided data is null or undefined and throws an error if it is.
 *
 * @typeParam T - The type of the data to be validated.
 *
 * @param data - The data to be validated.
 *
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link CORE_DATA_KEY_ERROR}.DATA_IS_NULL)
 */
function _validateDataNull<T>(data: T): void {
    if (data === null || data === undefined)
        throw new BasaltError({
            key: CORE_DATA_KEY_ERROR.DATA_IS_NULL
        });
}

/**
 * Checks if the provided data is an object and throws an error if it is not.
 *
 * @typeParam T - The type of the data to be validated.
 *
 * @param data - The data to be validated.
 *
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link CORE_DATA_KEY_ERROR}.DATA_MUST_BE_OBJECT)
 */
function _validateDataIsObject<T>(data: T): void {
    if (typeof data !== 'object')
        throw new BasaltError({
            key: CORE_DATA_KEY_ERROR.DATA_MUST_BE_OBJECT
        });
}

/**
 * Filters the provided data by excluding the specified keys. This method will create
 * a new object that contains all properties from the original data object except for
 * those keys that are provided to be excluded. Additionally, it can also exclude
 * properties with values of null or undefined if 'excludeNullUndefined' is set to true.
 *
 * @typeParam T - The type of the data object to filter, must be an object.
 *
 * @param data - The data object to be filtered.
 * @param keys - The array of keys to exclude from the data object. (Can be empty)
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded.
 *
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link CORE_DATA_KEY_ERROR}.DATA_IS_NULL)
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link CORE_DATA_KEY_ERROR}.DATA_MUST_BE_OBJECT)
 *
 * @example
 * ```typescript
 * const object = { test: 'test', exclude: 'exclude' };
 * const filtered = filterByKeyExclusion(object, ['exclude']);
 * console.log(filtered); // { test: 'test' }
 * ```
 *
 * @example
 * ```typescript
 * const object = { test: 'test', exclude: null };
 * const filtered = filterByKeyExclusion(object, [], true);
 * console.log(filtered); // { test: 'test' }
 * ```
 *
 * @returns The filtered data object with the specified keys excluded. ({@link T})
 */
export function filterByKeyExclusion<T extends Readonly<object>>(data: Readonly<T>, keys: readonly (keyof T)[], excludeNullUndefined = false): T {
    _validateDataNull(data);
    _validateDataIsObject(data);
    const filteredData: T = {} as T;
    Object.keys(data).forEach((key: string): void => {
        const typedKey: keyof T = key as keyof T;
        if (!keys.includes(typedKey) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
            filteredData[typedKey] = data[typedKey];
    });
    return filteredData;
}

/**
 * Filters the provided data by including only the specified keys. The resulting object
 * will only have properties that match the keys provided. Properties with null or undefined
 * values can optionally be excluded based on the 'excludeNullUndefined' flag.
 * @typeParam T - The type of the data object to filter, must be an object.
 *
 * @param data - The data object to be filtered.
 * @param keys - The array of keys to include in the resulting data object. (Can be empty)
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded.
 *
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link CORE_DATA_KEY_ERROR}.DATA_IS_NULL)
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link CORE_DATA_KEY_ERROR}.DATA_MUST_BE_OBJECT)
 *
 * @example
 * ```typescript
 * const object = { test: 'test', exclude: 'exclude' };
 * const filtered = filterByKeyInclusion(object, ['test']);
 * console.log(filtered); // { test: 'test' }
 * ```
 *
 * @example
 * ```typescript
 * const object = { test: 'test', exclude: null };
 * const filtered = filterByKeyInclusion(object, ['test'], true);
 * console.log(filtered); // { test: 'test' }
 * ```
 *
 * @returns The filtered data object with only the specified keys included. ({@link T})
 */
export function filterByKeyInclusion<T extends Readonly<object>>(data: Readonly<T>, keys: readonly (keyof T)[], excludeNullUndefined = false): T {
    _validateDataNull(data);
    _validateDataIsObject(data);
    const filteredData: T = {} as T;
    keys.forEach((key: keyof T): void => {
        if (key in data && (!excludeNullUndefined || (data[key] !== null && data[key] !== undefined)))
            filteredData[key] = data[key];
    });
    return filteredData;
}

/**
 * Filters the provided data based on a predicate applied to its values. The resulting object
 * will only include properties whose values satisfy the predicate function. Properties with
 * null or undefined values can be optionally excluded based on the 'excludeNullUndefined' flag.
 * @typeParam T - The type of the data to be filtered, constrained to an object type.
 *
 * @param data - The data object to be filtered.
 * @param predicate - The predicate function to apply to the values.
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded. Default is false.
 *
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link CORE_DATA_KEY_ERROR}.DATA_IS_NULL)
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link CORE_DATA_KEY_ERROR}.DATA_MUST_BE_OBJECT)
 *
 * @example
 * ```typescript
 * const object = { test: 'test', exclude: 'exclude' };
 * const filtered = filterByValue(object, (value: unknown): boolean => value === 'test');
 * console.log(filtered); // { test: 'test' }
 * ```
 *
 * @example
 * ```typescript
 * const object = { test: 'test', exclude: null };
 * const filtered = filterByValue(object, (value: unknown): boolean => value === 'test', true);
 * console.log(filtered); // { test: 'test' }
 * ```
 *
 * @returns The filtered data object with properties satisfying the predicate. ({@link T})
 */
export function filterByValue<T extends Readonly<object>> (data: Readonly<T>, predicate: (value: T[keyof T]) => boolean, excludeNullUndefined = false): T {
    _validateDataNull(data);
    _validateDataIsObject(data);
    const filteredData: T = {} as T;
    for (const key in data)
        if (Object.hasOwn(data, key)) {
            const typedKey: keyof T = key as keyof T;
            if (predicate(data[typedKey]) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
                filteredData[typedKey] = data[typedKey];
        }
    return filteredData;
}

/**
 * Transforms the keys of the given object using the current transformation strategy.
 * @typeParam T - The type of the object.
 * @param data - The object whose keys are to be transformed.
 * @param transformer - The key transformation strategy to use.
 *
 * @throws ({@link BasaltError}) - If the provided data object is null or undefined. ({@link CORE_DATA_KEY_ERROR}.DATA_IS_NULL)
 * @throws ({@link BasaltError}) - If the provided data object is not a plain object. ({@link CORE_DATA_KEY_ERROR}.DATA_MUST_BE_OBJECT)
*
 * @example
 * ```typescript
 * // Return { myKey: "value" }
 * transformKeys(\{ "my-key": "value" \}, new BasaltCamelCaseTransformer());
 * ```
 *
 * @returns A new object with transformed keys. ({@link T})
 */
export function transformKeys<T extends Readonly<object>>(data: Readonly<T>, transformer: Readonly<BasaltKeyTransformer>): T {
    _validateDataNull(data);
    _validateDataIsObject(data);
    const result: T = {} as T;

    for (const key in data)
        if (Object.hasOwn(data, key)) {
            const transformedKey: string = transformer.transformKey(key);
            result[transformedKey as keyof T] = data[key as keyof T];
        }
    return result;
}