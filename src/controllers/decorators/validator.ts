import { MetaDatakeys } from "./MetaDataKeys"
import "reflect-metadata";


export function validator(params: any[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetaDatakeys.validator, params, target, key)
    }
}

