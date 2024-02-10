"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const MetaDataKeys_1 = require("./MetaDataKeys");
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(MetaDataKeys_1.MetaDatakeys.middleware, target, key) || [];
        Reflect.defineMetadata(MetaDataKeys_1.MetaDatakeys.middleware, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
