"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const MetaDataKeys_1 = require("./MetaDataKeys");
require("reflect-metadata");
function validator(params) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetaDataKeys_1.MetaDatakeys.validator, params, target, key);
    };
}
exports.validator = validator;
