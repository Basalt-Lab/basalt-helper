import { BasaltValueFilter } from '@/App';

describe('BasaltValueFilter', (): void => {
    it('should filter data by value using a predicate', (): void => {
        const data: { a: number; b: number; c: number } = {
            a: 1,
            b: 2,
            c: 3,
        };
        const predicate = (value: number): boolean => value > 1;
        const valueFilter: BasaltValueFilter<object> = new BasaltValueFilter(predicate);
        const filteredData: Object = valueFilter.filter(data);
        expect(filteredData).toEqual({ b: 2, c: 3 });
    });

    it('should return the same object if the predicate always returns true', (): void => {
        const data: { x: string; y: string } = {
            x: 'include',
            y: 'include too',
        };
        const alwaysTruePredicate = (): boolean => true;
        const valueFilter: BasaltValueFilter<object> = new BasaltValueFilter(alwaysTruePredicate);
        const filteredData: Object = valueFilter.filter(data);
        expect(filteredData).toEqual(data);
    });

    it('should return an empty object if the predicate always returns false', (): void => {
        const data: { a: string; b: string } = {
            a: 'exclude',
            b: 'exclude too',
        };
        const alwaysFalsePredicate = (): boolean => false;
        const valueFilter: BasaltValueFilter<object> = new BasaltValueFilter(alwaysFalsePredicate);
        const filteredData: Object = valueFilter.filter(data);
        expect(filteredData).toEqual({});
    });
});
