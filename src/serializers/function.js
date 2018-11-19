/* @flow */

export type SerializedFunction = void;

export function serializeFunction() : SerializedFunction {
    // pass
}

export function deserializeFunction() {
    throw new Error(`Function serialization is not implemented; nothing to deserialize`);
}
