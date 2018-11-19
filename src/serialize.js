/* @flow */

import { TYPE } from './constants';
import type { Thenable, CustomSerializedType, NativeSerializedType } from './types';
import { determineType, isSerializedType } from './common';
import {
    serializeFunction,
    serializeError,
    serializePromise,
    serializeRegex,
    serializeDate,
    serializeArray,
    serializeObject,
    serializeString,
    serializeNumber,
    serializeBoolean,
    serializeNull
} from './serializers';

type Serializer<I : mixed> = (I, string) => NativeSerializedType | CustomSerializedType | mixed | void;

type Serializers = {|
    function? : Serializer<Function>,
    error? : Serializer<Error>,
    promise? : Serializer<Thenable>,
    regex? : Serializer<RegExp>,
    date? : Serializer<Date>,
    array? : Serializer<$ReadOnlyArray<mixed>>,
    object? : Serializer<Object>,
    string? : Serializer<string>,
    number? : Serializer<number>,
    boolean? : Serializer<boolean>,
    null? : Serializer<null>
|};

const SERIALIZER : Serializers = {
    [ TYPE.FUNCTION ]:  serializeFunction,
    [ TYPE.ERROR ]:     serializeError,
    [ TYPE.PROMISE ]:   serializePromise,
    [ TYPE.REGEX ]:     serializeRegex,
    [ TYPE.DATE ]:      serializeDate,
    [ TYPE.ARRAY ]:     serializeArray,
    [ TYPE.OBJECT ]:    serializeObject,
    [ TYPE.STRING ]:    serializeString,
    [ TYPE.NUMBER ]:    serializeNumber,
    [ TYPE.BOOLEAN ]:   serializeBoolean,
    [ TYPE.NULL ]:      serializeNull
};

// $FlowFixMe
const defaultSerializers : Serializers = {};

export function serialize<T : mixed>(obj : T, serializers : Serializers = defaultSerializers) : string {

    function replacer(key) : ?mixed {
        const val = this[key];

        if (isSerializedType(this)) {
            return val;
        }
        
        const type = determineType(val);

        if (!type) {
            return val;
        }

        // $FlowFixMe
        const serializer = serializers[type] || SERIALIZER[type];

        if (!serializer) {
            return val;
        }

        return serializer(val, key);
    }

    const result = JSON.stringify(obj, replacer);

    if (typeof result === 'undefined') {
        return TYPE.UNDEFINED;
    }

    return result;
}

export function serializeType<T : string, V : mixed>(type : T, val : V) : CustomSerializedType {
    return {
        __type__: type,
        __val__:  val
    };
}
