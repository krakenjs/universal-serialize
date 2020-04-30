/* @flow */

import { serializeType } from '../common';
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';

import { serializeObject } from './object';

export type SerializedError = {|
    message : string,
    stack : string,
    code : string | number | void,
    data : mixed
|};

// $FlowFixMe
export function serializeError({ message, stack, code, data } : Error) : NativeSerializedType<typeof TYPE.ERROR, SerializedError> {
    return serializeType(TYPE.ERROR, { message, stack, code, data });
}

export function deserializeError({ message, stack, code, data } : SerializedError) : Error {
    const error = new Error(message);
    // $FlowFixMe
    error.code = code;

    if (data) {
        // $FlowFixMe
        error.data = serializeObject(data);
    }

    error.stack = `${ stack }\n\n${ error.stack }`;
    return error;
}
