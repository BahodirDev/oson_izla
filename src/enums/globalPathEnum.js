const path = require('path')

class GlobalPathes {
    static fileUploadPath = path.join(__dirname, "..", "..", "uploads");
}

module.exports = { GlobalPathes };