import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/main.ts',
  plugins: [
    ts(),
  ],
  output: {
    file: pkg.module,
    format: 'es',
  },
};
