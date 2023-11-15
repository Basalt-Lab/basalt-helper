/**
 * Utility class for deep cloning objects.
 */
export class BasaltDeepCloneUtility {

    /**
     * Creates a deep clone of the provided data object.
     * @template T - The type of the data to be cloned.
     * @param {T} data - The data object to be cloned.
     * @returns {T} - The deep cloned object.
     * @throws {Error} If the data is null or undefined.
     */
    public static deepClone<T>(data: T): T {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');
        if (data instanceof Date)
            return new Date(data.getTime()) as T;
        if (data instanceof RegExp)
            return new RegExp(data) as T;
        if (data instanceof Array)
            return data.map(item => this.deepClone(item)) as T;
        if (typeof data === 'object') {
            const clonedObject: Partial<T> = {} as Partial<T>;
            for (const key in data)
                if (Object.hasOwnProperty.call(data, key))
                    clonedObject[key as keyof T] = this.deepClone(data[key]);
            return clonedObject as T;
        }
        return data as T;
    }
}
