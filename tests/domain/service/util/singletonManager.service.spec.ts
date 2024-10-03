import { describe, expect, test } from 'bun:test';

import {
    SingletonManager    
} from '../../../../source/domain/service/util';

import {
    ErrorKeys
} from '../../../../source/common/error';

class ExampleSingleton {
    public sayHello(): void {
        console.log('Hello!');
    }
}

describe('SingletonManager', () => {
    test('should register a class constructor', () => {
        SingletonManager.register('ExampleSingleton', ExampleSingleton);
        expect(SingletonManager.get('ExampleSingleton')).toBeDefined();
    });

    test('should register a class constructor with a name', () => {
        SingletonManager.register('ExampleSingleton2', ExampleSingleton);
        expect(SingletonManager.get('ExampleSingleton2')).toBeDefined();
        expect(SingletonManager.get<ExampleSingleton>('ExampleSingleton2').sayHello).toBeDefined(); 
    });

    test('should throw an error when class constructor is not registered', () => {
        try {
            SingletonManager.get('ExampleSingleton3');
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.CLASS_CONSTRUCTOR_NOT_REGISTERED);
        }
    });

    test('should throw an error when class constructor is already registered', () => {
        SingletonManager.register('ExampleSingleton4', ExampleSingleton);
        try {
            SingletonManager.register('ExampleSingleton4', ExampleSingleton);
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.CLASS_CONSTRUCTOR_ALREADY_REGISTERED);
        }
    });

    test('should unregister a class constructor', async () => {
        SingletonManager.register('ExampleSingleton5', ExampleSingleton);
        SingletonManager.unregister('ExampleSingleton5');
        expect(SingletonManager.has('ExampleSingleton5')).toBe(false);
    });

    test('should throw an error when class constructor is not registered', () => {
        try {
            SingletonManager.unregister('ExampleSingleton6');
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.CLASS_CONSTRUCTOR_NOT_REGISTERED);
        }
    });

    test('should have a class constructor', () => {
        SingletonManager.register('ExampleSingleton7', ExampleSingleton);
        expect(SingletonManager.has('ExampleSingleton7')).toBe(true);
    });

    test('should return a class constructor', () => {
        SingletonManager.register('ExampleSingleton8', ExampleSingleton);
        expect(SingletonManager.get('ExampleSingleton8')).toBeDefined();
    });
});