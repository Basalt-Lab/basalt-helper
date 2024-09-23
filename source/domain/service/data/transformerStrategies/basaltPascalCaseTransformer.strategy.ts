import type { BasaltKeyTransformer } from '#/common/types/data/index.ts';

/**
 * Transforms string keys into PascalCase format.
 * Implements ({@link BasaltKeyTransformer}).
 */
export class BasaltPascalCaseTransformer implements BasaltKeyTransformer {

    /**
     * Transforms a single key from any case to PascalCase.
     *
     * @param key - The key string to transform into PascalCase.
     *
     * @returns The key string transformed into PascalCase, with the first letter of each word capitalized.
     *
     * @example
     * Returns "MyKeyName"
     * transformKey('my_key_name');
     * @example
     * Returns "MyKeyName"
     * transformKey('my-key-name');
     * @example
     * Returns "MyLongKeyName"
     * transformKey('myLongKeyName');
     */
    public transformKey(key: string): string {
        const camelCaseKey: string = key.replace(/(?:[-_][a-z])/giu, (group: string) =>
            (group[1] as string).toUpperCase()
        );
        return camelCaseKey.charAt(0).toUpperCase() + camelCaseKey.slice(1);
    }
}
