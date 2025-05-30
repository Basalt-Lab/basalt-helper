import { describe, expect, test } from 'bun:test';

import {
    filterByKeyExclusion,
    filterByKeyInclusion,
    filterByValue,
    transformKeys
} from '#/data/data';
import { BasaltCamelCaseTransformer } from '#/data/transformer/basaltCamelCase';
import { BasaltKebabCaseTransformer } from '#/data/transformer/basaltKebabCase';
import { BasaltPascalCaseTransformer } from '#/data/transformer/basaltPascalCase';
import { BasaltSnakeCaseTransformer } from '#/data/transformer/basaltSnakeCase';

/**
 * Test data constants for consistent testing across all test suites.
 */
const TEST_DATA = {
    SIMPLE_OBJECT: { test: 'test', exclude: 'exclude' } as const,
    OBJECT_WITH_NULLS: { test: 'test', exclude: null, exclude2: undefined } as const,
    COMPLEX_OBJECT: {
        stringValue: 'test',
        numberValue: 42,
        booleanValue: true,
        nullValue: null,
        undefinedValue: undefined,
        arrayValue: [1, 2, 3],
        nestedObject: { nested: 'value' }
    } as const,
    CASE_VARIANTS: {
        camelCase: 'myKeyName',
        PascalCase: 'MyKeyName',
        'kebab-case': 'my-key-name',
        snakeCase: 'my_key_name',
        'mixed-Case_example': 'mixed-Case_example'
    } as const
} as const;

/**
 * Error messages expected from the data functions.
 */
const EXPECTED_ERROR_MESSAGES = {
    NULL_DATA: 'Data cannot be null or undefined.',
    INVALID_OBJECT: 'Data must be a plain object.'
} as const;

/**
 * Helper function to create a null object for testing error cases.
 * @returns A null value cast as Record<string, unknown> for testing purposes.
 */
const _createNullObject = (): Record<string, unknown> => null as unknown as Record<string, unknown>;

/**
 * Helper function to create an invalid non-object for testing error cases.
 * @returns A primitive value cast as Record<string, unknown> for testing purposes.
 */
const _createInvalidObject = (): Record<string, unknown> => 2 as unknown as Record<string, unknown>;

describe('filterByKeyExclusion', () => {
    describe('when filtering with key exclusion', () => {
        test('should return filtered object excluding specified keys', () => {
            const object: Record<string, string> = TEST_DATA.SIMPLE_OBJECT;
            const filtered: Omit<typeof object, 'exclude'> = filterByKeyExclusion(object, ['exclude']);

            expect(filtered).toEqual({ test: 'test' });
            expect(filtered).not.toHaveProperty('exclude');
        });

        test('should exclude multiple keys when provided', () => {
            const object: Record<string, string | null | undefined> = {
                keep1: 'keep',
                keep2: 'keep',
                exclude1: 'remove',
                exclude2: 'remove'
            };
            const filteredData: Omit<typeof object, 'exclude1' | 'exclude2'> = filterByKeyExclusion(
                object,
                ['exclude1', 'exclude2']
            );

            expect(filteredData).toEqual({ keep1: 'keep', keep2: 'keep' });
        });

        test('should handle complex objects while preserving values', () => {
            const filteredData: Omit<typeof TEST_DATA.COMPLEX_OBJECT, 'nullValue' | 'undefinedValue'>
                = filterByKeyExclusion(TEST_DATA.COMPLEX_OBJECT, ['nullValue', 'undefinedValue']);

            expect(filteredData).toEqual({
                stringValue: 'test',
                numberValue: 42,
                booleanValue: true,
                arrayValue: [1, 2, 3],
                nestedObject: { nested: 'value' }
            });
        });
    });

    describe('when excluding null and undefined values', () => {
        test('should exclude null and undefined values when flag is true', () => {
            const object: Record<string, string | null | undefined> = TEST_DATA.OBJECT_WITH_NULLS;
            const filtered: Partial<typeof object> = filterByKeyExclusion(object, [], true);

            expect(filtered).toEqual({ test: 'test' });
            expect(filtered).not.toHaveProperty('exclude');
            expect(filtered).not.toHaveProperty('exclude2');
        });

        test('should combine key exclusion with null/undefined exclusion', () => {
            const object: Record<string, string | null | undefined> = {
                keep: 'keep',
                excludeKey: 'remove',
                nullValue: null,
                undefinedValue: undefined
            };
            const filteredData: Partial<Omit<typeof object, 'excludeKey'>>
                = filterByKeyExclusion(object, ['excludeKey'], true);

            expect(filteredData).toEqual({ keep: 'keep' });
        });
    });

    describe('when handling edge cases', () => {
        test('should return original object when keys array is empty', () => {
            const object: Record<string, string> = { test: 'test' };
            const filtered: typeof object = filterByKeyExclusion(object, []);

            expect(filtered).toEqual({ test: 'test' });
        });

        test('should return original object when specified keys are not found', () => {
            const object: Record<string, string> = { test: 'test' };
            const filtered: Omit<typeof object, 'nonExistent'> = filterByKeyExclusion(object, ['nonExistent']);

            expect(filtered).toEqual({ test: 'test' });
        });

        test('should handle empty object', () => {
            const object: Record<string, never> = {};
            const filtered: typeof object = filterByKeyExclusion(object, ['anyKey']);

            expect(filtered).toEqual({});
        });
    });

    describe('when handling error cases', () => {
        test('should throw error when data is null', () => {
            const nullObject: Record<string, unknown> = _createNullObject();

            expect(() => filterByKeyExclusion(nullObject, [])).toThrow(EXPECTED_ERROR_MESSAGES.NULL_DATA);
        });

        test('should throw error when data is not a plain object', () => {
            const invalidObject: Record<string, unknown> = _createInvalidObject();

            expect(() => filterByKeyExclusion(invalidObject, [])).toThrow(EXPECTED_ERROR_MESSAGES.INVALID_OBJECT);
        });
    });
});

describe('filterByKeyInclusion', () => {
    describe('when filtering with key inclusion', () => {
        test('should return object with only specified keys', () => {
            const object: Record<string, string> = TEST_DATA.SIMPLE_OBJECT;
            const filtered: Pick<typeof object, 'test'> = filterByKeyInclusion(object, ['test']);

            expect(filtered).toEqual({ test: 'test' });
            expect(filtered).not.toHaveProperty('exclude');
        });

        test('should include multiple keys when provided', () => {
            const object: Record<string, string> = {
                keep1: 'keep1',
                keep2: 'keep2',
                exclude1: 'exclude1',
                exclude2: 'exclude2'
            };
            const filtered: Pick<typeof object, 'keep1' | 'keep2'> = filterByKeyInclusion(
                object,
                ['keep1', 'keep2']
            );

            expect(filtered).toEqual({ keep1: 'keep1', keep2: 'keep2' });
        });

        test('should handle complex objects with various data types', () => {
            const filteredData: Pick<typeof TEST_DATA.COMPLEX_OBJECT, 'stringValue' | 'numberValue' | 'nestedObject'>
                = filterByKeyInclusion(TEST_DATA.COMPLEX_OBJECT, ['stringValue', 'numberValue', 'nestedObject']);

            expect(filteredData).toEqual({
                stringValue: 'test',
                numberValue: 42,
                nestedObject: { nested: 'value' }
            });
        });
    });

    describe('when excluding null and undefined values', () => {
        test('should exclude null and undefined values when flag is true', () => {
            const object: Record<string, string | null | undefined> = TEST_DATA.OBJECT_WITH_NULLS;
            const filtered: Partial<Pick<typeof object, 'test'>> = filterByKeyInclusion(object, ['test'], true);

            expect(filtered).toEqual({ test: 'test' });
        });

        test('should return empty object when included key has null/undefined value and flag is true', () => {
            const object: Record<string, string | null> = { test: 'test', nullKey: null };
            const filtered: Partial<Pick<typeof object, 'nullKey'>> = filterByKeyInclusion(object, ['nullKey'], true);

            expect(filtered).toEqual({});
        });
    });

    describe('when handling edge cases', () => {
        test('should return empty object when keys array is empty', () => {
            const object: Record<string, string> = { test: 'test' };
            const filtered: Pick<typeof object, never> = filterByKeyInclusion(object, []);

            expect(filtered).toEqual({});
        });

        test('should return empty object when specified keys are not found', () => {
            const object: Record<string, string> = { test: 'test' };
            const filtered: Pick<typeof object, never> = filterByKeyInclusion(object, ['nonExistent']);

            expect(filtered).toEqual({});
        });

        test('should handle empty object', () => {
            const object: Record<string, never> = {};
            const filtered: Pick<typeof object, never> = filterByKeyInclusion(object, ['anyKey']);

            expect(filtered).toEqual({});
        });
    });

    describe('when handling error cases', () => {
        test('should throw error when data is null', () => {
            const nullObject: Record<string, unknown> = _createNullObject();

            expect(() => filterByKeyInclusion(nullObject, [])).toThrow(EXPECTED_ERROR_MESSAGES.NULL_DATA);
        });

        test('should throw error when data is not a plain object', () => {
            const invalidObject: Record<string, unknown> = _createInvalidObject();

            expect(() => filterByKeyInclusion(invalidObject, [])).toThrow(EXPECTED_ERROR_MESSAGES.INVALID_OBJECT);
        });
    });
});

describe('filterByValue', () => {
    describe('when filtering with value predicate', () => {
        test('should return object with values matching predicate', () => {
            const object: Record<string, string> = { test: 'test', exclude: 'exclude' };
            const filtered: typeof object = filterByValue(object, (value: string): boolean => value === 'test');

            expect(filtered).toEqual({ test: 'test' });
            expect(filtered).not.toHaveProperty('exclude');
        });

        test('should handle complex predicates with various data types', () => {
            const object: Record<string, string | number | boolean> = {
                stringValue: 'test',
                numberValue: 42,
                booleanValue: true,
                anotherNumber: 100
            };
            const filtered: typeof object = filterByValue(
                object,
                (value: string | number | boolean): boolean => typeof value === 'number' && value > 50
            );

            expect(filtered).toEqual({ anotherNumber: 100 });
        });

        test('should work with array values', () => {
            const object: Record<string, unknown[]> = {
                shortArray: [1, 2],
                longArray: [1, 2, 3, 4, 5],
                emptyArray: []
            };
            const filtered: typeof object = filterByValue(
                object,
                (value: unknown[]): boolean => Array.isArray(value) && value.length > 2
            );

            expect(filtered).toEqual({ longArray: [1, 2, 3, 4, 5] });
        });
    });

    describe('when excluding null and undefined values', () => {
        test('should exclude null and undefined values when flag is true', () => {
            const object: Record<string, string | null | undefined> = TEST_DATA.OBJECT_WITH_NULLS;
            const filtered: typeof object = filterByValue(
                object,
                (value: string | null | undefined): boolean => value === 'test',
                true
            );

            expect(filtered).toEqual({ test: 'test' });
        });

        test('should combine predicate filtering with null/undefined exclusion', () => {
            const object: Record<string, string | number | null | undefined> = {
                validString: 'keep',
                validNumber: 42,
                nullValue: null,
                undefinedValue: undefined,
                invalidString: 'reject'
            };
            const filteredData: typeof object = filterByValue(
                object,
                (value: string | number | null | undefined): boolean => (typeof value === 'string' && value === 'keep') || typeof value === 'number',
                true
            );

            expect(filteredData).toEqual({ validString: 'keep', validNumber: 42 });
        });
    });

    describe('when handling edge cases', () => {
        test('should return empty object when no values match predicate', () => {
            const object: Record<string, string> = { test: 'test', another: 'another' };
            const filtered: typeof object = filterByValue(object, (): boolean => false);

            expect(filtered).toEqual({});
        });

        test('should return all values when predicate always returns true', () => {
            const object: Record<string, string> = { test: 'test', another: 'another' };
            const filtered: typeof object = filterByValue(object, (): boolean => true);

            expect(filtered).toEqual(object);
        });

        test('should handle empty object', () => {
            const object: Record<string, never> = {};
            const filtered: typeof object = filterByValue(object, (): boolean => true);

            expect(filtered).toEqual({});
        });
    });

    describe('when handling error cases', () => {
        test('should throw error when data is null', () => {
            const nullObject: Record<string, unknown> = _createNullObject();

            expect(() => filterByValue(nullObject, (): boolean => true))
                .toThrow(EXPECTED_ERROR_MESSAGES.NULL_DATA);
        });

        test('should throw error when data is not a plain object', () => {
            const invalidObject: Record<string, unknown> = _createInvalidObject();

            expect(() => filterByValue(invalidObject, (): boolean => true))
                .toThrow(EXPECTED_ERROR_MESSAGES.INVALID_OBJECT);
        });
    });
});

describe('transformKeys', () => {
    describe('when transforming keys with different transformers', () => {
        test('should transform keys to camelCase', () => {
            const object: Record<string, string> = { testKey: 'test', 'another-key': 'value' };
            const transformedData: typeof object = transformKeys(object, new BasaltCamelCaseTransformer());

            expect(transformedData).toEqual({ testKey: 'test', anotherKey: 'value' });
        });

        test('should transform keys to kebab-case', () => {
            const object: Record<string, string> = { testKey: 'test', AnotherKey: 'value' };
            const transformed: typeof object = transformKeys(object, new BasaltKebabCaseTransformer());

            expect(transformed).toEqual({ 'test-key': 'test', 'another-key': 'value' });
        });

        test('should transform keys to PascalCase', () => {
            const object: Record<string, string> = { testKey: 'test', 'another-key': 'value' };
            const transformedData: typeof object = transformKeys(object, new BasaltPascalCaseTransformer());

            expect(transformedData).toEqual({ TestKey: 'test', AnotherKey: 'value' });
        });

        test('should transform keys to snake_case', () => {
            const object: Record<string, string> = { testKey: 'test', 'another-key': 'value' };
            const transformedData: typeof object = transformKeys(object, new BasaltSnakeCaseTransformer());

            // eslint-disable-next-line camelcase
            expect(transformedData).toEqual({ test_key: 'test', another_key: 'value' });
        });

        test('should handle complex objects while preserving values', () => {
            const object: Record<string, unknown> = {
                simpleKey: 'string',
                'kebab-key': 42,
                PascalKey: true,
                nestedObject: { inner: 'value' },
                arrayValue: [1, 2, 3]
            };
            const transformedData: typeof object = transformKeys(object, new BasaltCamelCaseTransformer());

            expect(transformedData).toEqual({
                simpleKey: 'string',
                kebabKey: 42,
                pascalKey: true,
                nestedObject: { inner: 'value' },
                arrayValue: [1, 2, 3]
            });
        });
    });

    describe('when handling edge cases', () => {
        test('should handle empty object', () => {
            const object: Record<string, never> = {};
            const transformed: typeof object = transformKeys(object, new BasaltCamelCaseTransformer());

            expect(transformed).toEqual({});
        });

        test('should handle object with single key', () => {
            const object: Record<string, string> = { singleKey: 'value' };
            const transformedData: typeof object = transformKeys(object, new BasaltCamelCaseTransformer());

            expect(transformedData).toEqual({ singleKey: 'value' });
        });
    });

    describe('when handling error cases', () => {
        test('should throw error when data is null', () => {
            const nullObject: Record<string, unknown> = _createNullObject();

            expect(() => transformKeys(nullObject, new BasaltCamelCaseTransformer()))
                .toThrow(EXPECTED_ERROR_MESSAGES.NULL_DATA);
        });

        test('should throw error when data is not a plain object', () => {
            const invalidObject: Record<string, unknown> = _createInvalidObject();

            expect(() => transformKeys(invalidObject, new BasaltCamelCaseTransformer()))
                .toThrow(EXPECTED_ERROR_MESSAGES.INVALID_OBJECT);
        });
    });
});

describe('CamelCaseTransformer', () => {
    const transformer: BasaltCamelCaseTransformer = new BasaltCamelCaseTransformer();

    describe('when creating transformer instance', () => {
        test('should create a new instance', () => {
            const newTransformer: BasaltCamelCaseTransformer = new BasaltCamelCaseTransformer();
            expect(newTransformer).toBeInstanceOf(BasaltCamelCaseTransformer);
            expect(typeof newTransformer.transformKey).toBe('function');
        });

        test('should test constructor explicitly for function coverage', () => {
            const constructorTest: BasaltCamelCaseTransformer = new BasaltCamelCaseTransformer();
            expect(constructorTest).toBeDefined();
            expect(typeof constructorTest.transformKey).toBe('function');
        });
    });

    describe('when transforming various case formats', () => {
        test('should preserve already camelCase keys', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.camelCase)).toBe('myKeyName');
        });

        test('should transform PascalCase to camelCase', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.PascalCase)).toBe('myKeyName');
        });

        test('should transform kebab-case to camelCase', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS['kebab-case'])).toBe('myKeyName');
        });

        test('should transform snake_case to camelCase', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.snakeCase)).toBe('myKeyName');
        });

        test('should handle mixed case formats', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS['mixed-Case_example']))
                .toBe('mixedCaseExample');
        });

        test('should handle multiple separators', () => {
            expect(transformer.transformKey('test_key-name')).toBe('testKeyName');
            expect(transformer.transformKey('another_test-value')).toBe('anotherTestValue');
        });
    });

    describe('when handling edge cases', () => {
        test('should handle single character keys', () => {
            expect(transformer.transformKey('a')).toBe('a');
            expect(transformer.transformKey('A')).toBe('a');
        });

        test('should handle empty string', () => {
            expect(transformer.transformKey('')).toBe('');
        });

        test('should handle keys with numbers', () => {
            expect(transformer.transformKey('key_with_123')).toBe('keyWith_123');
            expect(transformer.transformKey('key-with-456')).toBe('keyWith-456');
        });

        test('should handle consecutive uppercase letters', () => {
            expect(transformer.transformKey('XMLHttpRequest')).toBe('xMLHttpRequest');
            expect(transformer.transformKey('HTTPSProxy')).toBe('hTTPSProxy');
        });

        test('should handle specific regex edge cases', () => {
            // Test the first regex: /(?:[-_][a-z])/giu
            expect(transformer.transformKey('test-a')).toBe('testA');
            expect(transformer.transformKey('test_b')).toBe('testB');
            expect(transformer.transformKey('value-c_d')).toBe('valueCD');

            // Test the second regex: /^[A-Z]/u
            expect(transformer.transformKey('A')).toBe('a');
            expect(transformer.transformKey('Test')).toBe('test');
            expect(transformer.transformKey('TEST')).toBe('tEST');
        });
    });
});

describe('KebabCaseTransformer', () => {
    const transformer: BasaltKebabCaseTransformer = new BasaltKebabCaseTransformer();

    describe('when creating transformer instance', () => {
        test('should create a new instance', () => {
            const newTransformer: BasaltKebabCaseTransformer = new BasaltKebabCaseTransformer();
            expect(newTransformer).toBeInstanceOf(BasaltKebabCaseTransformer);
            expect(typeof newTransformer.transformKey).toBe('function');
        });

        test('should test constructor explicitly for function coverage', () => {
            const constructorTest: BasaltKebabCaseTransformer = new BasaltKebabCaseTransformer();
            expect(constructorTest).toBeDefined();
            expect(typeof constructorTest.transformKey).toBe('function');
        });
    });

    describe('when transforming various case formats', () => {
        test('should preserve already kebab-case keys', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS['kebab-case'])).toBe('my-key-name');
        });

        test('should transform camelCase to kebab-case', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.camelCase)).toBe('my-key-name');
        });

        test('should transform PascalCase to kebab-case', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.PascalCase)).toBe('my-key-name');
        });

        test('should transform snake_case to kebab-case', () => {
            expect(transformer.transformKey('my_long_key_name')).toBe('my-long-key-name');
        });

        test('should handle multiple underscores', () => {
            expect(transformer.transformKey('test_key_value')).toBe('test-key-value');
            expect(transformer.transformKey('another_test_case')).toBe('another-test-case');
        });
    });

    describe('when handling edge cases', () => {
        test('should handle single character keys', () => {
            expect(transformer.transformKey('a')).toBe('a');
            expect(transformer.transformKey('A')).toBe('a');
        });

        test('should handle empty string', () => {
            expect(transformer.transformKey('')).toBe('');
        });

        test('should handle consecutive capitals', () => {
            expect(transformer.transformKey('HTTPSConnection')).toBe('https-connection');
            expect(transformer.transformKey('XMLParser')).toBe('xml-parser');
        });

        test('should handle mixed separators', () => {
            expect(transformer.transformKey('test_Key-Name')).toBe('test-key-name');
            expect(transformer.transformKey('another_Value')).toBe('another-value');
        });
    });
});

describe('PascalCaseTransformer', () => {
    const transformer: BasaltPascalCaseTransformer = new BasaltPascalCaseTransformer();

    describe('when creating transformer instance', () => {
        test('should create a new instance', () => {
            const newTransformer: BasaltPascalCaseTransformer = new BasaltPascalCaseTransformer();
            expect(newTransformer).toBeInstanceOf(BasaltPascalCaseTransformer);
            expect(typeof newTransformer.transformKey).toBe('function');
        });

        test('should test constructor explicitly for function coverage', () => {
            const constructorTest: BasaltPascalCaseTransformer = new BasaltPascalCaseTransformer();
            expect(constructorTest).toBeDefined();
            expect(typeof constructorTest.transformKey).toBe('function');
        });
    });

    describe('when transforming various case formats', () => {
        test('should preserve already PascalCase keys', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.PascalCase)).toBe('MyKeyName');
        });

        test('should transform camelCase to PascalCase', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.camelCase)).toBe('MyKeyName');
        });

        test('should transform kebab-case to PascalCase', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS['kebab-case'])).toBe('MyKeyName');
        });

        test('should transform snake_case to PascalCase', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.snakeCase)).toBe('MyKeyName');
        });

        test('should handle mixed separators', () => {
            expect(transformer.transformKey('test_key-name')).toBe('TestKeyName');
            expect(transformer.transformKey('another_test-value')).toBe('AnotherTestValue');
        });
    });

    describe('when handling edge cases', () => {
        test('should handle single character keys', () => {
            expect(transformer.transformKey('a')).toBe('A');
            expect(transformer.transformKey('A')).toBe('A');
        });

        test('should handle empty string', () => {
            expect(transformer.transformKey('')).toBe('');
        });

        test('should handle keys with numbers', () => {
            expect(transformer.transformKey('key_with_123')).toBe('KeyWith_123');
            expect(transformer.transformKey('another-key_456')).toBe('AnotherKey_456');
        });
    });
});

describe('SnakeCaseTransformer', () => {
    const transformer: BasaltSnakeCaseTransformer = new BasaltSnakeCaseTransformer();

    describe('when creating transformer instance', () => {
        test('should create a new instance', () => {
            const newTransformer: BasaltSnakeCaseTransformer = new BasaltSnakeCaseTransformer();
            expect(newTransformer).toBeInstanceOf(BasaltSnakeCaseTransformer);
            expect(typeof newTransformer.transformKey).toBe('function');
        });

        test('should test constructor explicitly for function coverage', () => {
            const constructorTest: BasaltSnakeCaseTransformer = new BasaltSnakeCaseTransformer();
            expect(constructorTest).toBeDefined();
            expect(typeof constructorTest.transformKey).toBe('function');
        });
    });

    describe('when transforming various case formats', () => {
        test('should preserve already snake_case keys', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.snakeCase)).toBe('my_key_name');
        });

        test('should transform camelCase to snake_case', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.camelCase)).toBe('my_key_name');
        });

        test('should transform PascalCase to snake_case', () => {
            expect(transformer.transformKey(TEST_DATA.CASE_VARIANTS.PascalCase)).toBe('my_key_name');
        });

        test('should transform kebab-case to snake_case', () => {
            expect(transformer.transformKey('my-long-key-name')).toBe('my_long_key_name');
        });

        test('should handle spaces in keys', () => {
            expect(transformer.transformKey('test key name')).toBe('test_key_name');
            expect(transformer.transformKey('another test value')).toBe('another_test_value');
        });

        test('should handle mixed separators', () => {
            expect(transformer.transformKey('test-key name')).toBe('test_key_name');
            expect(transformer.transformKey('another value-test')).toBe('another_value_test');
        });
    });

    describe('when handling edge cases', () => {
        test('should handle single character keys', () => {
            expect(transformer.transformKey('a')).toBe('a');
            expect(transformer.transformKey('A')).toBe('a');
        });

        test('should handle empty string', () => {
            expect(transformer.transformKey('')).toBe('');
        });

        test('should handle consecutive capitals', () => {
            expect(transformer.transformKey('HTTPSConnection')).toBe('httpsconnection');
            expect(transformer.transformKey('XMLParser')).toBe('xmlparser');
        });

        test('should handle numbers in keys', () => {
            expect(transformer.transformKey('keyWith123')).toBe('key_with123');
            expect(transformer.transformKey('AnotherKey456')).toBe('another_key456');
        });

        test('should handle specific regex edge cases for 100% function coverage', () => {
            // Test the first regex: /(?<lower>[a-z])(?<upper>[A-Z])/gu
            expect(transformer.transformKey('aB')).toBe('a_b');
            expect(transformer.transformKey('testCase')).toBe('test_case');
            expect(transformer.transformKey('iPhone')).toBe('i_phone');

            // Test the second regex: /[-\s]/gu
            expect(transformer.transformKey('test-value')).toBe('test_value');
            expect(transformer.transformKey('test value')).toBe('test_value');
            expect(transformer.transformKey('test-key value')).toBe('test_key_value');

            // Test combinations to ensure all regex branches are hit
            expect(transformer.transformKey('testValue-name case')).toBe('test_value_name_case');
        });
    });
});

describe('Comprehensive Function Coverage Tests', () => {
    describe('CamelCase anonymous function coverage', () => {
        const transformer: BasaltCamelCaseTransformer = new BasaltCamelCaseTransformer();

        test('should trigger all anonymous functions in regex patterns', () => {
            // First regex: /(?:[-_][a-z])/giu - anonymous function (group: string) => (group[1]).toUpperCase()
            expect(transformer.transformKey('test-a')).toBe('testA');
            expect(transformer.transformKey('test_b')).toBe('testB');
            expect(transformer.transformKey('value-c_d')).toBe('valueCD');

            // Second regex: /^[A-Z]/u - anonymous function (firstLetter: string) => firstLetter.toLowerCase()
            expect(transformer.transformKey('A')).toBe('a');
            expect(transformer.transformKey('Test')).toBe('test');
            expect(transformer.transformKey('VALUE')).toBe('vALUE');

            // Combined patterns to ensure all branches
            expect(transformer.transformKey('Test-value_name')).toBe('testValueName');
        });
    });

    describe('KebabCase anonymous function coverage', () => {
        const transformer: BasaltKebabCaseTransformer = new BasaltKebabCaseTransformer();

        test('should trigger all regex patterns and anonymous functions', () => {
            // First regex: /_/gu - simple replacement, no anonymous function needed
            expect(transformer.transformKey('test_value')).toBe('test-value');

            // Second regex: /(?<=[a-z])(?=[A-Z])/gu - anonymous function for lookbehind/lookahead
            expect(transformer.transformKey('testValue')).toBe('test-value');
            expect(transformer.transformKey('aB')).toBe('a-b');

            // Third regex: /(?<=[A-Z]+)(?=[A-Z][a-z])/gu - complex pattern for consecutive capitals
            expect(transformer.transformKey('HTTPSConnection')).toBe('https-connection');
            expect(transformer.transformKey('XMLParser')).toBe('xml-parser');
            expect(transformer.transformKey('URLPattern')).toBe('url-pattern');

            // Combined patterns
            expect(transformer.transformKey('testHTTPSValue_name')).toBe('test-https-value-name');
        });
    });

    describe('PascalCase anonymous function coverage', () => {
        const transformer: BasaltPascalCaseTransformer = new BasaltPascalCaseTransformer();

        test('should trigger anonymous function in regex pattern', () => {
            // The regex: /(?:[-_][a-z])/giu with anonymous function (group: string) => (group[1]).toUpperCase()
            expect(transformer.transformKey('test-a')).toBe('TestA');
            expect(transformer.transformKey('value_b')).toBe('ValueB');
            expect(transformer.transformKey('name-c_d')).toBe('NameCD');
            expect(transformer.transformKey('example-value_test')).toBe('ExampleValueTest');

            // Edge cases to ensure the function is called
            expect(transformer.transformKey('-a')).toBe('A');
            expect(transformer.transformKey('_b')).toBe('B');
            expect(transformer.transformKey('test-x_y-z')).toBe('TestXYZ');
        });
    });

    describe('SnakeCase anonymous function coverage', () => {
        const transformer: BasaltSnakeCaseTransformer = new BasaltSnakeCaseTransformer();

        test('should trigger all named capture group replacements', () => {
            // First regex: /(?<lower>[a-z])(?<upper>[A-Z])/gu with replacement '$<lower>_$<upper>'
            expect(transformer.transformKey('aB')).toBe('a_b');
            expect(transformer.transformKey('testCase')).toBe('test_case');
            expect(transformer.transformKey('someValue')).toBe('some_value');
            expect(transformer.transformKey('iPhone')).toBe('i_phone');

            // Second regex: /[-\s]/gu - character class replacement
            expect(transformer.transformKey('test-case')).toBe('test_case');
            expect(transformer.transformKey('test case')).toBe('test_case');
            expect(transformer.transformKey('test-value case')).toBe('test_value_case');

            // Combined patterns to ensure full coverage
            expect(transformer.transformKey('testValue-name case')).toBe('test_value_name_case');
            expect(transformer.transformKey('iPhone-test case')).toBe('i_phone_test_case');
        });
    });
});