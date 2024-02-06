const { UTC } = require("../enums/utcEnum");

function getUtcCallback(req, res, next) {
    req.utc = req.headers?.utc ?? UTC.utc;
    next();
}

module.exports = { getUtcCallback };