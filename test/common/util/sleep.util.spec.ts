import { describe, expect, test } from 'bun:test';

import { sleep } from '../../../source/common/util/sleep';

describe('sleep', () => {
    test('should return a promise', async () => {
        const promise: Promise<void> = sleep(1000);
        expect(promise).toBeInstanceOf(Promise);
    });

    test('should return a promise resolved', async () => {
        const time: number = new Date().getTime();
        await sleep(1000);
        const diff: number = new Date().getTime() - time;
        expect(diff).toBeGreaterThanOrEqual(1000);
    });
});
