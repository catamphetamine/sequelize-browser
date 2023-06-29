// `util.inherits()` is only used by `wkx` library and it got removed
// in the latest code in the master branch as of Jun 30th, 2023.
//
// Copy-pasted from
// https://stackoverflow.com/questions/13474710/util-inherits-alternative-or-workaround
//
export default function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}
