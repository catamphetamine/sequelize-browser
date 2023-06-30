import fs from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import aliases from './aliases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_SOURCE = fs.readFileSync(resolve(__dirname, './index.js'), 'utf8');

export default function(parameters) {
  if (!parameters) {
    throw new Error('Parameters are required');
  }

  const {
    input,
    output,
    minify,
    format
  } = parameters;

  if (!input) {
    throw new Error('`input` parameter is required');
  }
  if (!output) {
    throw new Error('`output` parameter is required');
  }
  if (!['iife', 'cjs', 'esm'].includes(format)) {
    throw new Error('`format` parameter must be one of: "iife", "cjs", "esm"');
  }
  if (typeof minify !== 'boolean') {
    throw new Error('`minify` parameter must be a boolean');
  }

  const inputDir = fs.statSync(input).isDirectory() ? input : dirname(input);

  return build({
    // `stdin` is only used when input is a string rather than a file.
    stdin: {
      contents: INPUT_SOURCE.replace('\'{pathToSequelize}\'', JSON.stringify(input)),
      resolveDir: resolve(__dirname, '..'),
    },
    bundle: true,
    minify,
    platform: 'browser',
    format,
    // https://esbuild.github.io/api/#target
    sourcemap: true,
    outfile: output,
    // Can define the names of packages that shouldn't be included in the bundle.
    external: [],
    // Can define env variables here.
    define: {},
    // The global variable name.
    globalName: format === 'iife' ? 'Sequelize' : undefined,
    plugins: aliases.map(_ => alias(_, { inputDir })),
    // Can replace global variables with "shims".
    // https://esbuild.github.io/api/#inject
    inject: [
      resolve(__dirname, './globals.js'),
    ],
  });
}

function alias({ include, exclude, packages }, { inputDir }) {
  return aliasPlugin({
    dir: inputDir,
    include: include && resolvePaths(include, inputDir),
    exclude: exclude && resolvePaths(exclude, inputDir),
    packages: Object.fromEntries(
      Object.keys(packages).map(packageName => [
        packageName, // key
        getShimPath(packages[packageName]), // value
      ]),
    ),
  });
}

function resolvePaths(paths, dir) {
  // Just in case any of the files get moved around in some future versions,
  // and that does happen during refactorings, simply include the whole './src' folder.
  paths = ['./src/*', ...paths];

  return getFilePathsInLib(paths).map(path => resolve(dir, path));
}

// A fork of `esbuild-plugin-alias` whose github repository was deleted.
// https://unpkg.com/browse/esbuild-plugin-alias@0.2.1/
// Added `include` option.
function aliasPlugin({ dir, include, exclude, packages }) {
  const regExp = new RegExp(`^(${Object.keys(packages).map(escapeRegExp).join('|')})$`);

  return {
    name: 'alias',
    setup(build_) {
      // "we do not register 'file' namespace here, because the root file won't be processed"
      // https://github.com/evanw/esbuild/issues/791
      // What?
      //
      // https://esbuild.github.io/plugins/#on-resolve-options
      // https://esbuild.github.io/plugins/#on-resolve-arguments
      //
      build_.onResolve({ filter: regExp }, args => {
        if (include && !include.some(getPathMatcher(args.importer))) {
          return;
        }

        if (exclude && exclude.some(getPathMatcher(args.importer))) {
          return;
        }

        // eslint-disable-next-line no-console
        console.log(`Shim package "${args.path}" in "${relative(dir, args.importer)}"`);

        // https://esbuild.github.io/plugins/#on-resolve-results
        // eslint-disable-next-line consistent-return
        return {
          path: packages[args.path],
        };
      });
    },
  };
}

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getPathMatcher(path) {
  return pattern => {
    if (pattern === path) {
      return true;
    }

    // Resolve wildcards.
    if (pattern.includes('*')) {
      const indexOfWildcard = pattern.indexOf('*');

      if (indexOfWildcard !== pattern.length - 1) {
        throw new Error(`A wildcard * could only be used at the end of a pattern: ${pattern}`);
      }

      // Resolve wildcards at the end.
      if (path.indexOf(pattern.slice(0, -1)) === 0) {
        return true;
      }

      return false;
    }

    if (pattern.indexOf(path) === 0) {
      if (pattern[path.length + 1] === '/') {
        return true;
      }

      return false;
    }

    return false;
  };
}

function getFilePathsInLib(filePaths) {
  return filePaths.map(filePath => {
    return filePath.replace('./src', './lib').replace(/\.ts$/, '.js');
  });
}

function getShimPath(shimName) {
  const importPath = `./shims/${shimName}/index.js`;

  return resolve(__dirname, importPath);
}