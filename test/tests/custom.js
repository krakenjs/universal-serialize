/* @flow */

import { TYPE, serialize, deserialize, serializeType, serializeObject } from '../../src';

describe('custom type cases', () => {

    const CUSTOM_SERIALIZATION = 'CUSTOM_SERIALIZATION';

    it('should serialize a date with a custom serializer and deserializer', () => {

        const val = { foo: new Date() };

        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.DATE ]: (value, key) => {
                if (value.toJSON() !== val.foo.toJSON()) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);
        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize a boolean with a custom serializer and deserializer', () => {
        const val = { foo: true };

        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.BOOLEAN ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };
        
        const result = deserialize(serialize(val, serializers), deserializers);
        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize a string with a custom serializer and deserializer', () => {
        const val = { foo: 'hello world\nsup' };

        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.STRING ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize a number with a custom serializer and deserializer', () => {
        const val = { foo: 12345 };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.NUMBER ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ val.foo }`);
        }
    });

    it('should serialize a float with a custom serializer and deserializer', () => {
        const val = { foo: 123.45 };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.NUMBER ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ val.foo }`);
        }
    });

    it('should serialize an array  with a custom serializer and deserializer', () => {
        const val = { foo: [ 1, 2, 3, 'hello', { '5': 6 } ] };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.ARRAY ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize an object  with a custom serializer and deserializer', () => {
        const val = { foo: { woop: [ 1, 2, 3, 'hello', { '5': 6 } ], floop: 5 } };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.OBJECT ]: (value, key) => {
                if (value !== val.foo) {
                    return serializeObject(value);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize a regex with a custom serializer and deserializer', () => {
        const val = { foo: /hello world[123]/ };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.REGEX ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize null with a custom serializer and deserializer', () => {
        const val = { foo: null };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.NULL ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize an error with a custom serializer and deserializer', () => {
        const val = { foo: new Error('meep') };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.ERROR ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize a promise with a custom serializer and deserializer', () => {
        // eslint-disable-next-line no-restricted-globals, compat/compat, promise/no-native
        const val = { foo: Promise.resolve(1) };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.PROMISE ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });

    it('should serialize a function with a custom serializer and deserializer', () => {
        const val = {
            foo: function foo(bar : string) : string {
                return bar;
            }
        };
        const serializedValue = `serialized::${ Math.random().toString() }`;
        const deserializedValue = `deserialized::${ Math.random().toString() }`;
    
        const serializers = {
            [ TYPE.FUNCTION ]: (value, key) => {
                if (value !== val.foo) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(val.foo) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return serializeType(CUSTOM_SERIALIZATION, serializedValue);
            }
        };
    
        const deserializers = {
            [ CUSTOM_SERIALIZATION ]: (value, key) => {
                if (value !== serializedValue) {
                    throw new Error(`Expected ${ JSON.stringify(value) } to equal ${ JSON.stringify(serializedValue) }`);
                }

                if (key !== 'foo') {
                    throw new Error(`Expected key to be foo`);
                }
    
                return deserializedValue;
            }
        };

        const result = deserialize(serialize(val, serializers), deserializers);

        if (result.foo !== deserializedValue) {
            throw new Error(`Expected ${ result.foo } to equal ${ deserializedValue }`);
        }
    });
});
