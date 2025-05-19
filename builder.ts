import pkg from './package.json';

const dependencies = 'dependencies' in pkg ? Object.keys(pkg.dependencies ?? {}) : [];
const devDependencies = 'devDependencies' in pkg ? Object.keys(pkg.devDependencies ?? {}) : [];
const peerDependencies = 'peerDependencies' in pkg ? Object.keys(pkg.peerDependencies ?? {}) : [];

await Bun.$`rm -rf dist`;
console.log('🗑️  Deleted dist folder if it existed. ✅');

await Bun.$`tsc --project tsconfig.dts.json`;
await Bun.$`tsc-alias -p tsconfig.dts.json`;
console.log('🔍 Type analysis and generation completed. ✅');

await Bun.build({
    target: 'bun',
    external: [...dependencies, ...devDependencies, ...peerDependencies],
    root: './source',
    entrypoints: [
        './source/data/enums/index.ts',
        './source/data/transformer/index.ts',
        './source/data/types/index.ts',
        './source/data/index.ts',

        './source/error/types/index.ts',
        './source/error/index.ts',

        './source/singletonManager/enums/index.ts',
        './source/singletonManager/index.ts',

        './source/typedEventEmitter/types/index.ts',
        './source/typedEventEmitter/index.ts',

        './source/index.ts'
    ],
    outdir: './dist',
    splitting: true,
    format: 'esm',
    minify: {
        identifiers: false,
        syntax: true,
        whitespace: true
    },
    sourcemap: 'none'
});

console.log('Build completed 🎉!');

process.exit(0);