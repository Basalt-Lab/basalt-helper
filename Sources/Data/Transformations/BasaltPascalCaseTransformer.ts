import { IBasaltKeyTransformer } from '@/Interfaces';

export class BasaltPascalCaseTransformer implements IBasaltKeyTransformer {
    public transformKey(key: string): string {
        const camelCaseKey: string = key.replace(/([-_][a-z])/gi, (group: string) =>
            group[1].toUpperCase()
        );
        return camelCaseKey.charAt(0).toUpperCase() + camelCaseKey.slice(1);
    }
}
