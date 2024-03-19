/**
 * Interface for Basalt key transformer.
 */
export interface IBasaltKeyTransformer {
    /**
     * Transforms a single key from any case to another case.
     * @param key - The key string to transform.
     * @returns The key string transformed into the desired case.
     */
    transformKey(key: string): string;
}
