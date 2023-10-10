export interface FilterOptions {
    excludeNullUndefined?: boolean;
}

export class DataFilter {
    /**
     * Filters the data by the specified keys.
     *
     * @param data The data object to filter.
     * @param keys The keys to include in the filtered result.
     * @param options Optional filtering options.
     * @throws Error : An error if the data object is null or undefined.
     * @throws Error : An error if the data object is not an object.
     * @throws Error : An error if the keys are not an array.
     * @throws Error : An error if the options are not an object.
     * @returns The filtered data object.
     */
    public static filterByKeys<T extends object>(
        data: T,
        keys: (keyof T)[],
        options?: FilterOptions
    ): T {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');

        if (data.constructor !== Object)
            throw new Error('The provided data object must be an object.');

        if (typeof keys !== 'object' || !Array.isArray(keys))
            throw new Error('The provided keys must be an array.');

        if (typeof options !== 'undefined' && typeof options !== 'object')
            throw new Error('The provided options must be an object.');

        const filteredData: T = {} as T;
        keys.forEach((key: keyof T): void => {
            if (key in data && (!options?.excludeNullUndefined || (data[key] !== null && data[key] !== undefined)))
                filteredData[key] = data[key];
        });
        return filteredData;
    }

    /**
     * Excludes the specified keys from the data.
     * @param data The data object to filter.
     * @param keysToExclude The keys to exclude from the filtered result.
     * @throws Error : An error if the data object is null or undefined.
     * @throws Error : An error if the data object is not an object.
     * @throws Error : An error if the keys are not an array.
     * @returns The filtered data object.
     */
    public static excludeByKeys<T extends object>(data: T, keysToExclude: (keyof T)[]): T {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');
        if (data.constructor !== Object)
            throw new Error('The provided data object must be an object.');
        if (typeof keysToExclude !== 'object' || !Array.isArray(keysToExclude))
            throw new Error('The provided keys must be an array.');
        const result: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            if (!keysToExclude.includes(key as keyof T))
                result[key as keyof T] = data[key as keyof T];
        });
        return result;
    }

    /**
     * Transforms the keys of the data object using the specified transform function.
     * @param data The data object to transform.
     * @param transformFunction The function to use to transform the keys.
     * @private
     * @returns The transformed data object.
     */
    private static transformKeys<T extends object>(
        data: T,
        transformFunction: (key: string) => string
    ): T {
        const result: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            const transformedKey: string = transformFunction(key);
            result[transformedKey as keyof T] = data[key as keyof T];
        });
        return result;
    }

    /**
     * Transforms the specified key to camel case.
     * @param key The key to transform.
     * @private
     * @returns The transformed key.
     */
    private static toCamelCase(key: string): string {
        return key.replace(/([-_][a-z])/gi, (group: string) => group[1]!.toUpperCase());
    }

    /**
     * Transforms the specified key to pascal case.
     * @param key The key to transform.
     * @private
     * @returns The transformed key.
     */
    private static toPascalCase(key: string): string {
        const camelKey: string = DataFilter.toCamelCase(key);
        return camelKey.charAt(0).toUpperCase() + camelKey.slice(1);
    }

    /**
     * Transforms the specified key to snake case.
     * @param key The key to transform.
     * @private
     * @returns The transformed key.
     */
    private static toSnakeCase(key: string): string {
        return key
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .toLowerCase();
    }

    /**
     * Transforms the specified key to kebab case.
     * @param key The key to transform.
     * @private
     * @returns The transformed key.
     */
    private static toKebabCase(key: string): string {
        return key
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .toLowerCase();
    }

    /**
     * Transforms the keys of the data object to another case.
     * @param data The data object to transform.
     * @param caseType The case type to transform the keys to.
     * @throws Error : An error if the data object is null or undefined.
     * @throws Error : An error if the data object is not an object.
     * @throws Error : An error if the case type is invalid.
     * @returns The transformed data object.
     */
    public static transformKeyToAnotherCase<T extends object>(
        data: T,
        caseType: 'camel' | 'pascal' | 'snake' | 'kebab'
    ): T {
        if (!data)
            throw new Error('The data object is required.');
        if (data.constructor !== Object)
            throw new Error('The data object must be an object.');
        if ((!['camel', 'pascal', 'snake', 'kebab'].includes(caseType)))
            throw new Error('The case type must be one of the following: camel, pascal, snake, kebab.');
        switch (caseType) {
        case 'camel':
            return DataFilter.transformKeys(data, DataFilter.toCamelCase);
        case 'pascal':
            return DataFilter.transformKeys(data, DataFilter.toPascalCase);
        case 'snake':
            return DataFilter.transformKeys(data, DataFilter.toSnakeCase);
        case 'kebab':
            return DataFilter.transformKeys(data, DataFilter.toKebabCase);
        }
    }

    /**
     * Filters the data object by the specified value.
     * @param data The data object to filter.
     * @param callback The callback function to use to filter the data.
     * @throws Error : An error if the data object is null or undefined.
     * @throws Error : An error if the callback is not a function.
     * @returns The filtered data object.
     */
    public static filterByValue<T extends object>(
        data: T,
        callback: (value: unknown, key: keyof T) => boolean
    ): T {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');

        if (typeof callback !== 'function')
            throw new Error('The provided callback is not a function.');

        const result: T = {} as T;
        for (const key in data)
            if (callback(data[key], key))
                result[key] = data[key];
        return result;
    }

    /**
     * Deep clones the specified data object.
     * @param data The data object to clone.
     * @throws Error : An error if the data object is null or undefined.
     * @returns The cloned data object.
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
