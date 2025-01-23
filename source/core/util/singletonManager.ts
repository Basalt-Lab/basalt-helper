import { BasaltError } from '#/error/basaltError';
import { CORE_UTIL_KEY_ERROR } from '#/error/key/coreUtilKeyError';

/**
 * SingletonManagerSingleton is a singleton class that manages the singletons in the application.
 * When a class is registered, the SingletonManagerSingleton creates a new instance of the class when it is requested.
 *
 * @example
 * ```typescript
 * class ExampleSingleton {
 *    private static _count = 0;
 *    private readonly _id: number;
 *
 *    public constructor() {
 *       ExampleSingleton._count += 1;
 *      this._id = ExampleSingleton._count;
 *      console.log(`ExampleSingleton created with ID: ${this._id}`);
 *    }
 *
 *    public sayHello(): void {
 *      console.log(`Hello from instance ${this._id}!`);
 *    }
 * }
 *
 * SingletonManager.register('ExampleSingleton', ExampleSingleton);
 *
 * SingletonManager.get<ExampleSingleton>('ExampleSingleton').sayHello(); // Output: ExampleSingleton created with ID: 1 /n Hello from instance 1!
 * SingletonManager.get<ExampleSingleton>('ExampleSingleton').sayHello(); // Output: Hello from instance 1!
 * ```
 */
class SingletonManagerSingleton {
    /**
     * _instance is a private static property that holds the singleton instance of the class. ({@link SingletonManagerSingleton})
     */
    private static _instance: SingletonManagerSingleton;

    /**
     * _classConstructor is a private property that holds the class constructors that are registered
     * in the SingletonManagerSingleton. The key is the name of the class and the value is the constructor of the class.
     */
    private readonly _registry = new Map<string, unknown>();

    /**
     * Constructor of the SingletonManagerSingleton class.
     *
     * @returns The singleton instance of the SingletonManagerSingleton class. ({@link SingletonManagerSingleton})
     */
    public static get instance(): SingletonManagerSingleton {
        if (!this._instance)
            this._instance = new SingletonManagerSingleton();
        return this._instance;
    }

    /**
     * Registers a class constructor in the SingletonManagerSingleton.
     *
     * @param name - The name of the class.
     * @typeParam T - The type of the class.
     * @param constructor - The constructor of the class.
     * @param args - The arguments to pass to the constructor of the class.
     *
     * @throws ({@link BasaltError}) If the class constructor is already registered, it throws an error. ({@link CORE_UTIL_KEY_ERROR.CLASS_CONSTRUCTOR_ALREADY_REGISTERED})
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public register<T>(name: string, constructor: new(...args: any[]) => T, ...args: unknown[]): void {
        if (this._registry.has(name))
            throw new BasaltError({
                key: CORE_UTIL_KEY_ERROR.CLASS_CONSTRUCTOR_ALREADY_REGISTERED,
                cause: { name }
            });
        this._registry.set(name, new constructor(...args));
    }

    /**
     * Unregisters a class from the SingletonManagerSingleton.
     *
     * @param name - The name of the class to unregister.
     *
     * @throws ({@link BasaltError}) If the class constructor is not registered, it throws an error. ({@link CORE_UTIL_KEY_ERROR.CLASS_CONSTRUCTOR_NOT_REGISTERED})
     */
    public unregister(name: string): void {
        if (!this._registry.has(name))
            throw new BasaltError({
                key: CORE_UTIL_KEY_ERROR.CLASS_CONSTRUCTOR_NOT_REGISTERED,
                cause: { name }
            });
        this._registry.delete(name);
    }

    /**
     * Gets the singleton instance of the class. If the class is not registered, it throws an error.
     *
     * @typeParam T - The type of the class.
     * @param name - The name of the class to get the singleton instance.
     *
     * @throws ({@link BasaltError}) If the class is not registered, it throws an error. ({@link CORE_UTIL_KEY_ERROR.CLASS_CONSTRUCTOR_NOT_REGISTERED})
     *
     * @returns The singleton instance of the class. ({@link T})
     */
    public get<T>(name: string): T {
        if (!this._registry.has(name))
            throw new BasaltError({
                key: CORE_UTIL_KEY_ERROR.CLASS_CONSTRUCTOR_NOT_REGISTERED,
                cause: { name }
            });
        return this._registry.get(name) as T;
    }

    /**
     * Checks if the class is registered in the SingletonManagerSingleton.
     *
     * @param name - The name of the class to check if it is registered.
     *
     * @returns True if the class is registered, otherwise false.
     */
    public has(name: string): boolean {
        return this._registry.has(name);
    }
}

/**
 * SingletonManager is an instance of the SingletonManagerSingleton class that manages the singletons in the application.
 * When a class is registered, the SingletonManagerSingleton creates a new instance of the class when it is requested.
 *
 * @example
 * ```typescript
 * class ExampleSingleton {
 *    private static _count = 0;
 *    private readonly _id: number;
 *
 *    public constructor() {
 *       ExampleSingleton._count += 1;
 *      this._id = ExampleSingleton._count;
 *      console.log(`ExampleSingleton created with ID: ${this._id}`);
 *    }
 *
 *    public sayHello(): void {
 *      console.log(`Hello from instance ${this._id}!`);
 *    }
 * }
 *
 * SingletonManager.register('ExampleSingleton', ExampleSingleton);
 *
 * SingletonManager.get<ExampleSingleton>('ExampleSingleton').sayHello(); // Output: ExampleSingleton created with ID: 1 /n Hello from instance 1!
 * SingletonManager.get<ExampleSingleton>('ExampleSingleton').sayHello(); // Output: Hello from instance 1!
 * ```
 */
export const SingletonManager = SingletonManagerSingleton.instance;
