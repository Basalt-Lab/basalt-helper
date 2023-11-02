import { BasaltDataFilter } from '@/Abstract';

/**
 * Filter that excludes specified keys from the data object.
 * @class
 * @extends BasaltDataFilter
 * @template T - The type of the data object.
 */
export class BasaltExclusionFilter<T extends object> extends BasaltDataFilter<T> {
    /**
     * Constructs a new exclusion filter with specified keys to exclude.
     * @param {(keyof T)[]} _keysToExclude - An array of keys to exclude from the filter.
     */
    constructor(private _keysToExclude: (keyof T)[]) {
        super();
        super.validateKeys(_keysToExclude);
        if (_keysToExclude.length === 0)
            throw new Error('The provided array of keys to exclude is empty.');
    }

    /**
     * Filters the provided data by excluding the specified keys.
     * @param {T} data - The data to be filtered.
     * @param {boolean} excludeNullUndefined - Flag to determine if null or undefined values should be excluded.
     * @returns {T} - The filtered data.
     */
    public filter(data: T, excludeNullUndefined: boolean): T {
        super.validateData(data);
        const filteredData: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            const typedKey: keyof T = key as keyof T;
            if (!this._keysToExclude.includes(typedKey) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
                filteredData[typedKey] = data[typedKey];
        });
        return filteredData;
    }
}
