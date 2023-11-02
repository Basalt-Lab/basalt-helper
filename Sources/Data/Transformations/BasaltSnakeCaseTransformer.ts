import { IBasaltKeyTransformer } from '@/Interfaces';

/**
 * Transforms string keys into snake_case format.
 * Implements the IBasaltKeyTransformer interface for key transformation.
 */
export class BasaltSnakeCaseTransformer implements IBasaltKeyTransformer {

    /**
     * Transforms a single key from any case to snake_case.
     *
     * @param {string} key - The key string to transform into snake_case.
     * @returns {string} - The key string transformed into snake_case, with underscores between words.
     *
     * @example
     * // returns "my_key_name"
     * transformKey('myKeyName');
     * @example
     * // returns "my_key_name"
     * transformKey('MyKeyName');
     * @example
     * // returns "my_key_name"
     * transformKey('My-Key-Name');
     * @example
     * // returns "my_key_name"
     * transformKey('my key name');
     */
    public transformKey(key: string): string {
        return key
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[-\s]/g, '_')
            .toLowerCase();
    }
}
