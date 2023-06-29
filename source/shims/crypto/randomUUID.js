// https://nodejs.org/api/crypto.html#cryptorandomuuidoptions
export default function randomUUID({ disableEntropyCache = false } = {}) {
  // Copy-pasted from
  // https://fjolt.com/article/javascript-uuid
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replaceAll(/[xy]/g, templateCharacter => {
    const randomCharCode = Math.trunc(Math.random() * 16);
    const charCode = templateCharacter === 'x' ? randomCharCode : (randomCharCode & 0x3 | 0x8);

    return charCode.toString(16);
  });
}
