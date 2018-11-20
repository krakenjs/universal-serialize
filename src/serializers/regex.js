/* @flow */

import { serializeType } from '../common';
import { TYPE } from '../constants';
import type { NativeSerializedType } from '../types';

export type SerializedRegex = string;

export function serializeRegex(val : RegExp) : NativeSerializedType<typeof TYPE.REGEX, SerializedRegex> {
    return serializeType(TYPE.REGEX, val.source);
}

export function deserializeRegex(val : string) : RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(val);
}
