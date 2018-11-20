/* @flow */

import { serializeType } from '../common';
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';

export type SerializedError = {|
    message : string,
    stack : string,
    code : string | number | void
|};

// $FlowFixMe
export function serializeError({ message, stack, code } : Error) : NativeSerializedType<typeof TYPE.ERROR, SerializedError> {
    return serializeType(TYPE.ERROR, { message, stack, code });
}

export function deserializeError({ message, stack, code } : SerializedError) : Error {
    const error = new Error(message);
    // $FlowFixMe
    error.code = code;
    error.stack = `${ stack }\n\n${ error.stack }`;
    return error;
}
