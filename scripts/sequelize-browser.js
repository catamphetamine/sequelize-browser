#!/usr/bin/env node

import minimist from 'minimist';

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import build from '../modules/build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {
  input,
  output,
  format,
  minify,
  metafile,
} = minimist(process.argv.slice(1))

if (!input) {
  throw new Error('--input parameter is required');
}

if (!output) {
  throw new Error('--output parameter is required');
}

if (!dialects) {
  throw new Error('--dialects parameter is required');
}

if (!format) {
  throw new Error('--format parameter is required');
}

if (minify !== 'true' && minify !== 'false') {
	throw new Error(`Invalid --minify parameter value: ${minify}`);
}

build({
  input,
  output,
  dialects: dialects.split(','),
  format,
  minify: minify === 'true',
  metafile,
});