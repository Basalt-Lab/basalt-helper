import { BasaltKeyExclusionFilter } from '@/App';

describe('BasaltKeyExclusionFilter', (): void => {
    describe('filter', (): void => {
        it('should throw an error for a null array of keys', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            expect((): void => {
                keyExclusionFilter.filter(null as any, null as any);
            }).toThrow('The provided keys must be an array.');
        });

        it('should throw an error for an empty array of keys', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            expect((): void => {
                keyExclusionFilter.filter(null as any, []);
            }).toThrow('The provided array of keys to exclude is empty.');
        });

        it('should throw an error for a null data object', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            expect((): void => {
                keyExclusionFilter.filter(null as any, ['test']);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for an undefined data object', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            expect((): void => {
                keyExclusionFilter.filter(undefined as any, ['test']);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for a non-object data object', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            expect((): void => {
                keyExclusionFilter.filter('test' as any, ['test']);
            }).toThrow('The provided data object must be an object.');
        });

        it('should return a filtered object with the specified keys excluded', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            const data: { test2: string; test: string } = {
                test: 'test',
                test2: 'test2'
            };
            type WantType = {
                test2: string;
            };
            const filteredData: WantType = keyExclusionFilter.filter(data, ['test']);
            expect(filteredData).toEqual({ test2: 'test2' });
        });

        it('should return a filtered object with the specified keys excluded, null and undefined values excluded', (): void => {
            const keyExclusionFilter: BasaltKeyExclusionFilter = new BasaltKeyExclusionFilter();
            const data: { test4: undefined; test2: string; test3: null; test: string } = {
                test: 'test',
                test2: 'test2',
                test3: null,
                test4: undefined
            };

            type WantType = {
                test2: string;
            };

            const filteredData: WantType = keyExclusionFilter.filter(data, ['test'], true);
            expect(filteredData).toEqual({ test2: 'test2' });
        });

    });
});
