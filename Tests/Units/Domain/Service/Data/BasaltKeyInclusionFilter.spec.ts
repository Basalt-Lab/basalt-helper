import { filterByKeyInclusion } from '@/App';

describe('BasaltKeyInclusionFilter', (): void => {
    describe('filter', (): void => {
        it('should throw an error for a null array of keys', (): void => {
            expect((): void => {
                filterByKeyInclusion({}, null as any);
            }).toThrow('DATA_EMPTY_KEYS');
        });

        it('should throw an error for an empty array of keys', (): void => {
            expect((): void => {
                filterByKeyInclusion({}, []);
            }).toThrow('DATA_EMPTY_KEYS');
        });

        it('should throw an error for a null data object', (): void => {
            expect((): void => {
                filterByKeyInclusion(null as any, ['test']);
            }).toThrow('DATA_NULL');
        });

        it('should throw an error for an undefined data object', (): void => {
            expect((): void => {
                filterByKeyInclusion(undefined as any, ['test']);
            }).toThrow('DATA_NULL');
        });

        it('should throw an error for a non-object data object', (): void => {
            expect((): void => {
                filterByKeyInclusion('test' as any, ['test']);
            }).toThrow('DATA_MUST_BE_PLAIN_OBJECT');
        });

        it('should return a filtered object with the specified keys included', (): void => {
            const data: { a: string; b: string; c: string; d: string } = {
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
            };

            type WantType = {
                a: string;
                b: string;
                c: string;
            };

            const filteredData: WantType = filterByKeyInclusion(data, ['a', 'b', 'c']);
            expect(filteredData).toEqual({ a: 'a', b: 'b', c: 'c' });
        });

        it('should return a filtered object with the specified keys included and null values excluded', (): void => {

            const data: { a: string; b: null; c: string; d: string } = {
                a: 'a',
                b: null,
                c: 'c',
                d: 'd',
            };

            const filteredData = filterByKeyInclusion(data, ['a', 'b', 'c'], true);
            expect(filteredData).toEqual({ a: 'a', c: 'c' });

        });

        it('should return a filtered object with the specified keys included and undefined values excluded', (): void => {

            const data: { a: string; b: undefined; c: string; d: string } = {
                a: 'a',
                b: undefined,
                c: 'c',
                d: 'd',
            };

            const filteredData = filterByKeyInclusion(data, ['a', 'b', 'c'], true);
            expect(filteredData).toEqual({ a: 'a', c: 'c' });
        });
    });
});
