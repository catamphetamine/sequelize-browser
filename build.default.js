// import build from './source/build.js';
import build from 'sequelize-browser/build';

await build({
  input: './node_modules/sequelize',
  output: './sequelize.script.js',
  dialects: ['sqlite'],
  format: 'iife',
  minify: true,
  metafile: './sequelize.script.js.meta.json',
});

await build({
  input: './node_modules/sequelize',
  output: './sequelize.js',
  dialects: ['sqlite'],
  format: 'esm',
  minify: false,
});

await build({
  input: './node_modules/sequelize',
  output: './sequelize.cjs',
  dialects: ['sqlite'],
  format: 'cjs',
  minify: false,
});