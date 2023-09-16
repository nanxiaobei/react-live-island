import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import type { RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import update from './rollup-plugin-update';

const pkg = JSON.parse(readFileSync('./package.json') as unknown as string);

const input = 'src/LiveIsland.tsx';

const cjsOutput = { file: pkg.main, format: 'cjs', exports: 'auto' } as const;
const esmOutput = { file: pkg.module, format: 'es' } as const;
const dtsOutput = { file: pkg.types, format: 'es' } as const;

const plugins = (type: 'cjs' | 'esm') => [
  typescript(),
  postcss({ extract: true }),
  update((code) => {
    const cssPos = '// css';
    const cssFile = `'./react-live-island.${type}.css'`;
    return type === 'cjs'
      ? code.replace(cssPos, `require(${cssFile});\n`)
      : code.replace(cssPos, `import ${cssFile};\n`);
  }),
];

const external = [
  ...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }),
  /^react($|\/)/,
];

const config: RollupOptions[] = [
  { input, output: cjsOutput, plugins: plugins('cjs'), external },
  { input, output: esmOutput, plugins: plugins('esm'), external },
  { input, output: dtsOutput, plugins: [dts()], external: [/\.scss$/] },
];

export default config;
