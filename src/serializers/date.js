/* @flow */

import { serializeType } from '../common';
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';

export type SerializedDate = string;

export function serializeDate(val : Date) : NativeSerializedType<typeof TYPE.DATE, SerializedDate> {
    return serializeType(TYPE.DATE, val.toJSON());
}

export function deserializeDate(val : string) : Date {
    return new Date(val);
}
