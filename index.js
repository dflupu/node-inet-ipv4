'use strict';

var MAX32BITS = 0xFFFFFFFF;
var MAX24BITS = 0xFFFFFF;
var MAX16BITS = 0xFFFF;
var MAX8BITS  = 0xFF;

var POWS256 = [
    1,
    256,
    256 * 256,
    256 * 256 * 256
];

var OCT_REGEX = /^0\d+$/;
var HEX_REGEX = /^0[xX][\da-fA-F]+$/;
var DEC_REGEX = /^0$|^[1-9]\d*$/;

var VALIDATION_REGEX = new RegExp([
    '^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.',
    '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.',
    '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.',
    '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
].join(''));

module.exports = {
    'aton': aton,
    'ntoa': ntoa,
    'normalize': normalize,
    'isValid': isValid
};

function aton(ip) {

    var value = _aton(ip);
    return value !== undefined ? value : null;
}

function ntoa(ip) {

    var value = _ntoa(ip);
    return value !== undefined ? value : null;
}

function normalize(ip) {

    var intRepr = aton(ip);

    if (intRepr !== null) {
        return ntoa(intRepr);
    }
    else {
        return null;
    }
}

function isValid(ip) {

    return VALIDATION_REGEX.test(ip);
}

function _ntoa(ip) {

    if (ip < 0 || ip > MAX32BITS || ip % 1 !== 0) {
        return;
    }

    var parts = [];

    for (var index = 3; index >= 0; --index) {
        var part = ip % 256;
        parts.unshift(part);
        ip = Math.floor(ip / 256);
    }

    return parts.join('.');
}

function _aton(ip) {

    var parts = ip.split('.');

    if (parts.length > 4) {
        return;
    }

    for (var index = 0; index < parts.length; ++index) {

        var part = parts[index];
        var radix = null;

        if (DEC_REGEX.test(part)) {
            radix = 10;
        }
        else if (HEX_REGEX.test(part)) {
            radix = 16;
        }
        else if (OCT_REGEX.test(part)) {
            radix = 8;
        }
        else {
            return;
        }

        parts[index] = parseInt(part, radix);

        if (isNaN(parts[index])) {
            return;
        }
    }

    var ipNum = 0;

    switch (parts.length) {
    case 1:
        if (parts[0] > MAX32BITS) {
            return;
        }

        ipNum = parts[0];
        break;

    case 2:
        if (parts[0] > MAX8BITS || parts[1] > MAX24BITS) {
            return;
        }

        ipNum = parts[0] * POWS256[3] + parts[1];
        break;

    case 3:
        if (parts[0] > MAX8BITS ||
                parts[1] > MAX8BITS ||
                parts[2] > MAX16BITS) {
            return;
        }

        ipNum = parts[0] * POWS256[3] +
            parts[1] * POWS256[2] +
            parts[2];

        break;

    case 4:
        if (parts[0] > MAX8BITS ||
                parts[1] > MAX8BITS ||
                parts[2] > MAX8BITS ||
                parts[3] > MAX8BITS) {
            return;
        }

        ipNum = parts[0] * POWS256[3] +
            parts[1] * POWS256[2] +
            parts[2] * POWS256[1] +
            parts[3];

        break;
    default:
        return;
    }

    return ipNum;
}
