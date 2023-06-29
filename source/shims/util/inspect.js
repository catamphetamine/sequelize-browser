export default function inspect(variable) {
  // eslint-disable-next-line no-console
  console.log(variable);
}

// Sequelize's code uses it in the form of `[NodeUtil.inspect.custom]`
// in order to define custom behavior of `util.inspect()` for some class.
inspect.custom = Symbol.for('nodejs.util.inspect.custom');
