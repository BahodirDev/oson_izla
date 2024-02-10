import { MetaDatakeys } from "./MetaDataKeys";
import { Methods } from "./Methods"
import "reflect-metadata";
function RouteBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string, dec: PropertyDescriptor) {
            Reflect.defineMetadata(MetaDatakeys.path, path, target, key)
            Reflect.defineMetadata(MetaDatakeys.method, method, target, key)
        }
    }
}

export const get = RouteBinder(Methods.get);
export const post = RouteBinder(Methods.post);
export const patch = RouteBinder(Methods.patch);
export const del = RouteBinder(Methods.del);
