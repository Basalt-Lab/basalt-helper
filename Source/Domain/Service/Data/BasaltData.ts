import { BasaltError, ErrorKeys } from '@/Common/Error/index.js';
import type { IBasaltKeyTransformer } from '@/Domain/Service/Data/Interface/index.js';

/**
 * Creates a deep clone of the provided data object.
 * 
 * @typeParam T - The type of the data to be cloned.
 * 
 * @param data - The data object to be cloned.
 * 
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link ErrorKeys.DATA_IS_NULL})
 * 
 * @returns The deep cloned object. ({@link T})
 */
export function deepClone<T>(data: T): T {
    if (data === null || data === undefined)
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_IS_NULL
        });
    if (data instanceof Date)
        return new Date(data.getTime()) as T;
    if (data instanceof RegExp)
        return new RegExp(data) as T;
    if (Array.isArray(data))
        return data.map((item: unknown) => deepClone(item)) as T;
    if (typeof data === 'object') {
        const clonedObject: Partial<T> = {} as Partial<T>;
        for (const key in data)
            if (Object.hasOwn(data, key))
                clonedObject[key as keyof T] = deepClone(data[key]) as T[keyof T];
        return clonedObject as T;
    }
    return data as T;
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
 * @param keys - The array of keys to exclude from the data object.
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded.
 * 
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link ErrorKeys.DATA_IS_NULL})
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT})
 * @throws ({@link BasaltError}) - Throws an error if the keys array is empty. ({@link ErrorKeys.ARRAY_KEYS_EMPTY})
 * 
 * @returns The filtered data object with the specified keys excluded. ({@link T})
 */
export function filterByKeyExclusion<T extends Readonly<object>>(data: Readonly<T>, keys: Readonly<Array<keyof T>>, excludeNullUndefined: boolean = false): T {
    if (data === null || data === undefined)
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_IS_NULL
        });
    if (typeof data !== 'object')
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT
        });
    if (!keys || keys.length === 0)
        throw new BasaltError({
            messageKey: ErrorKeys.ARRAY_KEYS_EMPTY
        });
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
 * @param keys - The array of keys to include in the resulting data object.
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded.
 * 
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link ErrorKeys.DATA_IS_NULL})
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT})
 * @throws ({@link BasaltError}) - Throws an error if the keys array is empty. ({@link ErrorKeys.ARRAY_KEYS_EMPTY})
 * 
 * @returns The filtered data object with only the specified keys included. ({@link T})
 */
export function filterByKeyInclusion<T extends Readonly<object>>(data: Readonly<T>, keys: Readonly<Array<keyof T>>, excludeNullUndefined: boolean = false): T {
    if (data === null || data === undefined)
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_IS_NULL
        });
    if (typeof data !== 'object')
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT
        });
    if (!keys || keys.length === 0)
        throw new BasaltError({
            messageKey: ErrorKeys.ARRAY_KEYS_EMPTY
        });
    const filteredData: T = {} as T;
    keys.forEach((key: keyof T): void => {
        if (key in data && (!excludeNullUndefined || (data[key] !== null && data[key] !== undefined)))
            filteredData[key] = data[key];
    });
    return filteredData;
}

/**
 * Transforms the keys of the given object using the current transformation strategy.
 * @typeParam T - The type of the object.
 * @param data - The object whose keys are to be transformed.
 * @param transformer - The key transformation strategy to use.
 * 
 * @throws ({@link BasaltError}) - If the provided data object is null or undefined. ({@link ErrorKeys.DATA_IS_NULL})
 * @throws ({@link BasaltError}) - If the provided data object is not a plain object. ({@link ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT})
 * 
 * @returns A new object with transformed keys. ({@link T})
 *
 * @example
 * Returns \{ myKey: "value" \}
 * transformKeys(\{ "my-key": "value" \}, new BasaltCamelCaseTransformer());
 */
export function transformKeys<T extends Readonly<object>>(data: Readonly<T>, transformer: Readonly<IBasaltKeyTransformer>): T {
    if (data === null || data === undefined)
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_IS_NULL
        });
    if (typeof data !== 'object')
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT
        });
    const result: T = {} as T;
    
    for (const key in data)
        if (Object.hasOwn(data, key)) {
            const transformedKey: string = transformer.transformKey(key);
            result[transformedKey as keyof T] = data[key as keyof T];
        }
    return result;
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
 * @throws ({@link BasaltError}) - Throws an error if the data is null or undefined. ({@link ErrorKeys.DATA_IS_NULL})
 * @throws ({@link BasaltError}) - Throws an error if the data is not a plain object. ({@link ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT})
 * 
 * @returns The filtered data object with properties satisfying the predicate. ({@link T})
 */
export function filterByValue<T extends Readonly<object>> (data: Readonly<T>, predicate: (value: T[keyof T]) => boolean, excludeNullUndefined: boolean = false): T {
    if (data === null || data === undefined)
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_IS_NULL
        });
    if (typeof data !== 'object')
        throw new BasaltError({
            messageKey: ErrorKeys.DATA_MUST_BE_PLAIN_OBJECT
        });

    const filteredData: T = {} as T;
    for (const key in data)
        if (Object.hasOwn(data, key)) {
            const typedKey: keyof T = key as keyof T;
            if (predicate(data[typedKey]) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
                filteredData[typedKey] = data[typedKey];
        }
    return filteredData;
}