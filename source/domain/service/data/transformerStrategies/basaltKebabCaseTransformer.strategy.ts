import type { BasaltKeyTransformer } from '#/common/types/data/index.ts';

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
     * Returns "my-key-name"
     * transformKey('myKeyName');
     * @example
     * Returns "my-key-name"
     * transformKey('MyKeyName');
     * @example
     * Returns "my-long-key-name"
     * transformKey('myLongKeyName');
     */
    public transformKey(key: string): string {
        return key
            .replace(/_/gu, '-')
            .replace(/(?<=[a-z])(?=[A-Z])/gu, '-')
            .replace(/(?<=[A-Z]+)(?=[A-Z][a-z])/gu, '-')
            .toLowerCase();
    }
}
