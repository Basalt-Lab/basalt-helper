import { IBasaltKeyTransformer } from '@/Interfaces';

export class BasaltKeyTransformerUtility {
    private _transformer: IBasaltKeyTransformer;

    constructor(transformer: IBasaltKeyTransformer) {
        this._transformer = transformer;
    }

    public set transformer(transformer: IBasaltKeyTransformer) {
        this._transformer = transformer;
    }

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
