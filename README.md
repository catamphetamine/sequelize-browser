# `sequelize-browser`

A build of [Sequelize](https://sequelize.org/) that works in a web browser.

[Demo](https://catamphetamine.gitlab.io/sequelize-browser/)

## Install

First, install this package — a build of Sequelize that works in a web browser:

```
npm install sequelize-browser --save
```

Then, install a database that you'll be using with this package. For example, install a build of SQLite database that works in a web browser:

```
npm install sql.js@1.13.0 sql.js-as-sqlite3 --save
```

## Use

There're two ways of using this package:
* Easiest — use the [default build](#default-build) that was created from the latest version of Sequelize that was available at the time of publishing this package.
* Advanced — create a [custom build](#custom-build) from a particular version of Sequelize; useful to always be up-to-date.

### Default Build

A default build of `sequelize@6.x` is included in this package.

<!-- The files are: -->

<!-- * `sequelize.js` — A non-"minified" "ES6" version of the build. It can be `import`ed when using a bundler such as Webpack. -->
<!-- * `sequelize.cjs` — A non-"minified" "CommonJS" version of the build. It can be `require()`d when using a bundler such as Webpack. -->
<!-- * `sequelize.script.js` — A "minified" "bundled" build for including it on a web page via a `<script/>` tag. Sequelize will be available as `Sequelize` global variable. -->

```js
// A build of Sequelize 6.x that works in a web browser.
import Sequelize from "sequelize-browser"

// A "dialect module" that "talks" to an SQLite database instance in a web browser.
import sqlJsAsSqlite3 from "sql.js-as-sqlite3"

// A build of SQLite that works in a web browser.
import initSqlJs from "sql.js"

// Configure the "dialect module".
sqlJsAsSqlite3.configure({
  // Pass the default export of the `sql.js` package.
  initSqlJs,

  // In order to run an SQLite database instance in a web browser,
  // it requires downloading some `*.wasm` modules in real time.
  //
  // The "base URL" for downloading those `*.wasm` modules from
  // should be configured by passing a `wasmFileBaseUrl` option.
  //
  // The "base URL" must end with a trailing slash ("/").
  //
  // The "base URL" must point to exactly the same version of `sql.js`
  // as the one you've installed via the `npm install` command.
  // This means that you must install a specific version of `sql.js`
  // rather than "whatever is the latest one".
  // In other words, do something like `npm install sql.js@1.13.0 --save`
  // rather than just `npm install sql.js --save`, after which
  // note the `1.13.0` version and specify a "base URL" for that exact version.
  //
  wasmFileBaseUrl: "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/"
})

// Create Sequelize instance.
const sequelize = new Sequelize("sqlite://:memory:", { dialectModule: sqlJsAsSqlite3 })

// Use Sequelize as usual.
const Model = sequelize.define("tableName", { ... model properties ... })
```

Or, if you prefer not to use a "bundler", you could "include" the modules directly from any CDN service such as [unpkg.com](https://unpkg.com) or [jsdelivr.net](https://jsdelivr.net).

```html
<!-- Include a build of Sequelize 6.x that works in a web browser. -->
<script src="https://unpkg.com/sequelize-browser@6.x/sequelize.script.js"></script>

<!-- Include a "dialect module" that "talks" to an SQLite database instance in a web browser. -->
<script src="https://unpkg.com/sql.js-as-sqlite3@0.2.x/bundle/sql.js-as-sqlite3.min.js"></script>

<!-- Include a build of SQLite that works in a web browser (called `sql.js`). -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/sql-wasm.min.js"></script>
<script>
  // In order to run an SQLite database instance in a web browser,
  // it requires downloading some `*.wasm` modules in real time.
  //
  // The "base URL" for downloading those `*.wasm` modules from
  // should be configured by setting a value of a global `SQL_JS_WASM_FILE_BASE_URL` variable.
  //
  // The "base URL" must end with a trailing slash ("/").
  // The "base URL" must be exactly the same as for the `sql-wasm.min.js` file that is included above.
  //
  SQL_JS_WASM_FILE_BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/"
</script>

<!-- Application code. -->
<script>
  // Create Sequelize instance.
  const sequelize = new Sequelize("sqlite://:memory:", { dialectModule: sqlJsAsSqlite3 })

  // Use Sequelize as usual.
  const Model = sequelize.define("tableName", { ... model properties ... })
</script>
```

### Custom Build

To create a custom build from a particular version of Sequelize, first install that particular version of Sequelize:

```
npm install sequelize@6.x.y
```

After that, either use the [command-line](#command-line-custom-build) way of creating a build by using `npx` command or use a [programmatic](#programmatic-custom-build) way of creating a build by using `sequelize-browser/build` export.

After a custom build has been created, use it same way as the [default build](#default-build).

#### Command-Line Custom Build

First, install [`npx`](https://www.npmjs.com/package/npx) if it's not already installed in your system:

```
npm install --global npx
```

Then, run the command that creates a build:

```
npx sequelize-browser \
  --input ./node_modules/sequelize \
  --output ./output/sequelize.js \
  --dialects sqlite,mysql
  --format iife \
  --minify true
```

#### Programmatic Custom Build

```js
import build from "sequelize-browser/build"

await build({
  // Path to the installed version of Sequelize.
  input: "./node_modules/sequelize",
  // Path to the output file.
  output: "./output/sequelize.js",
  // Supported "dialects".
  dialects: ["sqlite"],
  // * "esm" — For including the resulting file via `import`.
  // * "cjs" — For including the resulting file via `require()`.
  // * "iife" — For including the resulting file directly via a "<script/>" tag on a page.
  format: "iife",
  // Whether it should "minify" the code.
  minify: true
})
```

## Databases

The following databases are supported in a web browser:

* SQLite — with the following `Sequelize` constructor options:
  * `dialect: "sqlite"`, or by specifying a "connection URL" with an `sqlite://` "schema"
  * `dialectModule`: imported from [`sql.js-as-sqlite3`](https://npmjs.com/package/sql.js-as-sqlite3)

## Limitations

### Transactions

(Advanced Feature) When creating ["managed" transactions](https://sequelize.org/docs/v6/other-topics/transactions/) via `sequelize.transaction(options, callback)`, it utilizes the "CLS" (Continuation Local Storage) feature of Node.js to automatically (or rather "automagically") select that transaction for any queries dispatched from the `callback`.

```js
await sequelize.transaction(async () => {
  // This `.create()` call will be executed inside the transaction.
  const user = await User.create({
    firstName: "Abraham",
    lastName: "Lincoln"
  });
});
```

When running in a web browser, that magic of Node.js is not available, so a developer will have to explicitly specify the transaction for queries dispatched from the `callback`.

```js
await sequelize.transaction(async t => {
  const user = await User.create({
    firstName: "Abraham",
    lastName: "Lincoln"
  }, { transaction: t });
});
```

### Validator

By default, Sequelize [supports](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations) specifying "validators" from [`validator.js`](https://github.com/validatorjs/validator.js) library on a model field.

```js
sequelize.define("modelName", {
  fieldName: {
    type: DataTypes.STRING,
    validate: {
      isPostalCode: true, // Implicitly calls `isPostalCode(value)` function from `validator.js` library.
      isUppercase: true   // Implicitly calls `isUppercase(value)` function from `validator.js` library.
    }
  }
})
```

However, while being convenient, including the whole `validator.js` package in the bundle just to support that feature increases its size by about `100 KB`, which looks like an overkill provided that most people don't even use this feature, or maybe only use a few of the "validators" from the (long) list.

So to reduce the overall bundle size, and to decouple `sequelize` itself from `validator.js` package, the feature was removed. When attempting to call a certain function of `validator.js`, it will throw an error like:

> `isPostalCode` function from `validator` package is not included in a browser version of `sequelize`. To fix this, import the `isPostalCode` function from `validator` package manually and then either (a) use it in a field's `validate` or (b) set it on the `Sequelize.Validator` object.

As the error message suggests, there're two simple ways to fix it.

The first way would be `import`ing the relevant "validator" functions from `validator.js` and then using them in the `validate` map of a model field.

```js
import isPostalCode from "validator/lib/isPostalCode"
import isUppercase from "validator/lib/isUppercase"

sequelize.define("modelName", {
  fieldName: {
    type: DataTypes.STRING,
    validate: {
      isPostalCode: value => isPostalCode(value),
      isUppercase: value => isUppercase(value)
    }
  }
})
```

The second way would be `import`ing the relevant "validator" functions from `validator.js` and then setting them on the `Sequelize.Validator` object.

```js
import isPostalCode from "validator/lib/isPostalCode"
import isUppercase from "validator/lib/isUppercase"

Sequelize.Validator.isPostalCode = isPostalCode
Sequelize.Validator.isUppercase = isUppercase
```

### Bundle Size

The bundle size is currently at about `1.5 MB`.

  * (resolved in `sequelize@7` code) Half of that is `moment`'s timezone data. The latest code in the `sequelize` repo seems to have [replaced](https://github.com/sequelize/sequelize/pull/16222) `moment` with `dayjs` which means that in the next "major" release of `sequelize` the browser bundle will be much smaller.
    * After `sequelize@7` is published, uncomment `moment` "shim" in `source/aliases.js` and rebuild the package.

  * (resolved in `sequelize@7` code) In the current version of `sequelize`, `validator` is imported as a whole instead of only the functions being used, which is about `115 KB` of the bundle size. [Reducing the scope](https://github.com/sequelize/sequelize/pull/16222#issuecomment-1615975113) of the functions imported from `validator`  would reduce the bundle size by a tiny bit. See the [discussion](https://github.com/sequelize/sequelize/issues/16223).
    * After `sequelize@7` is published, uncomment `validator` "shim" in `source/aliases.js` and rebuild the package.

  * (resolved in `sequelize@7` code) In the current version of `sequelize`, `lodash` is imported as a whole instead of only the functions being used, which is about `75 KB` of the bundle size. [Reducing the scope](https://github.com/sequelize/sequelize/pull/16222) of the functions imported from `lodash` could reduce the bundle size by a tiny bit, although negligibly.
    * After `sequelize@7` is published, this is supposed to no longer be an issue.

To get more insight on what exactly occupies which part of the bundle, use the `sequelize.script.js.meta.json` file in the root of the package with a bundle analyzer:
  * https://bundle-buddy.com
  * https://esbuild.github.io/analyze

## Node.js

While this package is primarily targeted at web browsers, it could also work in Node.js.

In that case, just exclude `import initSqlJs from "sql.js"` and `sqlJsAsSqlite3.configure(...)` lines from the code.

## Sequelize

A [pull request](https://github.com/sequelize/sequelize/pull/16208) was submitted to the original `sequelize` package repo, although the maintainers of the original package [preferred](https://github.com/sequelize/sequelize/pull/16208#issuecomment-1613288150) not to include it and instead would prefer to follow a more radical approach with rewriting the entire `sequelize` codebase in a more modern way, resolving any web browser incompatibilities in the process. Although I'd imagine such a large rewrite could potentially require an equally large amount of time, but at the same time this feature is more of a for-fun thing rather than some critical piece of functionality. Anyway, in the end, a decision was made to release this browser build of Sequelize as a standalone third-party package, so here it is. It also provides the commands to manually run the build from the original `sequelize` package so that any developer could easily create a browser-compatible build for any version of sequelize. For reference, here's the original [discussion](https://github.com/sequelize/sequelize/issues/16207).

## GitHub

On March 9th, 2020, GitHub, Inc. silently [banned](https://medium.com/@catamphetamine/how-github-blocked-me-and-all-my-libraries-c32c61f061d3) my account (erasing all my repos, issues and comments, even in my employer's private repos) without any notice or explanation. Because of that, all source codes had to be promptly moved to GitLab. The [GitHub repo](https://github.com/catamphetamine/sequelize-browser) is now only used as a backup (you can star the repo there too), and the primary repo is now the [GitLab one](https://gitlab.com/catamphetamine/sequelize-browser). Issues can be reported in any repo.

## License

[MIT](LICENSE)
