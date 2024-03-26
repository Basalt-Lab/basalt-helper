export * from './Common/Errors';
export * from './Domain/Services/Data';
export * from './Domain/Services/Data/TransformerStrategies';
export * from './Domain/Services/Security';

import { hashPassword } from './Domain/Services/Security';

(async (): Promise<void> => {
    const hashedPassword = await hashPassword('password');
    console.log(hashedPassword);
})();