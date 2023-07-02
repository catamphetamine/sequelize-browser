# `sequelize-browser`

A build of [Sequelize](https://sequelize.org/) that runs in a web browser.

[Demo](https://catamphetamine.github.io/sequelize-browser/)

<!-- https://catamphetamine.gitlab.io/sequelize-browser/ -->

## Install

```
npm install sequelize-browser --save
```

## Use

There're two ways of using this package:
* The most simple way would be using the [default build](#default-build) that was created from the latest version of Sequelize at the time of publishing this package.
* The "advanced" way would be creating a [custom build](#custom-build) for a particular version of Sequelize.

### Default Build

A pre-made build of `sequelize@6` is available as part of this package.

The files are:

* `sequelize.js` — A non-"minified" "ES6" version of the build. It can be `import`ed when using a bundler such as Webpack.
* `sequelize.cjs` — A non-"minified" "CommonJS" version of the build. It can be `require()`d when using a bundler such as Webpack.
* `sequelize.script.js` — A "minified" "bundled" build for including it on a web page via a `<script/>` tag. Sequelize will be available as `Sequelize` global variable.

Use it either way:

```js
import Sequelize from 'sequelize-browser'
```

```js
const Sequelize = require('sequelize-browser')
```

```html
<script src="https://unpkg.com/sequelize-browser@6.x/sequelize.script.js"></script>

<script>
  console.log(Sequelize)
</script>
```

### Custom Build

To create a custom build from a particular version of Sequelize, first install that particular version of Sequelize:

```
npm install sequelize@6.x.y
```

After that, either use the [command-line](#command-line) way of running the build via `npx` command or use a [programmatic](#programmatic) way of running the build via `sequelize-browser/build` export.

#### Command Line

First, install [`npx`](https://www.npmjs.com/package/npx) if it's not already installed in your system:

```
npm install -g npx
```

Then, run the build command:

```
npx sequelize-browser \
  --input ./node_modules/sequelize \
  --output ./output/sequelize.js \
  --dialects sqlite,mysql
  --format iife \
  --minify true
```

#### Programmatic

```js
import build from 'sequelize-browser/build'

await build({
  // Path to the installed version of Sequelize.
  input: './node_modules/sequelize',
  // Path to the output file.
  output: './output/sequelize.js',
  // Supported "dialects".
  dialects: ['sqlite'],
  // * "esm" — For including the resulting file via `import`.
  // * "cjs" — For including the resulting file via `require()`.
  // * "iife" — For including the resulting file directly via a "<script/>" tag on a page.
  format: 'iife',
  // Whether it should "minify" the code.
  minify: true
})
```

## Limitations

* (Advanced Feature) When creating ["managed" transactions](https://sequelize.org/docs/v6/other-topics/transactions/) via `sequelize.transaction(options, callback)`, it won't allow the "CLS" (Continuation Local Storage) feature for automatically selecting that transaction for any queries dispatched from the `callback`. The workaround is to pass the `transaction` parameter explicitly to any queries dispatched from such `callback`.

```js
await sequelize.transaction(async t => {
  const user = await User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, { transaction: t });
});
```

* The bundle size is currently at about `1.5 MB`.
  * (resolved) Half of that is `moment`'s timezone data. The latest code in the `sequelize` repo seems to have [replaced](https://github.com/sequelize/sequelize/pull/16222) `moment` with `dayjs` which means that in the next minor release of `sequelize` the browser bundle will be much smaller.
  * (minor) In the current version of `sequelize`, `validator` is imported as a whole instead of only the functions being used, which is about `115 KB` of the bundle size. [Reducing the scope](https://github.com/sequelize/sequelize/pull/16222#issuecomment-1615975113) of the functions imported from `validator`  would reduce the bundle size by a tiny bit. See the [discussion](https://github.com/sequelize/sequelize/issues/16223).
  * (minor) In the current version of `sequelize`, `lodash` is imported as a whole instead of only the functions being used, which is about `75 KB` of the bundle size. [Reducing the scope](https://github.com/sequelize/sequelize/pull/16222) of the functions imported from `lodash` could reduce the bundle size by a tiny bit, although negligibly.
  * `sequelize.script.js.meta.json` file in the root of the package could be analyzed via:
    * https://bundle-buddy.com/bundle
    * https://esbuild.github.io/analyze

## Tested Databases

* SQLite — with `sqlite` "dialect" and `sql.js-as-sqlite3` package as a `dialectModule` parameter value.

```js
import Sequelize from 'sequelize'
import sqlJsAsSqlite3 from 'sql.js-as-sqlite3'

const sequelize = new Sequelize('sqlite://:memory:', {
  dialectModule: sqlJsAsSqlite3
})
```

## Sequelize

A [pull request](https://github.com/sequelize/sequelize/pull/16208) was submitted to the original `sequelize` package repo, although the maintainers of the original package [preferred](https://github.com/sequelize/sequelize/pull/16208#issuecomment-1613288150) not to include it and instead would prefer to follow a more radical approach with rewriting the entire `sequelize` codebase in a more modern way, resolving any web browser incompatibilities in the process. Although I'd imagine such a large rewrite could potentially require an equally large amount of time, but at the same time this feature is more of a for-fun thing rather than some critical piece of functionality. Anyway, in the end, a decision was made to release this browser build of Sequelize as a standalone third-party package, so here it is. It also provides the commands to manually run the build from the original `sequelize` package so that any developer could easily create a browser-compatible build for any version of sequelize. For reference, here's the original [discussion](https://github.com/sequelize/sequelize/issues/16207).

## GitHub

On March 9th, 2020, GitHub, Inc. silently [banned](https://medium.com/@catamphetamine/how-github-blocked-me-and-all-my-libraries-c32c61f061d3) my account (erasing all my repos, issues and comments, even in my employer's private repos) without any notice or explanation. Because of that, all source codes had to be promptly moved to GitLab. The [GitHub repo](https://github.com/catamphetamine/sequelize-browser) is now only used as a backup (you can star the repo there too), and the primary repo is now the [GitLab one](https://gitlab.com/catamphetamine/sequelize-browser). Issues can be reported in any repo.

## License

[MIT](LICENSE)

