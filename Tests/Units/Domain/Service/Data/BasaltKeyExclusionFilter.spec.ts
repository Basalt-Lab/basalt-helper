import { filterByKeyExclusion } from '@/App';

describe('BasaltKeyExclusionFilter', (): void => {
    describe('filter', (): void => {
        it('should throw an error for a null array of keys', (): void => {
            expect((): void => {
                filterByKeyExclusion({}, null as any);
            }).toThrow('DATA_EMPTY_KEYS');
        });

        it('should throw an error for an empty array of keys', (): void => {
            expect((): void => {
                filterByKeyExclusion({}, []);
            }).toThrow('DATA_EMPTY_KEYS');
        });

        it('should throw an error for a null data object', (): void => {
            expect((): void => {
                filterByKeyExclusion(null as any, ['test']);
            }).toThrow('DATA_NULL');
        });

        it('should throw an error for an undefined data object', (): void => {
            expect((): void => {
                filterByKeyExclusion(undefined as any, ['test']);
            }).toThrow('DATA_NULL');
        });

        it('should throw an error for a non-object data object', (): void => {
            expect((): void => {
                filterByKeyExclusion('test' as any, ['test']);
            }).toThrow('DATA_MUST_BE_PLAIN_OBJECT');
        });

        it('should return a filtered object with the specified keys excluded', (): void => {
            const data: { test2: string; test: string } = {
                test: 'test',
                test2: 'test2'
            };
            type WantType = {
                test2: string;
            };
            const filteredData: WantType = filterByKeyExclusion(data, ['test']);
            expect(filteredData).toEqual({ test2: 'test2' });
        });

        it('should return a filtered object with the specified keys excluded, null and undefined values excluded', (): void => {
            const data: { test4: undefined; test2: string; test3: null; test: string } = {
                test: 'test',
                test2: 'test2',
                test3: null,
                test4: undefined
            };

            type WantType = {
                test2: string;
            };

            const filteredData: WantType = filterByKeyExclusion(data, ['test'], true);
            expect(filteredData).toEqual({ test2: 'test2' });
        });

    });
});
