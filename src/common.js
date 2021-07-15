/* @flow */

import { TYPE } from './constants';
import type { CustomSerializedType } from './types';

export function isSerializedType(item : mixed) : boolean {
    return (typeof item === 'object' && item !== null && typeof item.__type__ === 'string');
}

export function determineType(val : mixed) : $Values<typeof TYPE> | void {
    if (typeof val === 'undefined') {
        return TYPE.UNDEFINED;
    }

    if (val === null) {
        return TYPE.NULL;
    }

    if (Array.isArray(val)) {
        return TYPE.ARRAY;
    }

    if (typeof val === 'function') {
        return TYPE.FUNCTION;
    }

    if (typeof val === 'object') {

        if (val instanceof Error) {
            return TYPE.ERROR;
        }

        if (typeof val.then === 'function') {
            return TYPE.PROMISE;
        }

        // $FlowFixMe method-unbinding
        if (Object.prototype.toString.call(val) === '[object RegExp]') {
            return TYPE.REGEX;
        }

        // $FlowFixMe method-unbinding
        if (Object.prototype.toString.call(val) === '[object Date]') {
            return TYPE.DATE;
        }

        return TYPE.OBJECT;
    }

    if (typeof val === 'string') {
        return TYPE.STRING;
    }

    if (typeof val === 'number') {
        return TYPE.NUMBER;
    }

    if (typeof val === 'boolean') {
        return TYPE.BOOLEAN;
    }
}

export function serializeType<T : string, V : mixed>(type : T, val : V) : CustomSerializedType<T, V> {
    return {
        __type__: type,
        __val__:  val
    };
}
