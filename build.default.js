// import build from './source/build.js';
import build from 'sequelize-browser/build';

await build({
  input: './node_modules/sequelize',
  output: './sequelize.script.js',
  format: 'iife',
  minify: true
});

await build({
  input: './node_modules/sequelize',
  output: './sequelize.js',
  format: 'esm',
  minify: false
});

await build({
  input: './node_modules/sequelize',
  output: './sequelize.cjs',
  format: 'cjs',
  minify: false
});