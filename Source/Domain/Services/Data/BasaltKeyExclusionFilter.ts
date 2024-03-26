import { ErrorBasaltData, BasaltDataErrorCodes } from '@/Common/Errors';

/**
 * Filters the provided data by excluding the specified keys. This method will create
 * a new object that contains all properties from the original data object except for
 * those keys that are provided to be excluded. Additionally, it can also exclude
 * properties with values of null or undefined if 'excludeNullUndefined' is set to true.
 * @typeParam T - The type of the data object to filter, must be an object.
 * @param data - The data object to be filtered.
 * @param keys - The array of keys to exclude from the data object.
 * @param excludeNullUndefined - Flag to determine if properties with null or undefined values should be excluded.
 * @returns The filtered data object with the specified keys excluded.
 * @throws {@link ErrorBasaltData} - Throws an error if the data is null or undefined. {@link BasaltDataErrorCodes.BASALT_DATA_NULL}
 * @throws {@link ErrorBasaltData} - Throws an error if the data is not a plain object. {@link BasaltDataErrorCodes.BASALT_DATA_MUST_BE_PLAIN_OBJECT}
 * @throws {@link ErrorBasaltData} - Throws an error if the keys array is empty. {@link BasaltDataErrorCodes.BASALT_DATA_EMPTY_KEYS}
 */
function filterByKeyExclusion<T extends Readonly<object>>(data: Readonly<T>, keys: Readonly<(keyof T)[]>, excludeNullUndefined: boolean = false): T {
    if (data === null || data === undefined)
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_NULL);
    if (typeof data !== 'object')
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_MUST_BE_PLAIN_OBJECT);
    if (!keys || keys.length === 0)
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_EMPTY_KEYS);
    const filteredData: T = {} as T;
    Object.keys(data).forEach((key: string): void => {
        const typedKey: keyof T = key as keyof T;
        if (!keys.includes(typedKey) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
            filteredData[typedKey] = data[typedKey];
    });
    return filteredData;
}

export {
    filterByKeyExclusion
};