import { BasaltJson } from '@/BasaltJson';

describe('BasaltJson', (): void => {
    describe('stringify', (): void => {
        it('should return a stringified object', (): void => {
            const object: object = { test: 'test' };
            const stringify: string = BasaltJson.stringify(object);
            expect(stringify).toEqual('{"test":"test"}');
        });
    });

    describe('parse', (): void => {
        it('should return a parsed object', (): void => {
            const stringify: string = '{"test":"test"}';
            const object: object = BasaltJson.parse(stringify);
            expect(object).toEqual({ test: 'test' });
        });
    });
});
