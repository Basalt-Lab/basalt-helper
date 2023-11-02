import { BasaltDataFilter } from '@/Abstract';

/**
 * Class for filtering data by including only specified keys. It creates a new object that
 * includes properties from the original data object if and only if their keys are specified
 * in the 'keys' parameter. It allows for optional exclusion of properties with null or undefined values.
 * @extends {BasaltDataFilter}
 */
export class BasaltKeyInclusionFilter extends BasaltDataFilter {
    /**
     * Filters the provided data by including only the specified keys. The resulting object
     * will only have properties that match the keys provided. Properties with null or undefined
     * values can optionally be excluded based on the 'excludeNullUndefined' flag.
     * @template T - The type of the data object to filter, must be an object.
     * @param {T} data - The data object to be filtered.
     * @param {(keyof T)[]} keys - The array of keys to include in the resulting data object.
     * @param {boolean} [excludeNullUndefined=false] - Flag to determine if properties with null or undefined values should be excluded.
     * @returns {T} - The filtered data object with only the specified keys included.
     */
    public filter<T extends object>(data: T, keys: (keyof T)[], excludeNullUndefined: boolean = false): T {
        super.validateKeys(keys);
        if (keys.length === 0)
            throw new Error('The provided array of keys to include is empty.');
        super.validateData(data);
        const filteredData: T = {} as T;
        keys.forEach((key: keyof T): void => {
            if (key in data && (!excludeNullUndefined || (data[key] !== null && data[key] !== undefined)))
                filteredData[key] = data[key];
        });
        return filteredData;
    }
}
