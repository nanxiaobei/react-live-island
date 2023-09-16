import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import type { RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

const pkg = JSON.parse(readFileSync('./package.json') as unknown as string);

const input = 'src/LiveIsland.tsx';

const cjsOutput = { file: pkg.main, format: 'cjs', exports: 'auto' } as const;
const esmOutput = { file: pkg.module, format: 'es' } as const;
const dtsOutput = { file: pkg.types, format: 'es' } as const;

const plugins = [typescript(), postcss({ minimize: true })];

const external = [
  ...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }),
  /^react($|\/)/,
];

const config: RollupOptions[] = [
  { input, output: cjsOutput, plugins, external },
  { input, output: esmOutput, plugins, external },
  { input, output: dtsOutput, plugins: [dts()], external: [/\.scss$/] },
];

export default config;
