import { IBasaltKeyTransformer } from '@/Interfaces';

export class BasaltSnakeCaseTransformer implements IBasaltKeyTransformer {
    public transformKey(key: string): string {
        return key
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[-\s]/g, '_')
            .toLowerCase();
    }
}
