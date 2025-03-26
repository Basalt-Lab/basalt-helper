import { describe, expect, mock, test } from 'bun:test';

import { TypedEventEmitter } from '#/core/util/typedEventEmitter';

// Define test event interfaces
interface TestEvents {
    testEvent: string;
    dataEvent: { id: number; value: string };
    noPayloadEvent: void;
}

describe('TypedEventEmitter', () => {
    describe('emit and on', () => {
        test('should emit and listen to an event with string payload', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener = mock();
            
            emitter.on('testEvent', mockListener);
            emitter.emit('testEvent', 'test payload');
            
            expect(mockListener).toHaveBeenCalledTimes(1);
            expect(mockListener).toHaveBeenCalledWith('test payload');
        });
        
        test('should emit and listen to an event with object payload', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener = mock();
            const testData = { id: 123, value: 'test value' };
            
            emitter.on('dataEvent', mockListener);
            emitter.emit('dataEvent', testData);
            
            expect(mockListener).toHaveBeenCalledTimes(1);
            expect(mockListener).toHaveBeenCalledWith(testData);
        });
        
        test('should handle multiple listeners for the same event', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener1 = mock();
            const mockListener2 = mock();
            
            emitter.on('testEvent', mockListener1);
            emitter.on('testEvent', mockListener2);
            emitter.emit('testEvent', 'test payload');
            
            expect(mockListener1).toHaveBeenCalledTimes(1);
            expect(mockListener2).toHaveBeenCalledTimes(1);
        });
        
        test('should not call listeners for different events', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener1 = mock();
            const mockListener2 = mock();
            
            emitter.on('testEvent', mockListener1);
            emitter.on('dataEvent', mockListener2);
            emitter.emit('testEvent', 'test payload');
            
            expect(mockListener1).toHaveBeenCalledTimes(1);
            expect(mockListener2).not.toHaveBeenCalled();
        });
    });
    
    describe('once', () => {
        test('should listen to an event only once', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener = mock();
            
            emitter.once('testEvent', mockListener);
            emitter.emit('testEvent', 'first emission');
            emitter.emit('testEvent', 'second emission');
            
            expect(mockListener).toHaveBeenCalledTimes(1);
            expect(mockListener).toHaveBeenCalledWith('first emission');
        });
    });
    
    describe('removeListener and removeAllListeners', () => {
        test('should remove a specific listener', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener1 = mock();
            const mockListener2 = mock();
            
            emitter.on('testEvent', mockListener1);
            emitter.on('testEvent', mockListener2);
            
            emitter.removeListener('testEvent', mockListener1);
            emitter.emit('testEvent', 'test payload');
            
            expect(mockListener1).not.toHaveBeenCalled();
            expect(mockListener2).toHaveBeenCalledTimes(1);
        });
        
        test('should remove all listeners for an event', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            const mockListener1 = mock();
            const mockListener2 = mock();
            
            emitter.on('testEvent', mockListener1);
            emitter.on('testEvent', mockListener2);
            
            emitter.removeAllListeners('testEvent');
            emitter.emit('testEvent', 'test payload');
            
            expect(mockListener1).not.toHaveBeenCalled();
            expect(mockListener2).not.toHaveBeenCalled();
        });
    });
    
    describe('type safety', () => {
        test('should maintain type safety for event payloads', () => {
            const emitter = new TypedEventEmitter<TestEvents>();
            
            // This is primarily a compile-time check, but we can test runtime behavior
            const mockListener = mock();
            emitter.on('dataEvent', mockListener);
            
            const payload = { id: 456, value: 'typed value' };
            emitter.emit('dataEvent', payload);
            
            expect(mockListener).toHaveBeenCalledWith(payload);
        });
    });
});

