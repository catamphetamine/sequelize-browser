import SequelizeOriginal from '{pathToSequelize}';

class Sequelize extends SequelizeOriginal {
  // Force `disableClsTransactions: true` option in `Sequelize()` constructor `options`.
  // The reason is that the "CLS" (Continuation Local Storage) feature for automatically
  // selecting the "current" transaction in any queries dispatched from a transaction's `callback`
  // requires the use of `AsyncLocalStorage` from `node:async_hook` which is not available in a web browser.
  constructor(...args) {
    super(...args.map(transformOptions));
  }
}

function transformOptions(options) {
  if (isPlainObject(options)) {
    if (options.disableClsTransactions === false) {
      throw new Error('`disableClsTransactions: false` option is not supported by Sequelize in a web browser');
    }

    return {
      ...options,
      disableClsTransactions: true,
    };
  }

  return options;
}

function isPlainObject(object) {
  return object !== undefined && object !== null && object.constructor === {}.constructor;
}

// `module.exports = Sequelize` fixes the issue with the resulting `Sequelize` global variable
// otherwise being an object of shape `{ default: Sequelize }` instead of just being `Sequelize`.
// https://github.com/evanw/esbuild/issues/869
module.exports = Sequelize;