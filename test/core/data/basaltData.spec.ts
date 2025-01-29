import { describe, expect, test } from 'bun:test';

import {
    filterByKeyExclusion,
    filterByKeyInclusion,
    filterByValue,
    transformKeys
} from '#/core/data/data';
import { BasaltCamelCaseTransformer } from '#/core/data/transformer/basaltCamelCase';
import { BasaltKebabCaseTransformer } from '#/core/data/transformer/basaltKebabCase';
import { BasaltPascalCaseTransformer } from '#/core/data/transformer/basaltPascalCase';
import { BasaltSnakeCaseTransformer } from '#/core/data/transformer/basaltSnakeCase';

describe('Filter By Key Exclusion', () => {
    test('should return a filtered object', () => {
        const object: Record<string, unknown> = { test: 'test', exclude: 'exclude' };
        const filtered: Record<string, unknown> = filterByKeyExclusion(object, ['exclude']);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should return a filtered object excluding null and undefined values', () => {
        const object: Record<string, unknown> = { test: 'test', exclude: null, exclude2: undefined };
        const filtered: Record<string, unknown> = filterByKeyExclusion(object, [], true);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should throw an error when data is null', () => {
        const object = null as unknown as Record<string, unknown>;
        expect(() => filterByKeyExclusion(object, [])).toThrowError('basalt-helper.error.data_is_null');
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => filterByKeyExclusion(object, [])).toThrowError('basalt-helper.error.data_must_be_object');
    });

    test('should return original object when keys are empty', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByKeyExclusion(object, []);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should return original object when keys are not found', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByKeyExclusion(object, ['exclude']);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should return original object when keys are not found and excludeNullUndefined is true', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByKeyExclusion(object, ['exclude'], true);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should return original object when keys are empty and excludeNullUndefined is true', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByKeyExclusion(object, [], true);
        expect(filtered).toEqual({ test: 'test' });
    });
});

describe('Filter By Key Inclusion', () => {
    test('should return a filtered object', () => {
        const object: Record<string, unknown> = { test: 'test', exclude: 'exclude' };
        const filtered: Record<string, unknown> = filterByKeyInclusion(object, ['test']);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should return a filtered object excluding null and undefined values', () => {
        const object: Record<string, unknown> = { test: 'test', exclude: null, exclude2: undefined };
        const filtered: Record<string, unknown> = filterByKeyInclusion(object, ['test'], true);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should throw an error when data is null', () => {
        const object = null as unknown as Record<string, unknown>;
        expect(() => filterByKeyInclusion(object, [])).toThrowError('basalt-helper.error.data_is_null');
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => filterByKeyInclusion(object, [])).toThrowError('basalt-helper.error.data_must_be_object');
    });

    test('should return empty object when keys are empty', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByKeyInclusion(object, []);
        expect(filtered).toEqual({});
    });

    test('should return empty object when keys are not found', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByKeyInclusion(object, ['exclude']);
        expect(filtered).toEqual({});
    });
});

describe('Filter By Value', () => {
    test('should return a filtered object', () => {
        const object: Record<string, unknown> = { test: 'test', exclude: 'exclude' };
        const filtered: Record<string, unknown> = filterByValue(object, (value: unknown): boolean => value === 'test');
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should return a filtered object excluding null and undefined values', () => {
        const object: Record<string, unknown> = { test: 'test', exclude: null, exclude2: undefined };
        const filtered: Record<string, unknown> = filterByValue(object, (value: unknown): boolean => value === 'test', true);
        expect(filtered).toEqual({ test: 'test' });
    });

    test('should throw an error when data is null', () => {
        const object = null as unknown as Record<string, unknown>;
        expect(() => filterByValue(object, () => true)).toThrowError('basalt-helper.error.data_is_null');
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => filterByValue(object, () => true)).toThrowError('basalt-helper.error.data_must_be_object');
    });

    test('should return empty object when predicate does not match', () => {
        const object: Record<string, unknown> = { test: 'test' };
        const filtered: Record<string, unknown> = filterByValue(object, () => false);
        expect(filtered).toEqual({});
    });
});

describe('Transform Keys', () => {
    test('should return a transformed object with camel case keys', () => {
        const object: Record<string, unknown> = { test_key: 'test' };
        const transformed: Record<string, unknown> = transformKeys(object, new BasaltCamelCaseTransformer());
        expect(transformed).toEqual({ testKey: 'test' });
    });

    test('should return a transformed object with kebab case keys', () => {
        const object: Record<string, unknown> = { testKey: 'test' };
        const transformed: Record<string, unknown> = transformKeys(object, new BasaltKebabCaseTransformer());
        expect(transformed).toEqual({ 'test-key': 'test' });
    });

    test('should return a transformed object with pascal case keys', () => {
        const object: Record<string, unknown> = { test_key: 'test' };
        const transformed: Record<string, unknown> = transformKeys(object, new BasaltPascalCaseTransformer());
        expect(transformed).toEqual({ TestKey: 'test' });
    });

    test('should return a transformed object with snake case keys', () => {
        const object: Record<string, unknown> = { testKey: 'test' };
        const transformed: Record<string, unknown> = transformKeys(object, new BasaltSnakeCaseTransformer());
        expect(transformed).toEqual({ test_key: 'test' });
    });

    test('should throw an error when data is null', () => {
        const object = null as unknown as Record<string, unknown>;
        expect(() => transformKeys(object, new BasaltCamelCaseTransformer())).toThrowError('basalt-helper.error.data_is_null');
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => transformKeys(object, new BasaltCamelCaseTransformer())).toThrowError('basalt-helper.error.data_must_be_object');
    });
});

describe('Basalt Camel Case Transformer', () => {
    test('should transform a key to camel case', () => {
        const transformer = new BasaltCamelCaseTransformer();
        expect(transformer.transformKey('MyKeyName')).toBe('myKeyName');
        expect(transformer.transformKey('my-key-name')).toBe('myKeyName');
        expect(transformer.transformKey('my_key_name')).toBe('myKeyName');
    });
});

describe('Basalt Kebab Case Transformer', () => {
    test('should transform a key to kebab case', () => {
        const transformer = new BasaltKebabCaseTransformer();
        expect(transformer.transformKey('myKeyName')).toBe('my-key-name');
        expect(transformer.transformKey('MyKeyName')).toBe('my-key-name');
        expect(transformer.transformKey('my_long_key_name')).toBe('my-long-key-name');
    });
});

describe('Basalt Pascal Case Transformer', () => {
    test('should transform a key to pascal case', () => {
        const transformer = new BasaltPascalCaseTransformer();
        expect(transformer.transformKey('myKeyName')).toBe('MyKeyName');
        expect(transformer.transformKey('my-key-name')).toBe('MyKeyName');
        expect(transformer.transformKey('my_key_name')).toBe('MyKeyName');
    });
});

describe('Basalt Snake Case Transformer', () => {
    test('should transform a key to snake case', () => {
        const transformer = new BasaltSnakeCaseTransformer();
        expect(transformer.transformKey('myKeyName')).toBe('my_key_name');
        expect(transformer.transformKey('MyKeyName')).toBe('my_key_name');
        expect(transformer.transformKey('my-long-key-name')).toBe('my_long_key_name');
    });
});