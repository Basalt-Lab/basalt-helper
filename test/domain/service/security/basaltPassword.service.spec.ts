
import { describe, expect, mock, test } from 'bun:test';

import {
    GLOBAL_ERRORS
} from '../../../../source/common/error/global.error';
import {
    hashPassword,
    verifyPassword
} from '../../../../source/domain/service/security/basaltPassword.service';

describe('verifyPassword', () => {
    test('should verify a password', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword(password);
        const isCorrect = await verifyPassword(password, hashedPassword);
        expect(isCorrect).toBe(true);
    });

    test('should throw an error when password is empty', async () => {
        const password = '';
        const hashedPassword = 'hashedPassword';
        await expect(async () => await verifyPassword(password, hashedPassword)).toThrowError(GLOBAL_ERRORS.PASSWORD_EMPTY[0]);
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
        mock.module('argon2', () => ({
            verify: async () => {
                throw new Error('oui');
            },
        }));
        await expect(async () => await verifyPassword(password, hashedPassword)).toThrowError(GLOBAL_ERRORS.PASSWORD_VERIFICATION_FAILED[0]);
        mock.restore();
    });
});

describe('hashPassword', () => {
    test('should hash a password', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword(password);
        expect(hashedPassword).not.toBe(password);
    });

    test('should throw an error when password is empty', async () => {
        await expect(async () => await hashPassword('')).toThrowError(GLOBAL_ERRORS.PASSWORD_EMPTY[0]);
    });

    test('should throw an error when hashing fails', async () => {
        const password = 'password';
        mock.module('argon2', () => ({
            hash: async () => {
                throw new Error('oui');
            },
        }));
        await expect(async () => await hashPassword(password)).toThrowError(GLOBAL_ERRORS.PASSWORD_HASHING_FAILED[0]);
    });
});