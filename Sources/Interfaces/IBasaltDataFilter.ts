/**
 * Interface for data filtering operations.
 * @interface
 * @template T - The type of the data to filter.
 */
export interface IBasaltDataFilter<T> {
    /**
     * Filters the data according to a specified condition.
     * @param {T} data - The data to filter.
     * @param {boolean} excludeNullUndefined - Whether to exclude null and undefined values from the result.
     * @returns {T} - The filtered data.
     */
    filter(data: T, excludeNullUndefined: boolean): T;
}
