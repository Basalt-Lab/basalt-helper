import { hashPassword, verifyPassword } from '@/App';

describe('BasaltPassword', (): void => {

    describe('hashPassword', (): void => {
        const plainPassword: string = 'testPassword123!';

        it('should return a hashed password', async (): Promise<void> => {
            const hashedPassword: string = await hashPassword(plainPassword);
            expect(hashedPassword).not.toEqual(plainPassword);
        });

        it('should throw an error for an empty password', async (): Promise<void> => {
            expect(hashPassword('')).rejects.toThrow('PASSWORD_EMPTY');
        });
    });

    describe('verifyPassword', (): void => {
        const plainPassword: string = 'testPassword123!';
        let hashedPassword: string;

        beforeAll(async (): Promise<void> => {
            hashedPassword = await hashPassword(plainPassword);
        });

        it('should return true for a valid password', async (): Promise<void> => {
            const isValid: boolean = await verifyPassword(plainPassword, hashedPassword);
            expect(isValid).toBe(true);
        });

        it('should return false for an invalid password', async (): Promise<void> => {
            const isValid: boolean = await verifyPassword('wrongPassword!', hashedPassword);
            expect(isValid).toBe(false);
        });

        it('should throw an error for an empty password', async (): Promise<void> => {
            await expect(verifyPassword('', hashedPassword))
                .rejects.toThrow('PASSWORD_EMPTY');
        });
    });
});
