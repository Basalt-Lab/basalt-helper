import pkg from './package.json';

const dependencies = 'dependencies' in pkg ? Object.keys(pkg.dependencies ?? {}) : [];
const devDependencies = 'devDependencies' in pkg ? Object.keys(pkg.devDependencies ?? {}) : [];
const peerDependencies = 'peerDependencies' in pkg ? Object.keys(pkg.peerDependencies ?? {}) : [];

await Bun.$`rm -rf dist`;

await Bun.$`tsc --project tsconfig.dts.json`;

await Bun.build({
    target: 'bun',
    external: [...dependencies, ...devDependencies, ...peerDependencies],
    root: './source',
    entrypoints: [
        './source/core/data/index.ts',
        './source/core/data/transformer/index.ts',

        './source/core/util/index.ts',

        './source/error/index.ts',
        './source/error/key/index.ts',

        './source/types/index.ts',

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

await Bun.$`tsc-alias -p tsconfig.dts.json`;

console.log('Build completed 🎉!');

process.exit(0);