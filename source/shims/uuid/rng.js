// Returns an array of 16 random bytes.
// This is a "lame" and cryptographically not "safe" implementation.
export default function rng() {
  return new Array(16).fill(0).map(() => Math.trunc(Math.random() * 256));
}