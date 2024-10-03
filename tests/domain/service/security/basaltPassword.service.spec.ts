import argon from 'argon2';
import { afterEach, describe, expect, mock, spyOn, test } from 'bun:test';

import {
    ErrorKeys
} from '../../../../source/common/error';
import {
    hashPassword,
    verifyPassword
} from '../../../../source/domain/service/security';

describe('hashPassword', () => {

    afterEach(() => {
        mock.restore();
    });

    test('should hash a password', async () => {
        const password = 'password';
        const hashedPassword = await hashPassword(password);
        expect(hashedPassword).not.toBe(password);
    });

    test('should throw an error when password is empty', async () => {
        const password = '';
        try {
            await hashPassword(password);
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.PASSWORD_EMPTY);
        }
    });

    test('should throw an error when hashing fails', async () => {
        const password = 'password';
        spyOn(argon, 'hash').mockImplementation(() => {
            throw new Error();
        });
        try {
            await hashPassword(password);
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.PASSWORD_HASHING_FAILED);
        }
    });
});

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
        try {
            await verifyPassword(password, hashedPassword);
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.PASSWORD_EMPTY);
        }
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
        spyOn(argon, 'verify').mockImplementation(() => {
            throw new Error();
        });
        try {
            await verifyPassword(password, hashedPassword);
        } catch (error) {
            expect(error.message).toBe(ErrorKeys.PASSWORD_VERIFICATION_FAILED);
        }
    });
});