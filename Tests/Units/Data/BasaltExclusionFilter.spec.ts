import { BasaltExclusionFilter } from '@/App';

describe('BasaltExclusionFilter', (): void => {
    describe('constructor', (): void => {
        it('should throw an error for a null array of keys', (): void => {
            expect((): void => {
                new BasaltExclusionFilter(null as unknown as (keyof object)[]);
            }).toThrow('The provided keys must be an array.');
        });

        it('should throw an error for an empty array of keys', (): void => {
            expect((): void => {
                new BasaltExclusionFilter([]);
            }).toThrow('The provided array of keys to exclude is empty.');
        });
    });

    describe('filter', (): void => {
        it('should throw an error for a null data object', (): void => {
            expect((): void => {
                new BasaltExclusionFilter(['test']).filter(null as any, false);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for an undefined data object', (): void => {
            expect((): void => {
                new BasaltExclusionFilter(['test']).filter(undefined as any, false);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for a non-object data object', (): void => {
            expect((): void => {
                new BasaltExclusionFilter(['test']).filter('test' as any, false);
            }).toThrow('The provided data object must be an object.');
        });

        it('should return a filtered object with the specified keys excluded', (): void => {
            const data: { [key: string]: string } = { test: 'test', test2: 'test2' };
            const filteredData: { [p: string]: string } = new BasaltExclusionFilter<{ [key: string]: string }>(['test']).filter(data, false);
            expect(filteredData).toEqual({ test2: 'test2' });
        });

        it('should return a filtered object with the specified keys excluded and null values excluded', (): void => {
            const data: { [key: string]: any } = { test: 'test', test2: 'test2', test3: null };
            const filteredData: { [key: string]: any } = new BasaltExclusionFilter<{ [key: string]: string }>(['test']).filter(data, true);
            expect(filteredData).toEqual({ test2: 'test2' });
        });

    });
});
