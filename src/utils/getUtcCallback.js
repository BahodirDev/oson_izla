const { UTC } = require("../enums/utcEnum");

function getUtcCallback(req, res, next) {
    let clientTimezoneOffset = req.headers['x-timezone'] ?? UTC.utc;
    let clientTimezone;
    if (clientTimezoneOffset === 0) {
        clientTimezone = 'UTC'
    } else {
        const sign = clientTimezoneOffset <= 0 ? '+' : '-';
        const hours = Math.abs(Math.floor(clientTimezoneOffset));
        const minutes = Math.abs(clientTimezoneOffset % 1 * 60);
        clientTimezone = `UTC${sign}${hours}:${minutes}`;
    }
    req.utc = clientTimezone;

    next();
}

module.exports = { getUtcCallback };