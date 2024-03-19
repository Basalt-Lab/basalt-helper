import { ErrorBasaltData, BasaltDataErrorCodes } from '@/Common/Errors';

/**
 * Creates a deep clone of the provided data object.
 * @typeParam T - The type of the data to be cloned.
 * @param data - The data object to be cloned.
 * @returns The deep cloned object.
 * @throws {@link Error} If the data is null or undefined.
 */
function deepClone<T>(data: T): T {
    if (data === null || data === undefined)
        throw new ErrorBasaltData(BasaltDataErrorCodes.BASALT_DATA_NULL);
    if (data instanceof Date)
        return new Date(data.getTime()) as T;
    if (data instanceof RegExp)
        return new RegExp(data) as T;
    if (Array.isArray(data))
        return data.map((item: unknown) => deepClone(item)) as T;
    if (typeof data === 'object') {
        const clonedObject: Partial<T> = {} as Partial<T>;
        for (const key in data)
            if (Object.hasOwn(data, key))
                clonedObject[key as keyof T] = deepClone(data[key]) as T[keyof T];
        return clonedObject as T;
    }
    return data as T;
}

export {
    deepClone,
};
