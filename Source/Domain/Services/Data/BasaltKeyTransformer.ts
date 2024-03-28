import { type IBasaltKeyTransformer } from '@/Domain/Services/Data/Interfaces';
import { ErrorBasaltData, BasaltDataErrorCodes } from '@/Common/Errors';

/**
 * Transforms the keys of the given object using the current transformation strategy.
 * @typeParam T - The type of the object.
 * @param data - The object whose keys are to be transformed.
 * @param transformer - The key transformation strategy to use.
 * 
 * @returns A new object with transformed keys.
 * @throws {@link ErrorBasaltData} - If the provided data object is null or undefined. {@link BasaltDataErrorCodes.DATA_NULL}
 * @throws {@link ErrorBasaltData} - If the provided data object is not a plain object. {@link BasaltDataErrorCodes.DATA_MUST_BE_PLAIN_OBJECT}
 *
 * @example
 * Returns \{ myKey: "value" \}
 * transformKeys(\{ "my-key": "value" \}, new BasaltCamelCaseTransformer());
 */
function transformKeys<T extends Readonly<object>>(data: Readonly<T>, transformer: Readonly<IBasaltKeyTransformer>): T {
    if (data === null || data === undefined)
        throw new ErrorBasaltData(BasaltDataErrorCodes.DATA_NULL);
    if (typeof data !== 'object')
        throw new ErrorBasaltData(BasaltDataErrorCodes.DATA_MUST_BE_PLAIN_OBJECT);
    const result: T = {} as T;
    
    for (const key in data)
        if (Object.hasOwn(data, key)) {
            const transformedKey: string = transformer.transformKey(key);
            result[transformedKey as keyof T] = data[key as keyof T];
        }
    return result;
}

export {
    transformKeys
};
