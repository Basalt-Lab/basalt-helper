import { BasaltKeyInclusionFilter } from '@/App';

describe('BasaltKeyInclusionFilter', (): void => {
    describe('filter', (): void => {
        it('should throw an error for a null array of keys', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();
            expect((): void => {
                keyInclusionFilter.filter(null as any, null as any);
            }).toThrow('The provided keys must be an array.');
        });

        it('should throw an error for an empty arraay of keys', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();
            expect((): void => {
                keyInclusionFilter.filter(null as any, []);
            }).toThrow('The provided array of keys to include is empty.');
        });
        it('should throw an error for a null data object', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();
            expect((): void => {
                keyInclusionFilter.filter(null as any, ['test']);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for an undefined data object', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();
            expect((): void => {
                keyInclusionFilter.filter(undefined as any, ['test']);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for a non-object data object', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();
            expect((): void => {
                keyInclusionFilter.filter('test' as any, ['test']);
            }).toThrow('The provided data object must be an object.');
        });

        it('should return a filtered object with the specified keys included', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();
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

            const filteredData: WantType = keyInclusionFilter.filter(data, ['a', 'b', 'c']);
            expect(filteredData).toEqual({ a: 'a', b: 'b', c: 'c' });
        });

        it('should return a filtered object with the specified keys included and null values excluded', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();

            const data: { a: string; b: null; c: string; d: string } = {
                a: 'a',
                b: null,
                c: 'c',
                d: 'd',
            };

            const filteredData = keyInclusionFilter.filter(data, ['a', 'b', 'c'], true);
            expect(filteredData).toEqual({ a: 'a', c: 'c' });

        });

        it('should return a filtered object with the specified keys included and undefined values excluded', (): void => {
            const keyInclusionFilter: BasaltKeyInclusionFilter = new BasaltKeyInclusionFilter();

            const data: { a: string; b: undefined; c: string; d: string } = {
                a: 'a',
                b: undefined,
                c: 'c',
                d: 'd',
            };

            const filteredData = keyInclusionFilter.filter(data, ['a', 'b', 'c'], true);
            expect(filteredData).toEqual({ a: 'a', c: 'c' });
        });
    });
});
