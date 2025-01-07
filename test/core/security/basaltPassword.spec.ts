
import { describe, expect, mock, test } from 'bun:test';

import { hashPassword, verifyPassword } from '#/core/security/password';

describe('verifyPassword', () => {
    test('should verify a password', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword(password);
        const isCorrect = await verifyPassword(password, hashedPassword);
        expect(isCorrect).toBe(true);
    });

    test('should throw an error when password is empty', () => {
        const password = '';
        const hashedPassword = 'hashedPassword';
        expect(async () => await verifyPassword(password, hashedPassword)).toThrowError('error.basalt-helper.password_empty');
    });

    test('should return false when password is incorrect', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword('hashedPassword');
        const isCorrect = await verifyPassword(password, hashedPassword);
        expect(isCorrect).toBe(false);
    });

    test('should throw an error when verification fails', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword(password);
        await mock.module('argon2', () => ({
            verify: (): void => {
                throw new Error('oui');
            }
        }));
        expect(async () => await verifyPassword(password, hashedPassword)).toThrowError('error.basalt-helper.password_verification_failed');
        mock.restore();
    });
});

describe('hashPassword', () => {
    test('should hash a password', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword(password);
        expect(hashedPassword).not.toBe(password);
    });

    test('should throw an error when password is empty', () => {
        expect(async () => await hashPassword('')).toThrowError('error.basalt-helper.password_empty');
    });

    test('should throw an error when hashing fails', async () => {
        const password = 'password';
        await mock.module('argon2', () => ({
            hash: (): void => {
                throw new Error('oui');
            }
        }));
        expect(async () => await hashPassword(password)).toThrowError('error.basalt-helper.password_hashing_failed');
    });
});