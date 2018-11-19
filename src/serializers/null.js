/* @flow */

export type SerializedNull = null;

export function serializeNull(val : null) : SerializedNull {
    return val;
}

export function deserializeNull(val : SerializedNull) : null {
    return val;
}
