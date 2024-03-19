import { ErrorBasaltData, BasaltDataErrorCodes } from '@/Common/Errors';

/**
 * Filters the provided data by including only the specified keys. The resulting object
 * will only have properties that match the keys provided. Properties with null or undefined
 * values can optionally be excluded based on the 'excludeNullUndefined' flag.
 * @typeParam T - The type of the data object to filter, must be an object.
 * @param data - The data object to be filtered.
 * @param keys - The array of keys to include in the resulting data object.
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded.
 * @returns The filtered data object with only the specified keys included.
 */
function filterByKeyInclusion<T extends Readonly<object>>(data: Readonly<T>, keys: Readonly<(keyof T)[]>, excludeNullUndefined: boolean = false): T {
    if (data === null || data === undefined)
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_NULL);
    if (typeof data !== 'object')
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_MUST_BE_PLAIN_OBJECT);
    if (!keys || keys.length === 0)
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_EMPTY_KEYS);
    const filteredData: T = {} as T;
    keys.forEach((key: keyof T): void => {
        if (key in data && (!excludeNullUndefined || (data[key] !== null && data[key] !== undefined)))
            filteredData[key] = data[key];
    });
    return filteredData;
}

export {
    filterByKeyInclusion
};
