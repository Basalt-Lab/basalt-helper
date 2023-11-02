import { BasaltKeyFilter } from '@/App';

describe('BasaltKeyFilter', (): void => {
    describe('constructor', (): void => {
        it('should throw an error for a null array of keys', (): void => {
            expect((): void => {
                new BasaltKeyFilter(null as unknown as (keyof object)[]);
            }).toThrow('The provided keys must be an array.');
        });

        it('should throw an error for an empty array of keys', (): void => {
            expect((): void => {
                new BasaltKeyFilter([]);
            }).toThrow('The provided array of keys to include is empty.');
        });
    });

    describe('filter', (): void => {
        it('should throw an error for a null data object', (): void => {
            expect((): void => {
                new BasaltKeyFilter(['test']).filter(null as any, false);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for an undefined data object', (): void => {
            expect((): void => {
                new BasaltKeyFilter(['test']).filter(undefined as any, false);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for a non-object data object', (): void => {
            expect((): void => {
                new BasaltKeyFilter(['test']).filter('test' as any, false);
            }).toThrow('The provided data object must be an object.');
        });

        it('should return a filtered object with the specified keys included', (): void => {
            const data: { [key: string]: string } = { test: 'test', test2: 'test2' };
            const filteredData: { [p: string]: string } = new BasaltKeyFilter<{ [key: string]: string }>(['test']).filter(data, false);
            expect(filteredData).toEqual({ test: 'test' });
        });

        it('should return a filtered object with the specified keys included and null values excluded', (): void => {
            const data: { [key: string]: any } = { test: 'test', test2: 'test2', test3: null };
            const filteredData: { [key: string]: any } = new BasaltKeyFilter<{ [key: string]: string }>(['test']).filter(data, true);
            expect(filteredData).toEqual({ test: 'test' });
        });

        it('should return a filtered object with the specified keys included and undefined values excluded', (): void => {
            const data: { [key: string]: any } = { test: 'test', test2: 'test2', test3: undefined };
            const filteredData: { [key: string]: any } = new BasaltKeyFilter<{ [key: string]: string }>(['test']).filter(data, true);
            expect(filteredData).toEqual({ test: 'test' });
        });
    });
});
