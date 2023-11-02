import { BasaltDeepCloneUtility } from '@/App';

describe('BasaltDeepCloneUtility', (): void => {
    describe('deepClone', (): void => {
        it('should throw an error for a null object', (): void => {
            expect((): void => {
                BasaltDeepCloneUtility.deepClone(null);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should throw an error for an undefined object', (): void => {
            expect((): void => {
                BasaltDeepCloneUtility.deepClone(undefined);
            }).toThrow('The provided data object is either null or undefined.');
        });

        it('should return a deep clone of a date object', (): void => {
            const date: Date = new Date();
            const clonedDate: Date = BasaltDeepCloneUtility.deepClone(date);
            expect(clonedDate).toEqual(date);
            expect(clonedDate).not.toBe(date);
        });

        it('should return a deep clone of a regex object', (): void => {
            const regex: RegExp = new RegExp('test');
            const clonedRegex: RegExp = BasaltDeepCloneUtility.deepClone(regex);
            expect(clonedRegex).toEqual(regex);
            expect(clonedRegex).not.toBe(regex);
        });

        it('should return a deep clone of an array', (): void => {
            const array: number[] = [1, 2, 3];
            const clonedArray: number[] = BasaltDeepCloneUtility.deepClone(array);
            expect(clonedArray).toEqual(array);
            expect(clonedArray).not.toBe(array);
        });

        it('should return a deep clone of an object', (): void => {
            const object: { [key: string]: any } = { test: 'test' };
            const clonedObject: { [key: string]: any } = BasaltDeepCloneUtility.deepClone(object);
            expect(clonedObject).toEqual(object);
            expect(clonedObject).not.toBe(object);
        });

        it('should return a deep clone of a nested object', (): void => {
            const object: { [key: string]: any } = { test: { test: 'test' } };
            const clonedObject: { [key: string]: unknown } = BasaltDeepCloneUtility.deepClone(object);
            expect(clonedObject).toEqual(object);
            expect(clonedObject).not.toBe(object);
            expect(clonedObject.test).toEqual(object.test);
            expect(clonedObject.test).not.toBe(object.test);
        });

        it('should return a deep clone of a nested array', (): void => {
            const array: number[][] = [[1, 2, 3], [4, 5, 6]];
            const clonedArray: number[][] = BasaltDeepCloneUtility.deepClone(array);
            expect(clonedArray).toEqual(array);
            expect(clonedArray).not.toBe(array);
            expect(clonedArray[0]).toEqual(array[0]);
            expect(clonedArray[0]).not.toBe(array[0]);
        });

        it('should return a deep clone of a nested object and array', (): void => {
            const object: { [key: string]: any } = { test: { test: [1, 2, 3] } };
            const clonedObject: { [key: string]: any } = BasaltDeepCloneUtility.deepClone(object);
            expect(clonedObject).toEqual(object);
            expect(clonedObject).not.toBe(object);
            expect(clonedObject.test).toEqual(object.test);
            expect(clonedObject.test).not.toBe(object.test);
            expect(clonedObject.test.test).toEqual(object.test.test);
            expect(clonedObject.test.test).not.toBe(object.test.test);
        });

        it('should return a deep clone of a nested array and object', (): void => {
            const array: { [key: string]: any }[] = [{ test: [1, 2, 3] }, { test: [4, 5, 6] }];
            const clonedArray: { [key: string]: any }[] = BasaltDeepCloneUtility.deepClone(array);
            expect(clonedArray).toEqual(array);
            expect(clonedArray).not.toBe(array);
            expect(clonedArray[0]).toEqual(array[0]);
            expect(clonedArray[0]).not.toBe(array[0]);
            expect(clonedArray[0].test).toEqual(array[0].test);
            expect(clonedArray[0].test).not.toBe(array[0].test);
        });
    });
});
