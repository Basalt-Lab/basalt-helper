import { describe, expect, test } from 'bun:test';

import {
    GLOBAL_ERRORS
} from '../../../../source/common/error/global.error';
import {
    deepClone,
    filterByKeyExclusion,
    filterByKeyInclusion,
    filterByValue,
    transformKeys,
} from '../../../../source/domain/service/data/basaltData.service';
import { BasaltCamelCaseTransformer } from '../../../../source/domain/service/data/strategy/transformer/basaltCamelCase.strategy';
import { BasaltKebabCaseTransformer } from '../../../../source/domain/service/data/strategy/transformer/basaltKebabCase.strategy';
import { BasaltPascalCaseTransformer } from '../../../../source/domain/service/data/strategy/transformer/basaltPascalCase.strategy';
import { BasaltSnakeCaseTransformer } from '../../../../source/domain/service/data/strategy/transformer/basaltSnakeCase.strategy';


describe('Deep Clone', () => {
    test('should return a deep clone', () => {
        const object: object = { test: 'test' };
        const clone: object = deepClone(object);
        expect(clone).toEqual(object);
        expect(clone).not.toBe(object);
    });

    test('should return a deep clone of an array', () => {
        const array: object[] = [{ test: 'test' }];
        const clone: object[] = deepClone(array);
        expect(clone).toEqual(array);
        expect(clone).not.toBe(array);
    });

    test('should return a deep clone of a date', () => {
        const date: Date = new Date();
        const clone: Date = deepClone(date);
        expect(clone).toEqual(date);
        expect(clone).not.toBe(date);
    });

    test('should return a deep clone of a regular expression', () => {
        const regex: RegExp = /test/;
        const clone: RegExp = deepClone(regex);
        expect(clone).toEqual(regex);
        expect(clone).not.toBe(regex);
    });

    test('should return a deep clone of a nested object', () => {
        const object: Record<string, unknown> = { test: { test: 'test' } };
        const clone: Record<string, unknown> = deepClone(object);
        expect(clone).toEqual(object);
        expect(clone).not.toBe(object);
        expect(clone.test).toEqual(object.test);
        expect(clone.test).not.toBe(object.test);   
    });

    test('shoud throw an error when data is null', () => {
        expect(() => deepClone(null)).toThrowError(GLOBAL_ERRORS.DATA_IS_NULL[0]);
    });
});

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
        expect(() => filterByKeyExclusion(object, [])).toThrowError(GLOBAL_ERRORS.DATA_IS_NULL[0]);
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => filterByKeyExclusion(object, [])).toThrowError(GLOBAL_ERRORS.DATA_MUST_BE_OBJECT[0]);
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
        expect(() => filterByKeyInclusion(object, [])).toThrowError(GLOBAL_ERRORS.DATA_IS_NULL[0]);
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => filterByKeyInclusion(object, [])).toThrowError(GLOBAL_ERRORS.DATA_MUST_BE_OBJECT[0]);
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
        expect(() => filterByValue(object, () => true)).toThrowError(GLOBAL_ERRORS.DATA_IS_NULL[0]);
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => filterByValue(object, () => true)).toThrowError(GLOBAL_ERRORS.DATA_MUST_BE_OBJECT[0]);
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
        expect(() => transformKeys(object, new BasaltCamelCaseTransformer())).toThrowError(GLOBAL_ERRORS.DATA_IS_NULL[0]);
    });

    test('should throw an error when data is not a plain object', () => {
        const object = 2 as unknown as Record<string, unknown>;
        expect(() => transformKeys(object, new BasaltCamelCaseTransformer())).toThrowError(GLOBAL_ERRORS.DATA_MUST_BE_OBJECT[0]);
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