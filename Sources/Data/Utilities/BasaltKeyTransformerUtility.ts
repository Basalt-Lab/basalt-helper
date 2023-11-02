import { IBasaltKeyTransformer } from '@/Interfaces';

/**
 * Utility class for transforming keys of an object based on a specified key transformation strategy.
 */
export class BasaltKeyTransformerUtility {
    private _transformer: IBasaltKeyTransformer;

    /**
     * Constructs a new instance of the BasaltKeyTransformerUtility with a given transformer.
     * @param {IBasaltKeyTransformer} transformer - An instance of a class that implements the IBasaltKeyTransformer interface.
     */
    constructor(transformer: IBasaltKeyTransformer) {
        this._transformer = transformer;
    }

    /**
     * Sets a new transformer strategy for key transformation.
     * @param {IBasaltKeyTransformer} transformer - An instance of a class that implements the IBasaltKeyTransformer interface.
     */
    public set transformer(transformer: IBasaltKeyTransformer) {
        this._transformer = transformer;
    }

    /**
     * Transforms the keys of the given object using the current transformation strategy.
     * @template T - The type of the object.
     * @param {T} data - The object whose keys are to be transformed.
     * @returns {T} - A new object with transformed keys.
     * @throws Will throw an error if the provided data object is null or undefined.
     * @throws Will throw an error if the provided data object is not a plain object.
     *
     * @example
     * // returns { myKey: "value" }
     * transformKeys({ "my-key": "value" });
     */
    public transformKeys<T extends object>(data: T): T {
        if (data === null || data === undefined)
            throw new Error('The provided data object is either null or undefined.');
        if (data.constructor !== Object)
            throw new Error('The data object must be an object.');
        const result: T = {} as T;
        Object.keys(data).forEach((key: string): void => {
            const transformedKey: string = this._transformer.transformKey(key);
            result[transformedKey as keyof T] = data[key as keyof T];
        });
        return result;
    }
}
