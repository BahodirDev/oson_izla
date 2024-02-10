"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const AppRouter_1 = require("../../AppRouter");
const MetaDataKeys_1 = require("./MetaDataKeys");
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetaDataKeys_1.MetaDatakeys.path, target.prototype, key);
            const method = Reflect.getMetadata(MetaDataKeys_1.MetaDatakeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetaDataKeys_1.MetaDatakeys.middleware, target.prototype, key) || [];
            const validator = Reflect.getMetadata(MetaDataKeys_1.MetaDatakeys.validator, target.prototype, key) || [];
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        });
    };
}
exports.controller = controller;
