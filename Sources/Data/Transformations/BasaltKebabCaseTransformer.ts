import { IBasaltKeyTransformer } from '@/Interfaces';

/**
 * Transforms string keys into kebab-case format.
 * Implements the IBasaltKeyTransformer interface for key transformation.
 */
export class BasaltKebabCaseTransformer implements IBasaltKeyTransformer {

    /**
     * Transforms a single key from any case to kebab-case.
     *
     * @param {string} key - The key string to transform into kebab-case.
     * @returns {string} - The key string transformed into kebab-case, with all letters in lower case and words separated by hyphens.
     *
     * @example
     * // returns "my-key-name"
     * transformKey('myKeyName');
     * @example
     * // returns "my-key-name"
     * transformKey('MyKeyName');
     * @example
     * // returns "my-long-key-name"
     * transformKey('myLongKeyName');
     */
    public transformKey(key: string): string {
        return key
            .replace(/_/g, '-')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .toLowerCase();
    }
}
