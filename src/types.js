/* @flow */

import { TYPE } from './constants';

// eslint-disable-next-line flowtype/require-exact-type
export type Thenable = {
    then : () => Thenable,
    catch : () => Thenable
};

// eslint-disable-next-line flowtype/require-exact-type
export type SerializedType = {
    __type__ : string
};

export type NativeSerializedType = SerializedType & {
    __type__ : $Values<typeof TYPE>
};

export type CustomSerializedType = SerializedType & {|
    __type__ : string,
    __val__ : mixed
|};
