import { BasaltPassword } from '@/BasaltPassword';

describe('BasaltPassword', (): void => {
    describe('hashPassword', (): void => {
        const plainPassword: string = 'testPassword123!';

        it('should return a hashed password', async (): Promise<void> => {
            const hashedPassword: string = await BasaltPassword.hashPassword(plainPassword);
            expect(hashedPassword).not.toEqual(plainPassword);
        });

        it('should throw an error for an empty password', async (): Promise<void> => {
            await expect(BasaltPassword.hashPassword('')).rejects.toThrow('An error occurred while hashing the password.');
        });
    });

    describe('verifyPassword', (): void => {
        const plainPassword: string = 'testPassword123!';
        let hashedPassword: string;

        beforeAll(async (): Promise<void> => {
            hashedPassword = await BasaltPassword.hashPassword(plainPassword);
        });

        it('should return true for a valid password', async (): Promise<void> => {
            const isValid: boolean = await BasaltPassword.verifyPassword(plainPassword, hashedPassword);
            expect(isValid).toBe(true);
        });

        it('should return false for an invalid password', async (): Promise<void> => {
            const isValid: boolean = await BasaltPassword.verifyPassword('wrongPassword!', hashedPassword);
            expect(isValid).toBe(false);
        });

        it('should throw an error for an empty password', async (): Promise<void> => {
            await expect(BasaltPassword.verifyPassword('', hashedPassword))
                .rejects.toThrow('An error occurred while verifying the password.');
        });
    });

});
