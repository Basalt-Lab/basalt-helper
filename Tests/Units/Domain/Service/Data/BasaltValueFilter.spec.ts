import { filterByValue } from '@/App';

describe('BasaltValueFilter', (): void => {

    it('should throw an error for a null data object', (): void => {
        expect((): void => {
            filterByValue(null as any, (): boolean => true);
        }).toThrow('DATA_NULL');
    });

    it('should throw an error for an undefined data object', (): void => {
        expect((): void => {
            filterByValue(undefined as any, (): boolean => true);
        }).toThrow('DATA_NULL');
    });

    it('should throw an error for a non-object data object', (): void => {
        expect((): void => {
            filterByValue('test' as any, (): boolean => true);
        }).toThrow('DATA_MUST_BE_PLAIN_OBJECT');
    });

    it('should filter data by value using a predicate', (): void => {
        const data: { a: number; b: number; c: number } = {
            a: 1,
            b: 2,
            c: 3,
        };
        const predicate = (value: number): boolean => value > 1;
        const filteredData: Object = filterByValue(data, predicate);
        expect(filteredData).toEqual({ b: 2, c: 3 });
    });

    it('should return the same object if the predicate always returns true', (): void => {
        const data: { x: string; y: string } = {
            x: 'include',
            y: 'include too',
        };
        const alwaysTruePredicate = (): boolean => true;
        const filteredData: Object = filterByValue(data, alwaysTruePredicate);
        expect(filteredData).toEqual(data);
    });

    it('should return an empty object if the predicate always returns false', (): void => {
        const data: { a: string; b: string } = {
            a: 'exclude',
            b: 'exclude too',
        };
        const alwaysFalsePredicate = (): boolean => false;
        const filteredData: Object = filterByValue(data, alwaysFalsePredicate);
        expect(filteredData).toEqual({});
    });

    it('should return the specified object if the predicate always returns true and excludeNullUndefined is true', (): void => {
        const data: { a: string; b: string, c: null, d: undefined } = {
            a: 'include',
            b: 'include too',
            c: null,
            d: undefined,
        };
        const alwaysTruePredicate = (): boolean => true;
        const filteredData: Object = filterByValue(data, alwaysTruePredicate, true);
        expect(filteredData).toEqual({ a: 'include', b: 'include too' });
    });

});
