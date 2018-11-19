/* @flow */

import { TYPE } from '../constants';

export type SerializedRegex = {|
    __type__ : typeof TYPE.REGEX,
    __source__ : string
|};

export function serializeRegex(val : RegExp) : SerializedRegex {
    return {
        __type__:   TYPE.REGEX,
        __source__: val.source
    };
}

export function deserializeRegex({ __source__ } : SerializedRegex) : RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(__source__);
}
