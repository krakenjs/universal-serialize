Universal Serialize
-------------------

Universal serializer and deserializer, which supports many build-in javascript types, and any number of custom types you want to support

## Simple serialization

```javascript
import { serialize, deserialize } from 'universal-serialize';


// Define a complex object
const originalObject = {
  foo: 'bar',
  date: new Date(),
  error: new Error('world')
};

// Serialize the complex object
const jsonString = serialize(originalObject);

// Deserialize the object
const deserializedObject = deserialize(jsonString);

// Make use of the deserialized data and objects
console.log(
  deserializedObject.foo,
  deserializedObject.date.toUTCString(),
  deserializedObject.error.stack
);
```

By default universal serialize will serialize:

- Errors
- Regexes
- Dates
- Arrays
- Objects
- Strings
- Numbers
- Booleans
- Nulls

## Custom serialization

```javascript
import { serialize, deserialize, serializeType, TYPE } from 'universal-serialize';

// Define a new serialization type
const SERIALIZED_FUNCTION = 'SERIALIZED_FUNCTION';

// Define a complex object containing a function
const originalObject = {
    sayHello: () => {
        console.log('Hello world!');
    };
};

// Serialize the object with a special handler to serialize function types
const jsonString = serialize(originalObject, {
    [ TYPE.FUNCTION ]: (val) => {
        // Serialize the function as a 'serialized function'
        return serializeType(SERIALIZED_FUNCTION, val.toString());
    }
});

// Deserialize any `SERIALIZED_FUNCTION` types from the serialized object
const deserializedObject = deserialize(jsonString, {
    [ SERIALIZED_FUNCTION ]: (fnString) => {
      return eval(fnString);
    }
});

// Call the deserialized functionn
deserializedObject.sayHello();
```

Quick Start
-----------

#### Getting Started

- Fork the module
- Run setup: `npm install`
- Start editing code in `./src` and writing tests in `./tests`
- `npm run build`

#### Building

```bash
npm run build
```

#### Tests

- Edit tests in `./test/tests`
- Run the tests:

  ```bash
  npm run test
  ```

#### Testing with different/multiple browsers

```bash
npm run karma -- --browser=PhantomJS
npm run karma -- --browser=Chrome
npm run karma -- --browser=Safari
npm run karma -- --browser=Firefox
npm run karma -- --browser=PhantomJS,Chrome,Safari,Firefox
```

#### Keeping the browser open after tests

```bash
npm run karma -- --browser=Chrome --keep-open
```

#### Publishing

##### Before you publish for the first time:

- Delete the example code in `./src`, `./test/tests` and `./demo`
- Edit the module name in `package.json`
- Edit `README.md` and `CONTRIBUTING.md`

##### Then:

- Publish your code: `npm run release` to add a patch
  - Or `npm run release:path`, `npm run release:minor`, `npm run release:major`
