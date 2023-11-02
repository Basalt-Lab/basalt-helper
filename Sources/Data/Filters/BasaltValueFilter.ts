import { BasaltDataFilter } from '@/Abstract';

/**
 * Class for filtering data based on value criteria defined by a predicate function.
 * @extends BasaltDataFilter
 * @template T - The type of the data to be filtered.
 */
export class BasaltValueFilter<T extends object> extends BasaltDataFilter<T> {
    /**
     * Constructs a new value filter with a predicate to apply to values.
     * @param {(value: T[keyof T]) => boolean} predicate - A function that determines if a value should be included in the filtered data.
     */
    constructor(private predicate: (value: T[keyof T]) => boolean) {
        super();
    }

    /**
     * Filters the provided data based on the predicate applied to its values.
     * @param {T} data - The data to be filtered.
     * @returns {T} - The filtered data.
     */
    public filter(data: T): T {
        super.validateData(data);
        const filteredData: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            const typedKey: keyof T = key as keyof T;
            if (this.predicate(data[typedKey]))
                filteredData[typedKey] = data[typedKey];

        });
        return filteredData;
    }
}
