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
    dialects,
    format,
    minify,
  } = parameters;

  if (!input) {
    throw new Error('`input` parameter is required');
  }
  if (!output) {
    throw new Error('`output` parameter is required');
  }
  if (!dialects) {
    throw new Error('`dialects` parameter is required');
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
    plugins: [
      // Replaces some server-side packages with "shims".
      ...aliases.map(_ => alias(_, { inputDir })),

      // Replaces unsupported "dialects" with a placeholder "shim"
      // so that the resulting bundle size is a bit smaller
      // because unsupported databases aren't supported anyway.
      //
      // The resulting reduction of the bundle size was only about 150 KB
      // which is negligible compared to the 1500 KB size of the resulting bundle.
      //
      // The syntax for `require()`ing those in `src/sequelize.js` is a bit different depending on the code version:
      // * Dialect = require('./dialects/mysql').MysqlDialect; — Latest code in `src/sequelize.js` as of 30th Jun, 2023.
      // * Dialect = require("./dialects/mysql"); — The code in `lib/sequelize.js` in the latest release as of 30th Jun, 2023.
      //
      replacePlugin({
        dir: inputDir,
        include: resolvePaths([
          // Just in case any of the files get moved around in some future versions,
          // and that does happen during refactorings, simply include the whole './src' folder.
          './src/*',
          // './src/sequelize.js',
        ], inputDir),
        //
        // // Matches:
        // // * Dialect = require('./dialects/mysql').MysqlDialect; — Latest code in `src/sequelize.js` as of 30th Jun, 2023.
        // // * Dialect = require("./dialects/mysql"); — The code in `lib/sequelize.js` in the latest release as of 30th Jun, 2023.
        // regExp: /^Dialect = require\(['"]\.\/dialects\/([^'"]+)['"]\)(?:\.[^;]+)?;$/,
        //
        // Matches: './dialects/mysql', etc
        regExp: /^\.\/dialects\/([^/]+)$/,
        // Replace a dialect import path with a placeholder import path
        // so that the resulting bundle size is a bit smaller
        // because unsupported databases aren't supported anyway.
        replaceWith: ({ importPath, filePath, regExp }) => {
          const match = importPath.match(regExp);
          const dialect = match[1];
          // `dialect` isn't ever "abstract", but added it here just in case
          // anything changes in Sequelize source codes in some future.
          if (dialect === 'abstract' || dialects.includes(dialect)) {
            return;
          }
          return getShimPath('dialects');
        },
      }),
    ],
    // Can replace global variables with "shims".
    // https://esbuild.github.io/api/#inject
    inject: [
      resolve(__dirname, './globals.js'),
    ],
  });
}

function alias({ include, exclude, packages, shim }, { inputDir }) {
  return aliasPlugin({
    dir: inputDir,
    include: include && resolvePaths(include, inputDir),
    exclude: exclude && resolvePaths(exclude, inputDir),
    replacements: Object.fromEntries(
      packages.map(packageName => [
        packageName, // key
        getShimPath(shim), // value
      ])
    ),
  });
}

function aliasPlugin({ dir, include, exclude, replacements }) {
  const regExp = new RegExp(`^(?:${Object.keys(replacements).map(escapeRegExp).join('|')})$`);

  return replacePlugin({ dir, include, exclude, regExp, replacements })
}

function replacePlugin({ dir, include, exclude, regExp, replaceWith, replacements }) {
  return {
    name: 'replace',
    setup(build_) {
      // "we do not register 'file' namespace here, because the root file won't be processed"
      // https://github.com/evanw/esbuild/issues/791
      // What?
      //
      // https://esbuild.github.io/plugins/#on-resolve-options
      // https://esbuild.github.io/plugins/#on-resolve-arguments
      //
      // https://esbuild.github.io/plugins/#on-load-options
      // https://esbuild.github.io/plugins/#on-load-arguments
      //
      build_.onResolve({ filter: regExp }, args => {
        if (include && !include.some(getPathMatcher(args.importer))) {
          return;
        }

        if (exclude && exclude.some(getPathMatcher(args.importer))) {
          return;
        }

        // https://esbuild.github.io/plugins/#on-load-results
        // eslint-disable-next-line consistent-return
        if (replaceWith) {
          const newPath = replaceWith({ regExp, importPath: args.path, filePath: args.importer });
          if (newPath === undefined) {
            return;
          }

          // eslint-disable-next-line no-console
          console.log(`Replace "${args.path}" in "${relative(dir, args.importer)}"`);

          return {
            path: newPath,
          };
        }

        // eslint-disable-next-line no-console
        console.log(`Replace "${args.path}" in "${relative(dir, args.importer)}"`);

        // https://esbuild.github.io/plugins/#on-resolve-results
        // eslint-disable-next-line consistent-return
        return {
          path: replacements[args.path],
        };
      });
    },
  };
}

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolvePaths(paths, dir) {
  return getFilePathsInLib(paths).map(path => resolve(dir, path));
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