import { IBasaltKeyTransformer } from '@/Interfaces';

export class BasaltCamelCaseTransformer implements IBasaltKeyTransformer {
    public transformKey(key: string): string {
        return key
            .replace(/([-_][a-z])/gi, (group) => group[1].toUpperCase())
            .replace(/^[A-Z]/, (firstLetter) => firstLetter.toLowerCase());

    }
}
