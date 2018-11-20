/* @flow */

import { TYPE } from './constants';
import type { Thenable, CustomSerializedType, NativeSerializedType } from './types';
import { determineType, isSerializedType } from './common';
import {
    serializeFunction,
    serializeError, type SerializedError,
    serializePromise,
    serializeRegex, type SerializedRegex,
    serializeDate, type SerializedDate,
    serializeArray,
    serializeObject,
    serializeString,
    serializeNumber,
    serializeBoolean,
    serializeNull
} from './serializers';

type NativeSerializer<V : mixed, S : mixed, T : $Values<typeof TYPE>> = (value : V, key : string) => NativeSerializedType<T, S>;
type CustomSerializer<V : mixed, S : mixed, T : string> = (value : V, key : string) => CustomSerializedType<T, S>;
type PrimitiveSerializer<V : mixed, S : mixed> = (value : V, key : string) => S;
type CustomOrPrimitiveSerializer<V : mixed, T : string> = CustomSerializer<V, *, T> | PrimitiveSerializer<V, *>;
type NativeOrCustomOrPrimitiveSerializer<V : mixed, S : mixed, T : string> = NativeSerializer<V, S, T> | CustomOrPrimitiveSerializer<V, T>;

type Serializers = {|
    function? : CustomOrPrimitiveSerializer<Function, typeof TYPE.FUNCTION>,
    error? : NativeOrCustomOrPrimitiveSerializer<Error, SerializedError, typeof TYPE.ERROR>,
    promise? : CustomOrPrimitiveSerializer<Thenable, typeof TYPE.PROMISE>,
    regex? : NativeOrCustomOrPrimitiveSerializer<RegExp, SerializedRegex, typeof TYPE.REGEX>,
    date? : NativeOrCustomOrPrimitiveSerializer<Date, SerializedDate, typeof TYPE.DATE>,
    array? : CustomOrPrimitiveSerializer<$ReadOnlyArray<mixed>, typeof TYPE.ARRAY>,
    object? : CustomOrPrimitiveSerializer<Object, typeof TYPE.OBJECT>,
    string? : CustomOrPrimitiveSerializer<string, typeof TYPE.STRING>,
    number? : CustomOrPrimitiveSerializer<number, typeof TYPE.NUMBER>,
    boolean? : CustomOrPrimitiveSerializer<boolean, typeof TYPE.BOOLEAN>,
    null? : CustomOrPrimitiveSerializer<null, typeof TYPE.NULL>
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
