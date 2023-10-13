
export class BasaltJson {
    /**
     * Stringify an object. (Using Typia)
     * please check the documentation of typia for more information.
     * @see https://typia.io/docs/
     * @param object
     * @returns {string}
     */
    public static stringify<T extends object>(object: T): string {
        return JSON.stringify(object);
    }

    /**
     * Parse a stringified object.
     * @param stringify
     * @returns {T}
     */
    public static parse<T extends object>(stringify: string): T {
        return JSON.parse(stringify);
    }
}
