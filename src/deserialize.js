/* @flow */

import type { Thenable } from './types';
import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import {
    deserializeFunction,
    deserializeError, type SerializedError,
    deserializePromise,
    deserializeRegex, type SerializedRegex,
    deserializeDate, type SerializedDate,
    deserializeArray,
    deserializeObject,
    deserializeString,
    deserializeNumber,
    deserializeBoolean,
    deserializeNull
} from './serializers';

type Deserializer<V : mixed, S : mixed> = (serializedValue : S, key : string) => V;
type PrimitiveDeserializer<V, S = V> = (serializedValue : S, key : string) => V;

type Deserializers = {
    function? : Deserializer<Function, *>,
    error? : Deserializer<Error, SerializedError>,
    promise? : Deserializer<Thenable, *>,
    regex? : Deserializer<RegExp, SerializedRegex>,
    date? : Deserializer<Date, SerializedDate>,
    array? : PrimitiveDeserializer<$ReadOnlyArray<mixed>>,
    object? : PrimitiveDeserializer<Object>,
    string? : PrimitiveDeserializer<string>,
    number? : PrimitiveDeserializer<number>,
    boolean? : PrimitiveDeserializer<boolean>,
    null? : PrimitiveDeserializer<null>,
    [string] : Deserializer<mixed, *>
};

// $FlowFixMe
const DESERIALIZER : Deserializers = {
    [ TYPE.FUNCTION ]:  deserializeFunction,
    [ TYPE.ERROR ]:     deserializeError,
    [ TYPE.PROMISE ]:   deserializePromise,
    [ TYPE.REGEX ]:     deserializeRegex,
    [ TYPE.DATE ]:      deserializeDate,
    [ TYPE.ARRAY ]:     deserializeArray,
    [ TYPE.OBJECT ]:    deserializeObject,
    [ TYPE.STRING ]:    deserializeString,
    [ TYPE.NUMBER ]:    deserializeNumber,
    [ TYPE.BOOLEAN ]:   deserializeBoolean,
    [ TYPE.NULL ]:      deserializeNull
};

// $FlowFixMe
const defaultDeserializers : Deserializers = {};

export function deserialize<T : mixed | null | void>(str : string, deserializers : Deserializers = defaultDeserializers) : T {
    if (str === TYPE.UNDEFINED) {
        // $FlowFixMe
        return;
    }

    function replacer(key, val) : ?mixed {
        if (isSerializedType(this)) {
            return val;
        }

        let type;
        let value;

        if (isSerializedType(val)) {
            type = val.__type__;
            value = val.__val__;
        } else {
            type = determineType(val);
            value = val;
        }

        if (!type) {
            return value;
        }

        // $FlowFixMe
        const deserializer = deserializers[type] || DESERIALIZER[type];

        if (!deserializer) {
            return value;
        }

        return deserializer(value, key);
    }

    return JSON.parse(str, replacer);
}
