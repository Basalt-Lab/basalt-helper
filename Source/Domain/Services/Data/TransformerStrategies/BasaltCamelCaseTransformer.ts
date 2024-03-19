import { type IBasaltKeyTransformer } from '@/Domain/Services/Data/Interfaces';

/**
 * Transforms string keys into camelCase format.
 * Implements the IBasaltKeyTransformer interface.
 */
export class BasaltCamelCaseTransformer implements IBasaltKeyTransformer {

    /**
     * Transforms a single key from any case to camelCase.
     *
     * @param key - The key string to transform into camelCase.
     * @returns The key string transformed into camelCase.
     *
     * @example
     * Returns "myKeyName"
     * transformKey('MyKeyName');
     * @example
     * Returns "myKeyName"
     * transformKey('my-key-name');
     * @example
     * Returns "myKeyName"
     * transformKey('my_key_name');
     */
    public transformKey(key: string): string {
        return key
            .replace(/(?:[-_][a-z])/giu, (group: string) => (group[1] as string).toUpperCase())
            .replace(/^[A-Z]/u, (firstLetter: string) => firstLetter.toLowerCase());
    }
}
