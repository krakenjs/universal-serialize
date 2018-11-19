/* @flow */

export type SerializedString = string;

export function serializeString(val : string) : SerializedString {
    return val;
}

export function deserializeString(val : SerializedString) : string {
    return val;
}
