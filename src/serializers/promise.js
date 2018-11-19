/* @flow */

export type SerializedPromise = void;

export function serializePromise() : SerializedPromise {
    // pass
}

export function deserializePromise() {
    throw new Error(`Promise serialization is not implemented; nothing to deserialize`);
}
