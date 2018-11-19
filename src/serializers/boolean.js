/* @flow */

export type SerializedBoolean = boolean;

export function serializeBoolean(val : boolean) : SerializedBoolean {
    return val;
}

export function deserializeBoolean(val : SerializedBoolean) : boolean {
    return val;
}
