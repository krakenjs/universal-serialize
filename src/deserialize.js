/* @flow */

import type { Thenable, NativeSerializedType, CustomSerializedType } from './types';
import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import {
    deserializeFunction,
    deserializeError,
    deserializePromise,
    deserializeRegex,
    deserializeDate,
    deserializeArray,
    deserializeObject,
    deserializeString,
    deserializeNumber,
    deserializeBoolean,
    deserializeNull
} from './serializers';

type Deserializer<O : mixed> = (NativeSerializedType | CustomSerializedType | mixed, string) => O;

type Deserializers = {
    function? : Deserializer<Function>,
    error? : Deserializer<Error>,
    promise? : Deserializer<Thenable>,
    regex? : Deserializer<RegExp>,
    date? : Deserializer<Date>,
    array? : Deserializer<$ReadOnlyArray<mixed>>,
    object? : Deserializer<Object>,
    string? : Deserializer<string>,
    number? : Deserializer<number>,
    boolean? : Deserializer<boolean>,
    null? : Deserializer<null>,
    [string] : Deserializer<mixed>
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

        const type = isSerializedType(val)
            ? val.__type__
            : determineType(val);

        if (!type) {
            return val;
        }

        // $FlowFixMe
        if (deserializers[type]) {
            // $FlowFixMe
            return deserializers[type](val.__val__, key);
        } else if (DESERIALIZER[type]) {
            // $FlowFixMe
            return DESERIALIZER[type](val, key);
        } else {
            return val;
        }
    }

    return JSON.parse(str, replacer);
}
