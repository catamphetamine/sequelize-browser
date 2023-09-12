// `sequelize@6.33.0` uses `moment` to perform an `isMoment()` check:
// https://github.com/sequelize/sequelize/blob/d2a1c2f46b2d139f95d7143c3d14cd2d7c2e4a80/packages/core/src/dialects/abstract/data-types.ts#L38-L45
//
// That check is used in `sanitize()` method.
// I didn't look where is `sanitize()` method used.
//
// `Import`ing the whole `moment` package just for the `isMoment()` check
// is not appropriate, so that function is mimicked in this file.
//
// The original `isMoment()` function uses an `instanceof Moment` check
// which is not possible to copy-paste in this function
// because the reference to the `Moment` function would be different.
//
// Even if it did `import { Moment } from "moment/src/moment/constructor.js`",
// that `Moment` function reference would be different from the one
// that's imported by the runtime from `moment/dist/moment.js`.
//
// So instead, `isMoment()` function is mimicked here.
//
export default function isMoment(obj) {
	// I dunno what `._isAMomentObject` flag means.
	// I just added it here because it's present in the original `isMoment()` function code.
	// https://github.com/moment/moment/blob/000ac1800e620f770f4eb31b5ae908f6167b0ab2/src/lib/moment/constructor.js#L76-L80
	//
	// The `.d` instance variable is checked here
	// because it's present in `Moment` instance at least starting from version `2.8.0` (Aug 2014).
	// https://github.com/moment/moment/blob/24fbb01fff8fbdf149fd6a6c6e616a40ebedf86d/moment.js#L373
	//
	// Since `moment` library is officially deprecated, it's not likely
	// that they're gonna perform any refactoring of the code,
	// so it's not likely that the `.d` property could be changed.
	//
	return obj !== undefined && obj !== null && (obj._isAMomentObject !== null || obj._d instanceof Date);
}