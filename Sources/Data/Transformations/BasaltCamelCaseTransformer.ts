import { IBasaltKeyTransformer } from '@/Interfaces';

/**
 * Transforms string keys into camelCase format.
 * Implements the IBasaltKeyTransformer interface.
 */
export class BasaltCamelCaseTransformer implements IBasaltKeyTransformer {

    /**
     * Transforms a single key from any case to camelCase.
     *
     * @param {string} key - The key string to transform into camelCase.
     * @returns {string} - The key string transformed into camelCase.
     *
     * @example
     * // returns "myKeyName"
     * transformKey('MyKeyName');
     * @example
     * // returns "myKeyName"
     * transformKey('my-key-name');
     * @example
     * // returns "myKeyName"
     * transformKey('my_key_name');
     */
    public transformKey(key: string): string {
        return key
            .replace(/([-_][a-z])/gi, (group: string) => group[1].toUpperCase())
            .replace(/^[A-Z]/, (firstLetter: string) => firstLetter.toLowerCase());

    }
}
