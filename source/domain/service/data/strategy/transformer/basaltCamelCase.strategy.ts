import type { BasaltKeyTransformer } from '#/common/type/data/basaltKeyTransformer.ts';

/**
 * Transforms string keys into camelCase format.
 * Implements ({@link BasaltKeyTransformer}).
 */
export class BasaltCamelCaseTransformer implements BasaltKeyTransformer {
    /**
     * Transforms a single key from any case to camelCase.
     *
     * @param key - The key string to transform into camelCase.
     *
     * @returns The key string transformed into camelCase.
     *
     * @example
     * transformKey('MyKeyName');
     * Returns "myKeyName"
     * @example
     * transformKey('my-key-name');
     * Returns "myKeyName"
     * @example
     * transformKey('my_key_name');
     * Returns "myKeyName"
     */
    public transformKey(key: string): string {
        return key
            .replace(/(?:[-_][a-z])/giu, (group: string) => (group[1] as string).toUpperCase())
            .replace(/^[A-Z]/u, (firstLetter: string) => firstLetter.toLowerCase());
    }
}
