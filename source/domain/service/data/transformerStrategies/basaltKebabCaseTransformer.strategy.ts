import type { BasaltKeyTransformer } from '#/common/type/data/basaltKeyTransformer.data.ts';

/**
 * Transforms string keys into kebab-case format.
 * Implements ({@link BasaltKeyTransformer}).
 */
export class BasaltKebabCaseTransformer implements BasaltKeyTransformer {
    /**
     * Transforms a single key from any case to kebab-case.
     *
     * @param key - The key string to transform into kebab-case.
     *
     * @returns The key string transformed into kebab-case, with all letters in lower case and words separated by hyphens.
     *
     * @example
     * transformKey('myKeyName');
     * Returns "my-key-name"
     * @example
     * transformKey('MyKeyName');
     * Returns "my-key-name"
     * @example
     * transformKey('my_long_key_name');
     * Returns "my-long-key-name"
     */
    public transformKey(key: string): string {
        return key
            .replace(/_/gu, '-')
            .replace(/(?<=[a-z])(?=[A-Z])/gu, '-')
            .replace(/(?<=[A-Z]+)(?=[A-Z][a-z])/gu, '-')
            .toLowerCase();
    }
}
