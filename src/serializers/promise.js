/* @flow */

import type { Thenable } from '../types';

export type SerializedPromise = void;

export function serializePromise() : SerializedPromise {
    // pass
}

export function deserializePromise() : Thenable {
    throw new Error(`Promise serialization is not implemented; nothing to deserialize`);
}
