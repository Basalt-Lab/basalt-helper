import { BasaltDataFilter } from '@/Abstract';

/**
 * Class for filtering data based on value criteria defined by a predicate function.
 * Evaluates each value in the data object against the provided predicate and includes
 * the property in the resulting object if the predicate returns true. This filter also
 * allows for the optional exclusion of properties with null or undefined values.
 * @extends {BasaltDataFilter}
 */
export class BasaltValueFilter extends BasaltDataFilter {
    /**
     * Filters the provided data based on a predicate applied to its values. The resulting object
     * will only include properties whose values satisfy the predicate function. Properties with
     * null or undefined values can be optionally excluded based on the 'excludeNullUndefined' flag.
     * @template T The type of the data to be filtered, constrained to an object type.
     * @param {T} data The data object to be filtered.
     * @param {(value: T[keyof T]) => boolean} predicate The predicate function to apply to the values.
     * @param {boolean} [excludeNullUndefined=false] Flag to determine if properties with null or undefined values should be excluded.
     * @returns {T} The filtered data object with properties satisfying the predicate.
     */
    public filter<T extends object> (data: T, predicate: (value: T[keyof T]) => boolean, excludeNullUndefined: boolean = false): T {
        super.validateData(data);
        const filteredData: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            const typedKey: keyof T = key as keyof T;
            if (predicate(data[typedKey]) && (!excludeNullUndefined || (data[typedKey] !== null && data[typedKey] !== undefined)))
                filteredData[typedKey] = data[typedKey];
        });
        return filteredData;
    }
}
