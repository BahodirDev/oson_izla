"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUtcCallback = void 0;
const utcEnum_1 = require("../enums/utcEnum");
function getUtcCallback(req, res, next) {
    // let clientTimezoneOffset: number | string | string[] = req.headers['x-timezone'] ?? UTC.utc;
    let clientTimezoneOffset = utcEnum_1.UTC.utc;
    let clientTimezone;
    // Ensure clientTimezoneOffset is a number
    if (typeof clientTimezoneOffset === 'string') {
        clientTimezoneOffset = parseFloat(clientTimezoneOffset);
    }
    if (clientTimezoneOffset === 0) {
        clientTimezone = 'UTC';
    }
    else {
        const sign = clientTimezoneOffset <= 0 ? '+' : '-';
        const hours = Math.abs(Math.floor(clientTimezoneOffset));
        const minutes = Math.abs(clientTimezoneOffset % 1 * 60);
        clientTimezone = `UTC${sign}${hours}:${minutes}`;
    }
    req.utc = clientTimezone;
    next();
}
exports.getUtcCallback = getUtcCallback;
