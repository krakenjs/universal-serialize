/* @flow */

import { TYPE } from '../constants';

export type SerializedDate = {|
    __type__ : typeof TYPE.DATE,
    __date__ : string
|};

export function serializeDate(val : Date) : SerializedDate {
    return {
        __type__: TYPE.DATE,
        __date__: val.toJSON()
    };
}

export function deserializeDate({ __date__ } : SerializedDate) : Date {
    return new Date(__date__);
}
