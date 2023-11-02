import { BasaltDataFilter } from '@/Abstract';

/**
 * Class for filtering data by including only specified keys.
 * @extends BasaltDataFilter
 * @template T - The type of the data to be filtered.
 */
export class BasaltKeyFilter<T extends object> extends BasaltDataFilter<T> {
    /**
     * Constructs a new key filter with specified keys to include.
     * @param {(keyof T)[]} _keys - An array of keys to include in the filter.
     */
    constructor(private _keys: (keyof T)[]) {
        super();
        super.validateKeys(_keys);
        if (_keys.length === 0)
            throw new Error('The provided array of keys to include is empty.');
    }

    /**
     * Filters the provided data by including only the specified keys.
     * @param {T} data - The data to be filtered.
     * @param {boolean} excludeNullUndefined - Flag to determine if null or undefined values should be excluded.
     * @returns {T} - The filtered data.
     */
    public filter(data: T, excludeNullUndefined: boolean): T {
        super.validateData(data);
        const filteredData: T = {} as T;
        this._keys.forEach((key: keyof T): void => {
            if (key in data && (!excludeNullUndefined || (data[key] !== null && data[key] !== undefined)))
                filteredData[key] = data[key];
        });
        return filteredData;
    }
}
