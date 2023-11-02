import { IBasaltKeyTransformer } from '@/Interfaces';

/**
 * Transforms string keys into PascalCase format.
 * Implements the IBasaltKeyTransformer interface for key transformation.
 */
export class BasaltPascalCaseTransformer implements IBasaltKeyTransformer {

    /**
     * Transforms a single key from any case to PascalCase.
     *
     * @param {string} key - The key string to transform into PascalCase.
     * @returns {string} - The key string transformed into PascalCase, with the first letter of each word capitalized.
     *
     * @example
     * // returns "MyKeyName"
     * transformKey('my_key_name');
     * @example
     * // returns "MyKeyName"
     * transformKey('my-key-name');
     * @example
     * // returns "MyLongKeyName"
     * transformKey('myLongKeyName');
     */
    public transformKey(key: string): string {
        const camelCaseKey: string = key.replace(/([-_][a-z])/gi, (group: string) =>
            group[1].toUpperCase()
        );
        return camelCaseKey.charAt(0).toUpperCase() + camelCaseKey.slice(1);
    }
}
