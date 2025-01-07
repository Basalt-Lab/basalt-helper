/* eslint-disable max-classes-per-file */
import { afterAll, afterEach, describe, expect, test } from 'bun:test';

import {
    SingletonManager
} from '#/core/util/singletonManager';

class ExampleSingleton {
    public sayHello(): void {
        console.log('Hello!');
    }
}

class ExampleSingleton2 {
    private readonly _name: string;

    public constructor(name: string) {
        this._name = name;
    }

    public sayHello(): void {
        console.log(`Hello, ${this._name}!`);
    }
}

class ExampleSingleton3 {
    private readonly _name: string;

    private readonly _age: number;

    public constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    public sayHello(): void {
        console.log(`Hello, ${this._name}, you are ${this._age} years old!`);
    }

    public get age(): number {
        return this._age;
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

    describe('get', () => {
        afterEach(() => {
            if (SingletonManager.has('ExampleSingleton'))
                SingletonManager.unregister('ExampleSingleton');
            if (SingletonManager.has('ExampleSingleton2'))
                SingletonManager.unregister('ExampleSingleton2');
            if (SingletonManager.has('ExampleSingleton3'))
                SingletonManager.unregister('ExampleSingleton3');
        });
        test('should return a class constructor', () => {
            SingletonManager.register('ExampleSingleton', ExampleSingleton);
            expect(SingletonManager.get('ExampleSingleton')).toBeDefined();
        });

        test('should return a class constructor with arguments', () => {
            SingletonManager.register('ExampleSingleton2', ExampleSingleton2);
            SingletonManager.register('ExampleSingleton3', ExampleSingleton3);

            const example = SingletonManager.get<ExampleSingleton2>('ExampleSingleton2', 'John');
            const example2 = SingletonManager.get<ExampleSingleton3>('ExampleSingleton3', 'John', 25);
            example.sayHello();
            example2.sayHello();
            expect(SingletonManager.get('ExampleSingleton2', 'John')).toBeDefined();
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
});