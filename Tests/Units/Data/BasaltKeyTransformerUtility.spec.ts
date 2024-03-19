import {
    transformKeys,
    BasaltPascalCaseTransformer,
    BasaltCamelCaseTransformer,
    BasaltKebabCaseTransformer,
    BasaltSnakeCaseTransformer
} from '../../../Source/App';

describe('BasaltKeyTransformerUtility', (): void => {
    describe('transformKeys', (): void => {
        it('should throw an error for a null data object', (): void => {
            expect((): void => {
                transformKeys(null as any, new BasaltPascalCaseTransformer());
            }).toThrow('BASALT_DATA_NULL');
        });

        it('should throw an error for an undefined data object', (): void => {
            expect((): void => {
                transformKeys(undefined as any, new BasaltPascalCaseTransformer());
            }).toThrow('BASALT_DATA_NULL');
        });

        it('should throw an error for a non-object data object', (): void => {
            expect((): void => {
                transformKeys(1 as any, new BasaltPascalCaseTransformer());
            }).toThrow('BASALT_DATA_MUST_BE_PLAIN_OBJECT');
        });

        it('should transform keys to PascalCase', (): void => {
            const data: any = {
                'foo': 'bar',
                'baz': 'qux',
                'quux': 'corge',
                'gra-ult': 'garply',
                'wal_do': 'fred'
            };
            const result: any = transformKeys(data, new BasaltPascalCaseTransformer());
            expect(result).toEqual({
                'Foo': 'bar',
                'Baz': 'qux',
                'Quux': 'corge',
                'GraUlt': 'garply',
                'WalDo': 'fred'
            });
        });

        it('should transform keys to camelCase', (): void => {
            const data: any = {
                'Foo': 'bar',
                'Baz': 'qux',
                'Quux': 'corge',
                'gra-ult': 'garply',
                'Wa_ldo': 'fred'
            };
            const result: any = transformKeys(data, new BasaltCamelCaseTransformer());
            expect(result).toEqual({
                'foo': 'bar',
                'baz': 'qux',
                'quux': 'corge',
                'graUlt': 'garply',
                'waLdo': 'fred'
            });
        });

        it('should transform keys to kebab-case', (): void => {
            const data: any = {
                'Foo': 'bar',
                'bazArd': 'qux',
                'QuUx': 'corge',
                'gra-ult': 'garply',
                'Wa_ldo': 'fred'
            };
            const result: any = transformKeys(data, new BasaltKebabCaseTransformer());
            expect(result).toEqual({
                'foo': 'bar',
                'baz-ard': 'qux',
                'qu-ux': 'corge',
                'gra-ult': 'garply',
                'wa-ldo': 'fred'
            });
        });

        it('should transform keys to snake_case', (): void => {
            const data: any = {
                'Foo': 'bar',
                'bazArd': 'qux',
                'QuUx': 'corge',
                'gra-ult': 'garply',
                'Wa_ldo': 'fred'
            };
            const result: any = transformKeys(data, new BasaltSnakeCaseTransformer());
            expect(result).toEqual({
                'foo': 'bar',
                'baz_ard': 'qux',
                'qu_ux': 'corge',
                'gra_ult': 'garply',
                'wa_ldo': 'fred'
            });
        });

    });
});
