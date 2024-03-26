import { ErrorBasaltData, BasaltDataErrorCodes } from '@/Common/Errors';

/**
 * Filters the provided data based on a predicate applied to its values. The resulting object
 * will only include properties whose values satisfy the predicate function. Properties with
 * null or undefined values can be optionally excluded based on the 'excludeNullUndefined' flag.
 * @typeParam T - The type of the data to be filtered, constrained to an object type.
 * @param data - The data object to be filtered.
 * @param predicate - The predicate function to apply to the values.
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded. Default is false.
 * @returns The filtered data object with properties satisfying the predicate.
 * @throws {@link ErrorBasaltData} - Throws an error if the data is null or undefined. {@link BasaltDataErrorCodes.BASALT_DATA_NULL}
 * @throws {@link ErrorBasaltData} - Throws an error if the data is not a plain object. {@link BasaltDataErrorCodes.BASALT_DATA_MUST_BE_PLAIN_OBJECT}
 */
function filterByValue<T extends Readonly<object>> (data: Readonly<T>, predicate: (value: T[keyof T]) => boolean, excludeNullUndefined: boolean = false): T {
    if (data === null || data === undefined)
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_NULL);
    if (typeof data !== 'object')
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_MUST_BE_PLAIN_OBJECT);

    const filteredData: T = {} as T;
    for (const key in data)
        if (Object.hasOwn(data, key)) {
            const typedKey: keyof T = key as keyof T;
            if (predicate(data[typedKey]) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
                filteredData[typedKey] = data[typedKey];
        }
    return filteredData;
}

export {
    filterByValue
};