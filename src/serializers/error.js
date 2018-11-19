/* @flow */

import { TYPE } from '../constants';

export type SerializedError = {|
    __type__ : typeof TYPE.ERROR,
    __message__ : string,
    __stack__ : string,
    __code__ : string | number | void
|};

export function serializeError(val : Error) : SerializedError {
    return {
        __type__:    TYPE.ERROR,
        __message__: val.message,
        __stack__:   val.stack,
        // $FlowFixMe
        __code__:    val.code
    };
}

export function deserializeError({ __message__, __code__, __stack__ } : SerializedError) : Error {
    const error = new Error(__message__);
    // $FlowFixMe
    error.code = __code__;
    error.stack = `${ __stack__ }\n\n${ error.stack }`;
    return error;
}
