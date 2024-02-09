const path = require('path')

class GlobalPathes {
    static fileUploadPath = path.join(__dirname, "..", "..", "uploads");
}

export default GlobalPathes;