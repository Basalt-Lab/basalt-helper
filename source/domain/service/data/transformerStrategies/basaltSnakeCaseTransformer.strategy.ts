import type { BasaltKeyTransformer } from '#/common/types/data/index.ts';

/**
 * Transforms string keys into snake_case format.
 * Implements ({@link BasaltKeyTransformer}).
 */
export class BasaltSnakeCaseTransformer implements BasaltKeyTransformer {

    /**
     * Transforms a single key from any case to snake_case.
     *
     * @param key - The key string to transform into snake_case.
     *
     * @returns The key string transformed into snake_case, with underscores between words.
     *
     * @example
     * Returns "my_key_name"
     * transformKey('myKeyName');
     * @example
     * Returns "my_key_name"
     * transformKey('MyKeyName');
     * @example
     * Returns "my_key_name"
     * transformKey('My-Key-Name');
     * @example
     * Returns "my_key_name"
     * transformKey('my key name');
     */
    public transformKey(key: string): string {
        return key
            .replace(/(?<lower>[a-z])(?<upper>[A-Z])/gu, '$<lower>_$<upper>')
            .replace(/[-\s]/gu, '_')
            .toLowerCase();
    }
}
