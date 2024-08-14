import {
    mkdirSync
} from 'fs';

import { BasaltError, ErrorKeys } from '@/Common/Error/index.js';
import { Path } from './Path.js';

/**
 * Represents the folder. nherits from Path ({@link Path})
 */
export class Folder extends Path {
    /**
     * Initializes a new instance of the Folder class.
     *
     * @param path - The path of the folder.
     */
    public constructor(path: string) {
        super(path);
    }

    /**
     * Builds the folder structure.
     *
     * @param structure - The folder structure. The key is the folder name and the value is the subfolder structure or null.
     *
     * @throws ({@link BasaltError}) - If failed to create folder structure. ({@link ErrorKeys.ERROR_CREATE_FOLDER_STRUCTURE})
     * @throws ({@link BasaltError}) - If failed to access folder. ({@link ErrorKeys.ERROR_ACCESS_FOLDER})
     * 
     * @example
     * Example of the structure object to create the folder structure folder1/folder2/folder3/ :
     * ```json
     * {
     *    "folder1": {
     *       "folder2": {
     *         "folder3": null
     *       }
     *    }
     * }
     * ```
     */
    public build(structure: Record<string, unknown>): void {
        const createFolderStructure = (structure: Record<string, unknown>, parentPath: string): void => {
            for (const key in structure)
                if (Object.hasOwn(structure, key) && (structure[key] === undefined || structure[key] === null))
                    try {
                        const path = new Path(`${parentPath}/${key}`);
                        if (!path.exists())
                            mkdirSync(path.path, { recursive: true });

                    } catch (e) {
                        throw new BasaltError({
                            messageKey: ErrorKeys.ERROR_CREATE_FOLDER_STRUCTURE,
                            detail: e
                        });
                    }
                else
                    createFolderStructure(structure[key] as Record<string, unknown>, `${parentPath}/${key}`);
        };
        if (!this.checkAccess())
            throw new BasaltError({
                messageKey: ErrorKeys.ERROR_ACCESS_FOLDER,
                detail: this._path
            });
        createFolderStructure(structure, this._path);
    }
}
