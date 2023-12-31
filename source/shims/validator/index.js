// This file was automatically generated by a `runnable/create-validator-shim.js` script:
// `npm run create-validator-shim`

import isFloat from 'validator/lib/isFloat';
import isInt from 'validator/lib/isInt';
import isDate from 'validator/lib/isDate';
import isUUID from 'validator/lib/isUUID';
import isIPRange from 'validator/lib/isIPRange';
import isIP from 'validator/lib/isIP';
import isMACAddress from 'validator/lib/isMACAddress';
import isNumeric from 'validator/lib/isNumeric';
import isDecimal from 'validator/lib/isDecimal';
import isBoolean from 'validator/lib/isBoolean';

const validator = {};

// The following functions are used in `sequelize` code:
validator.isFloat = isFloat;
validator.isInt = isInt;
validator.isDate = isDate;
validator.isUUID = isUUID;
validator.isIPRange = isIPRange;
validator.isIP = isIP;
validator.isMACAddress = isMACAddress;
validator.isNumeric = isNumeric;
validator.isDecimal = isDecimal;
validator.isBoolean = isBoolean;

// The following functions are not used in `sequelize` code
// but are exposed to the users of `sequelize` package:
validator.alpha = () => functionNotIncluded('alpha');
validator.blacklist = () => functionNotIncluded('blacklist');
validator.contains = () => functionNotIncluded('contains');
validator.equals = () => functionNotIncluded('equals');
validator.escape = () => functionNotIncluded('escape');
validator.isAfter = () => functionNotIncluded('isAfter');
validator.isAlpha = () => functionNotIncluded('isAlpha');
validator.isAlphanumeric = () => functionNotIncluded('isAlphanumeric');
validator.isAscii = () => functionNotIncluded('isAscii');
validator.isBase32 = () => functionNotIncluded('isBase32');
validator.isBase58 = () => functionNotIncluded('isBase58');
validator.isBase64 = () => functionNotIncluded('isBase64');
validator.isBefore = () => functionNotIncluded('isBefore');
validator.isBIC = () => functionNotIncluded('isBIC');
validator.isBtcAddress = () => functionNotIncluded('isBtcAddress');
validator.isByteLength = () => functionNotIncluded('isByteLength');
validator.isCreditCard = () => functionNotIncluded('isCreditCard');
validator.isCurrency = () => functionNotIncluded('isCurrency');
validator.isDataURI = () => functionNotIncluded('isDataURI');
validator.isDivisibleBy = () => functionNotIncluded('isDivisibleBy');
validator.isEAN = () => functionNotIncluded('isEAN');
validator.isEmail = () => functionNotIncluded('isEmail');
validator.isEmpty = () => functionNotIncluded('isEmpty');
validator.isEthereumAddress = () => functionNotIncluded('isEthereumAddress');
validator.isFQDN = () => functionNotIncluded('isFQDN');
validator.isFullWidth = () => functionNotIncluded('isFullWidth');
validator.isHalfWidth = () => functionNotIncluded('isHalfWidth');
validator.isHash = () => functionNotIncluded('isHash');
validator.isHexadecimal = () => functionNotIncluded('isHexadecimal');
validator.isHexColor = () => functionNotIncluded('isHexColor');
validator.isHSL = () => functionNotIncluded('isHSL');
validator.isIBAN = () => functionNotIncluded('isIBAN');
validator.isIdentityCard = () => functionNotIncluded('isIdentityCard');
validator.isIMEI = () => functionNotIncluded('isIMEI');
validator.isIn = () => functionNotIncluded('isIn');
validator.isISBN = () => functionNotIncluded('isISBN');
validator.isISIN = () => functionNotIncluded('isISIN');
validator.isISO31661Alpha2 = () => functionNotIncluded('isISO31661Alpha2');
validator.isISO31661Alpha3 = () => functionNotIncluded('isISO31661Alpha3');
validator.isISO4217 = () => functionNotIncluded('isISO4217');
validator.isISO6391 = () => functionNotIncluded('isISO6391');
validator.isISO8601 = () => functionNotIncluded('isISO8601');
validator.isISRC = () => functionNotIncluded('isISRC');
validator.isISSN = () => functionNotIncluded('isISSN');
validator.isJSON = () => functionNotIncluded('isJSON');
validator.isJWT = () => functionNotIncluded('isJWT');
validator.isLatLong = () => functionNotIncluded('isLatLong');
validator.isLength = () => functionNotIncluded('isLength');
validator.isLicensePlate = () => functionNotIncluded('isLicensePlate');
validator.isLocale = () => functionNotIncluded('isLocale');
validator.isLowercase = () => functionNotIncluded('isLowercase');
validator.isLuhnNumber = () => functionNotIncluded('isLuhnNumber');
validator.isLuhnValid = () => functionNotIncluded('isLuhnValid');
validator.isMagnetURI = () => functionNotIncluded('isMagnetURI');
validator.isMD5 = () => functionNotIncluded('isMD5');
validator.isMimeType = () => functionNotIncluded('isMimeType');
validator.isMobilePhone = () => functionNotIncluded('isMobilePhone');
validator.isMongoId = () => functionNotIncluded('isMongoId');
validator.isMultibyte = () => functionNotIncluded('isMultibyte');
validator.isOctal = () => functionNotIncluded('isOctal');
validator.isPassportNumber = () => functionNotIncluded('isPassportNumber');
validator.isPort = () => functionNotIncluded('isPort');
validator.isPostalCode = () => functionNotIncluded('isPostalCode');
validator.isRFC3339 = () => functionNotIncluded('isRFC3339');
validator.isRgbColor = () => functionNotIncluded('isRgbColor');
validator.isSemVer = () => functionNotIncluded('isSemVer');
validator.isSlug = () => functionNotIncluded('isSlug');
validator.isStrongPassword = () => functionNotIncluded('isStrongPassword');
validator.isSurrogatePair = () => functionNotIncluded('isSurrogatePair');
validator.isTaxID = () => functionNotIncluded('isTaxID');
validator.isTime = () => functionNotIncluded('isTime');
validator.isUppercase = () => functionNotIncluded('isUppercase');
validator.isURL = () => functionNotIncluded('isURL');
validator.isVariableWidth = () => functionNotIncluded('isVariableWidth');
validator.isVAT = () => functionNotIncluded('isVAT');
validator.isWhitelisted = () => functionNotIncluded('isWhitelisted');
validator.ltrim = () => functionNotIncluded('ltrim');
validator.matches = () => functionNotIncluded('matches');
validator.normalizeEmail = () => functionNotIncluded('normalizeEmail');
validator.rtrim = () => functionNotIncluded('rtrim');
validator.stripLow = () => functionNotIncluded('stripLow');
validator.toBoolean = () => functionNotIncluded('toBoolean');
validator.toDate = () => functionNotIncluded('toDate');
validator.toFloat = () => functionNotIncluded('toFloat');
validator.toInt = () => functionNotIncluded('toInt');
validator.trim = () => functionNotIncluded('trim');
validator.unescape = () => functionNotIncluded('unescape');
validator.whitelist = () => functionNotIncluded('whitelist');

function functionNotIncluded(func) {
	throw new Error('`' + func + '` function from `validator` package is not included in a browser version of `sequelize`. To fix this, import the `' + func + '` function from `validator/lib/' + func + '` manually and then either (a) use it in a field\'s `validate` or (b) set it on the `Sequelize.Validator` object.');
}