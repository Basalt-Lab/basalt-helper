import { HelperDataFilter } from '@/Helpers/HelperDataFilter';

describe('HelperDataFilter', (): void => {
    describe('filterByKeys', (): void => {

        it('should throw an error for null data', (): void => {
            expect((): void => {
                HelperDataFilter.filterByKeys(null as any, ['a', 'b', 'c']);
            }).toThrowError("The provided data object is either null or undefined.");
        });

        it('should throw an error for undefined data', (): void => {
            expect((): void => {
                HelperDataFilter.filterByKeys(undefined as any, ['a', 'b', 'c']);
            }).toThrowError("The provided data object is either null or undefined.");
        });

        it('should throw an error if the data is not an object', (): void => {
            expect((): void => {
                HelperDataFilter.filterByKeys('string' as any, ['a', 'b', 'c']);
            }).toThrowError("The provided data object must be an object.");
        });

        it('should throw an error if the keys are not an array', (): void => {
            expect((): void => {
                HelperDataFilter.filterByKeys({}, 'string' as any);
            }).toThrowError("The provided keys must be an array.");
        });

        it('should throw an error if the options are not an object', (): void => {
            expect((): void => {
                HelperDataFilter.filterByKeys<{a: string}>({ a: 'hello' }, ['a'], 'string' as any);
            }).toThrowError("The provided options must be an object.");
        });

        it('should return an object with filtered keys', (): void => {
            const data: { a: number; b: number; c: number } = { a: 1, b: 2, c: 3 };
            const result: { a: number; b: number; c: number } = HelperDataFilter.filterByKeys(data, ['a', 'c']);
            expect(result).toEqual({ a: 1, c: 3 });
        });

        it('should return an empty object when no keys match', (): void => {
            const data: { a: number; b: number; c: number } = { a: 1, b: 2, c: 3 };
            const result: { a: number; b: number; c: number } = HelperDataFilter.filterByKeys(data, []);
            expect(result).toEqual({});
        });

        it('should exclude keys with null or undefined values when excludeNullUndefined option is true', (): void => {
            const data: { a: number; b: number; c: number | null; d?: number } = { a: 1, b: 2, c: null };
            const result: { a: number; b: number; c: number | null; d?: number } = HelperDataFilter.filterByKeys(data, ['a', 'b', 'c', 'd'], { excludeNullUndefined: true });
            expect(result).toEqual({ a: 1, b: 2 });
        });

        it('should include keys with null or undefined values when excludeNullUndefined option is false or not provided', (): void => {
            const data: { a: number; b: number; c: number | null; d?: number } = { a: 1, b: 2, c: null };
            const result: { a: number; b: number; c: number | null; d?: number } = HelperDataFilter.filterByKeys(data, ['a', 'b', 'c', 'd']);
            expect(result).toEqual({ a: 1, b: 2, c: null });
        });
    });

    describe('excludeByKeys', (): void => {

        it('should throw an error for null data', (): void => {
            expect((): void => {
                HelperDataFilter.excludeByKeys(null as any, ['a', 'b', 'c']);
            }).toThrowError("The provided data object is either null or undefined.");
        });

        it('should throw an error for undefined data', (): void => {
            expect((): void => {
                HelperDataFilter.excludeByKeys(undefined as any, ['a', 'b', 'c']);
            }).toThrowError("The provided data object is either null or undefined.");
        });

        it('should throw an error if the data is not an object', (): void => {
            expect((): void => {
                HelperDataFilter.excludeByKeys('string' as any, ['a', 'b', 'c']);
            }).toThrowError("The provided data object must be an object.");
        });

        it('should throw an error if the keys are not an array', (): void => {
            expect((): void => {
                HelperDataFilter.excludeByKeys({}, 'string' as any);
            }).toThrowError("The provided keys must be an array.");
        });

        it('should return an object without the excluded keys', (): void => {
            const data: { a: number; b: number; c: number } = { a: 1, b: 2, c: 3 };
            const result: { a: number; b: number } = HelperDataFilter.excludeByKeys(data, ['c']);
            expect(result).toEqual({ a: 1, b: 2 });
        });

        it('should return the same object when no keys are excluded', (): void => {
            const data: { a: number; b: number; c: number } = { a: 1, b: 2, c: 3 };
            const result: { a: number; b: number; c: number } = HelperDataFilter.excludeByKeys(data, []);
            expect(result).toEqual(data);
        });
    });

    describe('transformKeyToAnotherCase', (): void => {

        it('should throw an error for null data', (): void => {
            expect((): void => {
                HelperDataFilter.transformKeyToAnotherCase(null as any, 'camel');
            }).toThrowError("The data object is required.");
        });

        it('should throw an error for undefined data', (): void => {
            expect((): void => {
                HelperDataFilter.transformKeyToAnotherCase(undefined as any, 'camel');
            }).toThrowError("The data object is required.");
        });

        it('should throw an error if the data is not an object', (): void => {
            expect((): void => {
                HelperDataFilter.transformKeyToAnotherCase('string' as any, 'camel');
            }).toThrowError("The data object must be an object.");
        });

        it('should throw an error for invalid caseType', (): void => {
            const data: { exampleKey: string } = { exampleKey: 'value' };
            expect((): void => {
                HelperDataFilter.transformKeyToAnotherCase(data, 'invalidCase' as any);
            }).toThrowError("The case type must be one of the following: camel, pascal, snake, kebab.");
        });

        it('should transform keys to camelCase', (): void => {
            const data: { "ZIP-CODE": string; last_name: string; "first-name": string } = { 'first-name': 'John', last_name: 'Doe', 'ZIP-CODE': '12345' };
            const result: { "ZIP-CODE": string; last_name: string; "first-name": string } = HelperDataFilter.transformKeyToAnotherCase(data, 'camel');
            expect(result).toEqual({ 'firstName': 'John', 'lastName': 'Doe', 'ZIPCODE': '12345' });
        });

        it('should transform keys to pascalCase', (): void => {
            const data: { "ZIP-CODE": string; last_name: string; "first-name": string } = { 'first-name': 'John', last_name: 'Doe', 'ZIP-CODE': '12345' };
            const result: { "ZIP-CODE": string; last_name: string; "first-name": string } = HelperDataFilter.transformKeyToAnotherCase(data, 'pascal');
            expect(result).toEqual({ 'FirstName': 'John', 'LastName': 'Doe', 'ZIPCODE': '12345' });
        });

        it('should transform keys to snake_case', (): void => {
            const data: { firstName: string; ZIPCODE: string; LastName: string } = { firstName: 'John', LastName: 'Doe', ZIPCODE: '12345' };
            const result: { firstName: string; ZIPCODE: string; LastName: string } = HelperDataFilter.transformKeyToAnotherCase(data, 'snake');
            expect(result).toEqual({ 'first_name': 'John', 'last_name': 'Doe', 'zipcode': '12345' });
        });

        it('should transform keys to kebab-case', (): void => {
            const data: { firstName: string; ZIPCODE: string; LastName: string } = { firstName: 'John', LastName: 'Doe', ZIPCODE: '12345' };
            const result: { firstName: string; ZIPCODE: string; LastName: string } = HelperDataFilter.transformKeyToAnotherCase(data, 'kebab');
            expect(result).toEqual({ 'first-name': 'John', 'last-name': 'Doe', 'zipcode': '12345' });
        });
    });

    describe('filterByValue', (): void => {

        it('should throw an error for null data', (): void => {
            expect((): void => {
                HelperDataFilter.filterByValue(null as any, (): boolean => true);
            }).toThrowError("The provided data object is either null or undefined.");
        });

        it('should throw an error for undefined data', (): void => {
            expect((): void => {
                HelperDataFilter.filterByValue(undefined as any, (): boolean => true);
            }).toThrowError("The provided data object is either null or undefined.");
        });

        it('should throw an error if the callback is not a function', (): void => {
            const data: { name: string } = { name: 'John' };
            expect((): void => {
                HelperDataFilter.filterByValue(data, 'notAFunction' as any);
            }).toThrowError("The provided callback is not a function.");
        });

        it('should filter object properties based on value', (): void => {
            const data: { address: null; name: string; age: number } = {
                name: 'John',
                age: 30,
                address: null
            };
            const result: { address: null; name: string; age: number } = HelperDataFilter.filterByValue(data, (value: unknown): boolean => value !== null);
            expect(result).toEqual({
                name: 'John',
                age: 30
            });
        });

        it('should return an empty object if all properties are filtered out', (): void => {
            const data: { name: null; age: null } = {
                name: null,
                age: null
            };
            const result: { name: null; age: null } = HelperDataFilter.filterByValue(data, (value: unknown): boolean => value !== null);
            expect(result).toEqual({});
        });
    });
    describe('deepClone', (): void => {

        it('should throw an error for null data', (): void => {
            expect((): void => {
                HelperDataFilter.deepClone(null as any);
            }).toThrow("The provided data object is either null or undefined.");
        });

        it('should throw an error for undefined data', (): void => {
            expect((): void => {
                HelperDataFilter.deepClone(undefined as any);
            }).toThrow("The provided data object is either null or undefined.");
        });

        it('should clone primitive values', (): void => {
            const data: number = 42;
            const result: number = HelperDataFilter.deepClone(data);
            expect(result).toEqual(data);
        });

        it('should clone Date objects', (): void => {
            const data: Date = new Date();
            const result: Date = HelperDataFilter.deepClone(data);
            expect(result).toEqual(data);
            expect(result).not.toBe(data);
        });

        it('should clone RegExp objects', () => {
            const data: RegExp = /abc/gi;
            const result: RegExp = HelperDataFilter.deepClone(data);
            expect(result).toEqual(data);
            expect(result).not.toBe(data);
        });

        it('should clone arrays', (): void => {
            const data: (number | { a: string })[] = [1, 2, 3, { a: 'b' }];
            const result: (number | { a: string })[] = HelperDataFilter.deepClone(data);
            expect(result).toEqual(data);
            expect(result).not.toBe(data);
        });

        it('should clone nested objects', (): void => {
            const data: { a: { b: { c: string }; e: string[] } } = {
                a: {
                    b: {
                        c: 'd'
                    },
                    e: ['f', 'g']
                }
            };
            const result: { a: { b: { c: string }; e: string[] } } = HelperDataFilter.deepClone(data);
            expect(result).toEqual(data);
            expect(result.a).not.toBe(data.a);
            expect(result.a.b).not.toBe(data.a.b);
        });
    });
});
