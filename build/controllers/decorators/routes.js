"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.patch = exports.post = exports.get = void 0;
const MetaDataKeys_1 = require("./MetaDataKeys");
const Methods_1 = require("./Methods");
require("reflect-metadata");
function RouteBinder(method) {
    return function (path) {
        return function (target, key, dec) {
            Reflect.defineMetadata(MetaDataKeys_1.MetaDatakeys.path, path, target, key);
            Reflect.defineMetadata(MetaDataKeys_1.MetaDatakeys.method, method, target, key);
        };
    };
}
exports.get = RouteBinder(Methods_1.Methods.get);
exports.post = RouteBinder(Methods_1.Methods.post);
exports.patch = RouteBinder(Methods_1.Methods.patch);
exports.del = RouteBinder(Methods_1.Methods.del);
