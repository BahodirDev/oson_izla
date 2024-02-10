import { RequestHandler } from "express"
import { MetaDatakeys } from "./MetaDataKeys"

export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetaDatakeys.middleware, target, key) || [];
        Reflect.defineMetadata(MetaDatakeys.middleware, [...middlewares, middleware], target, key);
    }
}