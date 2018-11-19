/* @flow */

import { deserialize } from '../../src';

describe('error cases', () => {

    it('should error while trying to deserialize a function', () => {
        let error;

        try {
            deserialize('{ "__type__": "function" }');
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should error while trying to deserialize a promise', () => {
        let error;

        try {
            deserialize('{ "__type__": "promise" }');
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });
});
