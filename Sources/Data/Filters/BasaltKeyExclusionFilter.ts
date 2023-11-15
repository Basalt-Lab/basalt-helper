import { BasaltDataFilter } from '@/Abstract';

/**
 * Filter that excludes specified keys from the data object.
 * This filter creates a new object with all the properties of the original
 * except for those whose keys are specified in the 'keys' parameter.
 * @class
 * @extends {BasaltDataFilter}
 */
export class BasaltKeyExclusionFilter extends BasaltDataFilter {
    /**
     * Filters the provided data by excluding the specified keys. This method will create
     * a new object that contains all properties from the original data object except for
     * those keys that are provided to be excluded. Additionally, it can also exclude
     * properties with values of null or undefined if 'excludeNullUndefined' is set to true.
     * @template T - The type of the data object to filter, must be an object.
     * @param {T} data - The data object to be filtered.
     * @param {(keyof T)[]} keys - The array of keys to exclude from the data object.
     * @param {boolean} [excludeNullUndefined=false] - Flag to determine if properties with null or undefined values should be excluded.
     * @returns {T} - The filtered data object with the specified keys excluded.
     */
    public filter<T extends object>(data: T, keys: (keyof T)[], excludeNullUndefined: boolean = false): T {
        super.validateKeys(keys);
        if (keys.length === 0)
            throw new Error('The provided array of keys to exclude is empty.');
        super.validateData(data);
        const filteredData: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            const typedKey: keyof T = key as keyof T;
            if (!keys.includes(typedKey) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
                filteredData[typedKey] = data[typedKey];
        });
        return filteredData;
    }
}
