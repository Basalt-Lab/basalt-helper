import { afterAll, afterEach, describe, expect, test } from 'bun:test';

import {
    SingletonManager
} from '#/core/util/singletonManager';

class ExampleSingleton {
    public sayHello(): void {
        console.log('Hello!');
    }
}

describe('SingletonManager', () => {
    describe('register', () => {
        afterEach(() => {
            if (SingletonManager.has('ExampleSingleton'))
                SingletonManager.unregister('ExampleSingleton');
        });
        test('should register a class constructor', () => {
            SingletonManager.register('ExampleSingleton', ExampleSingleton);
            expect(SingletonManager.get('ExampleSingleton')).toBeDefined();
        });

        test('should throw an error when class constructor is not registered', () => {
            expect(() => SingletonManager.get('ExampleSingleton3')).toThrow('error.basalt-helper.class_constructor_not_registered');
        });

        test('should throw an error when class constructor is already registered', () => {
            SingletonManager.register('ExampleSingleton', ExampleSingleton);
            expect(
                () => SingletonManager.register('ExampleSingleton', ExampleSingleton)
            ).toThrow('error.basalt-helper.class_constructor_already_registered');
        });
    });

    describe('unregister', () => {
        test('should unregister a class constructor', () => {
            SingletonManager.register('ExampleSingleton', ExampleSingleton);
            SingletonManager.unregister('ExampleSingleton');
            expect(SingletonManager.has('ExampleSingleton')).toBe(false);
        });

        test('should throw an error when class constructor is not registered', () => {
            expect(() => {
                SingletonManager.unregister('ExampleSingleton');
            }).toThrow('error.basalt-helper.class_constructor_not_registered');
        });
    });

    describe('has', () => {
        afterEach(() => {
            if (SingletonManager.has('ExampleSingleton'))
                SingletonManager.unregister('ExampleSingleton');
        });
        test('should have a class constructor', () => {
            SingletonManager.register('ExampleSingleton', ExampleSingleton);
            expect(SingletonManager.has('ExampleSingleton')).toBe(true);
        });
    });

    describe('get', () => {
        afterEach(() => {
            if (SingletonManager.has('ExampleSingleton'))
                SingletonManager.unregister('ExampleSingleton');
        });
        test('should return a class constructor', () => {
            SingletonManager.register('ExampleSingleton', ExampleSingleton);
            expect(SingletonManager.get('ExampleSingleton')).toBeDefined();
        });
    });
});