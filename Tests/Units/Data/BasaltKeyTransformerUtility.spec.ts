import {
    BasaltKeyTransformerUtility,
    BasaltPascalCaseTransformer,
    BasaltCamelCaseTransformer,
    BasaltKebabCaseTransformer,
    BasaltSnakeCaseTransformer
} from '@/App';

describe('BasaltKeyTransformerUtility', (): void => {
    describe('transformKeys', (): void => {
        it('should throw an error for a null data object', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltPascalCaseTransformer());
            expect((): void => {
                utility.transformKeys(null as any);
            }).toThrowError('The provided data object is either null or undefined.');
        });

        it('should throw an error for an undefined data object', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltPascalCaseTransformer());
            expect((): void => {
                utility.transformKeys(undefined as any);
            }).toThrowError('The provided data object is either null or undefined.');
        });

        it('should throw an error for a non-object data object', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltPascalCaseTransformer());
            expect((): void => {
                utility.transformKeys(1 as any);
            }).toThrowError('The data object must be an object.');
        });

        it('should transform keys to PascalCase', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltPascalCaseTransformer());
            const data: any = {
                'foo': 'bar',
                'baz': 'qux',
                'quux': 'corge',
                'gra-ult': 'garply',
                'wal_do': 'fred'
            };
            const result: any = utility.transformKeys(data);
            expect(result).toEqual({
                'Foo': 'bar',
                'Baz': 'qux',
                'Quux': 'corge',
                'GraUlt': 'garply',
                'WalDo': 'fred'
            });
        });

        it('should transform keys to camelCase', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltCamelCaseTransformer());
            const data: any = {
                'Foo': 'bar',
                'Baz': 'qux',
                'Quux': 'corge',
                'gra-ult': 'garply',
                'Wa_ldo': 'fred'
            };
            const result: any = utility.transformKeys(data);
            expect(result).toEqual({
                'foo': 'bar',
                'baz': 'qux',
                'quux': 'corge',
                'graUlt': 'garply',
                'waLdo': 'fred'
            });
        });

        it('should transform keys to kebab-case', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltKebabCaseTransformer());
            const data: any = {
                'Foo': 'bar',
                'bazArd': 'qux',
                'QuUx': 'corge',
                'gra-ult': 'garply',
                'Wa_ldo': 'fred'
            };
            const result: any = utility.transformKeys(data);
            expect(result).toEqual({
                'foo': 'bar',
                'baz-ard': 'qux',
                'qu-ux': 'corge',
                'gra-ult': 'garply',
                'wa-ldo': 'fred'
            });
        });

        it('should transform keys to snake_case', (): void => {
            const utility: BasaltKeyTransformerUtility = new BasaltKeyTransformerUtility(new BasaltSnakeCaseTransformer());
            const data: any = {
                'Foo': 'bar',
                'bazArd': 'qux',
                'QuUx': 'corge',
                'gra-ult': 'garply',
                'Wa_ldo': 'fred'
            };
            const result: any = utility.transformKeys(data);
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
