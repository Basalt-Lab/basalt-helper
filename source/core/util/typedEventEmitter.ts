import { EventEmitter } from 'events';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventMap = Record<string | number | symbol, any>;

/**
 * A generic event emitter class that allows for type-safe event handling
 *
 * @template TEvents - The type of events and their payloads
 */
export class TypedEventEmitter<TEvents extends EventMap> extends EventEmitter {
    /**
     * Registers an event listener for the specified event
     *
     * @param event - The event name to listen for
     * @param listener - The callback function that handles the event
     * @returns This instance for chaining
     */
    public override on<K extends keyof TEvents>(event: K, listener: (payload: TEvents[K]) => void): this {
        return super.on(event as string, listener);
    }

    /**
     * Registers a one-time event listener for the specified event
     *
     * @param event - The event name to listen for
     * @param listener - The callback function that handles the event
     * @returns This instance for chaining
     */
    public override once<K extends keyof TEvents>(event: K, listener: (payload: TEvents[K]) => void): this {
        return super.once(event as string, listener);
    }

    /**
     * Emits an event with the specified payload
     *
     * @param event - The event name to emit
     * @param payload - The data to send with the event
     * @returns Whether the event had listeners
     */
    public override emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): boolean {
        return super.emit(event as string, payload);
    }
}
