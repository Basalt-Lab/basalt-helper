import { createHash, type Hash } from 'crypto';
import {
    createReadStream,
    readFileSync,
    watchFile,
    writeFileSync,
    type Stats,
} from 'fs';

import { CommonErrorKeys } from '@/Common/Error/Enum/index.js';
import { BasaltError } from '@/Common/Error/index.js';
import { md5, sha256, sha512 } from './Hash.js';
import { Path } from './Path.js';

/**
 * Represents the file. Inherits from Path ({@link Path})
 */
export class File extends Path {
    /**
     * Initializes a new instance of the File class.
     *
     * @param path - The path of the file.
     */
    public constructor(path: string) {
        super(path);
    }

    /**
     * Writes the file.
     *
     * @param content - The content to write to the file.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * @throws ({@link BasaltError}) If the file write fails. ({@link CommonErrorKeys.ERROR_WRITE_FILE})
     */
    public write(content: string): void {
        if (this.exists() && !this.checkAccess())
            throw new BasaltError({
                messageKey: CommonErrorKeys.ERROR_ACCESS_FILE,
                detail: this._path
            });
        try {
            writeFileSync(this._path, content);
        } catch (error) {
            throw new BasaltError({
                messageKey: CommonErrorKeys.ERROR_WRITE_FILE,
                detail: this._path
            });
        }
    }

    /**
     * Reads the file.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * @throws ({@link BasaltError}) If the file read fails. ({@link CommonErrorKeys.ERROR_READ_FILE})
     *
     * @returns The content of the file.
     */
    public read(): string {
        if (!this.checkAccess())
            throw new BasaltError({
                messageKey: CommonErrorKeys.ERROR_ACCESS_FILE,
                detail: this._path
            });
        try {
            return readFileSync(this._path, 'utf8');
        } catch (error) {
            throw new BasaltError({
                messageKey: CommonErrorKeys.ERROR_READ_FILE,
                detail: this._path
            });
        }
    }

    /**
     * Watches the file.
     *
     * @param interval - The interval to watch the file.
     * @param callback - The callback to execute when the file changes.
     */
    public watch(interval: number, callback: () => void): void {
        watchFile(this._path, { persistent: true, interval }, (curr: Stats, prev: Stats) => {
            if (curr.mtimeMs !== prev.mtimeMs)
                callback();
        });
    }

    /**
     * Calculates the hash with md5 of the file asynchronously with a stream.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * 
     * @returns The hash of the file.
     */
    public calculateStreamHashMD5(): Promise<string> {
        const hash = createHash('md5');
        return this._calculateStreamHash(hash);
    }

    /**
     * Calculates the hash with md5 of the file.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * @throws ({@link BasaltError}) If the file read fails. ({@link CommonErrorKeys.ERROR_READ_FILE})
     * 
     * @returns The hash of the file.
     */
    public calculateHashMD5(): string {
        const data = this.read();
        return md5(data);
    }

    /**
     * Calculates the hash with sha256 of the file synchronously with a stream.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * 
     * @returns The hash of the file.
     */
    public calculateStreamHashSha256(): Promise<string> {
        const hash = createHash('sha256');
        return this._calculateStreamHash(hash);
    }

    /**
     * Calculates the hash with sha256 of the file.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * @throws ({@link BasaltError}) If the file read fails. ({@link CommonErrorKeys.ERROR_READ_FILE})
     * 
     * @returns The hash of the file.
     */
    public calculateHashSha256(): string {
        const data = this.read();
        return sha256(data);
    }

    /**
     * Calculates the hash with sha512 of the file synchronously with a stream.
     * 
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     *
     * @returns The hash of the file.
     */
    public calculateStreamHashSha512(): Promise<string> {
        const hash = createHash('sha512');
        return this._calculateStreamHash(hash);
    }

    /**
     * Calculates the hash with sha512 of the file.
     *
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * @throws ({@link BasaltError}) If the file read fails. ({@link CommonErrorKeys.ERROR_READ_FILE})
     * 
     * @returns The hash of the file.
     */
    public calculateHashSha512(): string {
        const data = this.read();
        return sha512(data);
    }

    /**
     * Calculates the hash of the file asynchronously with a stream.
     * 
     * @param hash - The hash to calculate.
     * 
     * @throws ({@link BasaltError}) If the file access is denied. ({@link CommonErrorKeys.ERROR_ACCESS_FILE})
     * 
     * @returns The hash of the file.
     */
    private _calculateStreamHash(hash: Hash): Promise<string> {
        const stream = createReadStream(this._path);
        try {
            return new Promise((resolve, reject) => {
                stream.on('data', (data) => hash.update(data));
                stream.on('end', () => {
                    resolve(hash.digest('hex'));
                });
                stream.on('error', (error) => reject(error));
            });
        } catch (error) {
            throw new BasaltError({
                messageKey: CommonErrorKeys.ERROR_CALCULATE_HASH,
                detail: this._path
            });
        }
    }
}
