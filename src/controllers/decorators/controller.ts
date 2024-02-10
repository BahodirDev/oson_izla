import { AppRouter } from "../../AppRouter"
import { MetaDatakeys } from "./MetaDataKeys";
import { Methods } from "./Methods";

export function controller(routePrefix: string) {

    return function (target: Function) {
        const router = AppRouter.getInstance();
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetaDatakeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetaDatakeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetaDatakeys.middleware, target.prototype, key) || [];
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
            }
        });
    }
}