"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
class GlobalPathes {
}
GlobalPathes.fileUploadPath = path.join(__dirname, "..", "..", "uploads");
exports.default = GlobalPathes;
