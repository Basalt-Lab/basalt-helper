import { generateKeyPairSync, ED25519KeyPairOptions, randomUUID, sign, verify } from 'crypto';

export interface PrivateKeyOptions {
    cipher?: string | undefined;
    passphrase?: string | undefined;
}

export interface KeyPairSyncResult<T1 extends string | Buffer, T2 extends string | Buffer> {
    publicKey: T1;
    privateKey: T2;
}

export class Crypto {
    public static generateED25519KeyPairSync(privateOptions: PrivateKeyOptions): KeyPairSyncResult<string, string> {
        const op: ED25519KeyPairOptions<'pem', 'pem'> = {
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                ...privateOptions,
            }
        };
        return generateKeyPairSync('ed25519', op);
    }

    public static randomUUID(): string {
        return randomUUID();
    }

    public static sign(data: string, privateKey: string, passphrase?: string): string {
        return sign(null, Buffer.from(data), {
            key: privateKey,
            passphrase,
        }).toString('base64');
    }

    public static verify(data: string, signature: string, publicKey: string): boolean {
        return verify(null, Buffer.from(data), publicKey, Buffer.from(signature, 'base64'));
    }
}
