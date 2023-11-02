import { IBasaltKeyTransformer } from '@/Interfaces';

export class BasaltKebabCaseTransformer implements IBasaltKeyTransformer {
    public transformKey(key: string): string {
        return key
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .toLowerCase();
    }
}
