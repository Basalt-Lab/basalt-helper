import { Json } from '@/Json';

describe('Json', (): void => {
    describe('stringify', (): void => {
        it('should return a stringified object', (): void => {
            const object: object = { test: 'test' };
            const stringify: string = Json.stringify(object);
            expect(stringify).toEqual('{"test":"test"}');
        });
    });

    describe('parse', (): void => {
        it('should return a parsed object', (): void => {
            const stringify: string = '{"test":"test"}';
            const object: object = Json.parse(stringify);
            expect(object).toEqual({ test: 'test' });
        });
    });
});
