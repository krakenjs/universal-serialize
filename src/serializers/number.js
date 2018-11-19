/* @flow */

export type SerializedNumber = number;

export function serializeNumber(val : number) : SerializedNumber {
    return val;
}

export function deserializeNumber(val : SerializedNumber) : number {
    return val;
}
