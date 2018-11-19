/* @flow */

export type SerializedArray<T : mixed = mixed> = $ReadOnlyArray<T>;

export function serializeArray<T : mixed>(val : $ReadOnlyArray<T>) : SerializedArray<T> {
    return val;
}

export function deserializeArray<T : mixed>(val : SerializedArray<T>) : $ReadOnlyArray<T> {
    return val;
}
