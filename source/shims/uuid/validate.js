// Copy-pasted from
// https://github.com/uuidjs/uuid/blob/main/src/validate.js

import REGEX from './regex.js';

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;