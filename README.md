Types and Names
===============

[![Coveralls Status][coveralls-image]][coveralls-url] [![Build Status][travis-image]][travis-url]  [![Dependency Status][depstat-image]][depstat-url] [![npm version][npm-image]][npm-url] [![License][license-image]][license-url] [![Known Vulnerabilities][snyk-image]][snyk-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![david-dm Badge][david-dm-image]][david-dm-url]
[![bitHound Code][bithound-image]][bithound-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

This will provide more useful types or names from any JavaScript value.

## Usage
For just the `type()` function
```js
const { type } = require( 'typeofs' );

console.log( type( 5 ) ); // => 'number'
```
or if you want more functionality
```js
const 
    { type, name, nameOf, isAsync, isGenerator, isClass, isInstance, isFunctionInstance } = require( 'typeofs' ),
    myFunc = function() { return arguments; };

console.log( type( myFunc ) ); // => 'function'
console.log( name( myFunc ) ); // => 'myfunc'
console.log( nameOf( myFunc ) ); // => 'myFunc'
console.log( type( myFunc() ) ); // => 'arguments'
console.log( name( myFunc() ) ); // => 'Arguments'

console.log( isAsync( async function () {} ) ); // => true
console.log( isGenerator( function* () {} ) ); // => true
console.log( isClass( class {} ) ); // => true
console.log( isInstance( new class {} ) ); // => true
console.log( isFunctionInstance( new function () {} ) ); // => true

```
Here is a list of examples that covers most types and names.

| Value | `type()` | `name()` | `nameOf()` |
| :--- | :--- | :--- | :--- |
| null | null | null | null |
| undefined | undefined | undefined | undefined |
| 'foo', | string | string | String |
| 5 | number | number | Number |
| false | boolean | boolean | Boolean |
| /^yes/ | object | regexp | RegExp |
| [ foo, "bar" ] | array | array | Array |
| { hello: 'world' } | object | object | Object |
| function() {} | function | function | Function |
| String( 'foo' ) | string | string | String |
| Number( '42' ) | number | number | Number |
| Boolean( '1' ) | boolean | boolean | Boolean |
| new Date() | object | date | Date |
| new RegExp( '^no','g' ) | object | regexp | RegExp |
| new Array() | array | array | Array |
| new Object() | object | object | Object |
| Object.create( null ) | object | object | Object |
| new Function( 'x','y','return x + y' ) | function | anonymous | anonymous |
| new Error( 'error' ) | object | error | Error |
| new TypeError( 'type error' ) | object | typeerror | TypeError |
| Error | function | error | Error |
| TypeError | function | typeerror | TypeError |
| NaN | number | nan | NaN |
| Infinity | number | number | Number |
| Math | object | math | Math |
| JSON, | object | json | JSON |
| ( function() { return arguments; } )() | object | arguments | Arguments |
| Symbol( 'foo' ) | symbol | symbol | Symbol |
| Promise.resolve( 1 ) | object | promise | Promise |
| Promise | function | promise | Promise |
| class TestClass {} | function | testclass | TestClass |
| new Person( 'alice', 5 ) | object | person | Person |
| new AnonPerson( 'bob', 4 ) | object | anonperson | AnonPerson |
| new ( class Foo { constructor() {} } ) | object | foo | Foo |
| new ( class { constructor() {} } ) | object | object | Object |
| classVar | function | named | Named |
| anonClass | function | anonclass | anonClass |
| function * gen() {} | function | gen | gen |

## Functions

### name( value )
Returns the name of the value, if available, as all lower case.

### type( value )
Returns the type of the value as all lower case. Similar in most respects to the
builtin `typeof` except it returns an `Array` as `array` and _not_ `object`.

### nameOf( value )
Returns the name of the value, if available, retaining upper and lower case letters.

### isInstance( value )
This returns true if the object is an instance of a class. It has to be an instance of a `class` specifically,
a function does not count as a constructor for this function.

### isFunctionInstance( value )
Returns true if the object is an instance of a function (i.e. `new function () {}`). Will return
false if it is an instance of a `class`.

### isClass( value )
This returns true if the function provided has been defined with the `class` keyword.

### isAsync( value )
Returns true if the function is defined using the `async` keyword.

### isGenerator( value )
Will be true if the function is a generator.

### functionInfo( value, returnIfNotFunction = null )
This will return an object with information about a function. If the value provided is _not_ a function
it will return `null` by default or whatever has been provided by the optional secodn parameter. The reason
for why you might want to provide an alternate return would be situations like this:
```js
functionInfo( 5 ).isGenerator   // Error, can't read 'isGenerator' of 'null'
// but...
functionInfo( 5, {} ).isGenerator   // falsey
```

### infoOf( value )
Return an object with additional information regarding the value provided. The object will have fields similar
to the functions listed above, if applicable and truthy.

[coveralls-url]: https://coveralls.io/github/julianjensen/typeofs?branch=master
[travis-url]: https://travis-ci.org/julianjensen/typeofs
[snyk-url]: https://snyk.io/test/github/julianjensen/typeofs
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[snyk-image]: https://snyk.io/test/github/julianjensen/typeofs/badge.svg
[travis-image]: http://img.shields.io/travis/julianjensen/typeofs.svg
[license-url]: https://github.com/julianjensen/typeofs/blob/master/LICENSE
[coveralls-image]: https://coveralls.io/repos/github/julianjensen/typeofs/badge.svg?branch=master
[depstat-url]: https://gemnasium.com/github.com/julianjensen/typeofs
[depstat-image]: https://gemnasium.com/badges/github.com/julianjensen/typeofs.svg
[npm-image]: https://badge.fury.io/js/typeofs.svg
[npm-url]: https://badge.fury.io/js/typeofs
[codacy-url]: https://www.codacy.com/app/julianjensen/typeofs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=julianjensen/typeofs&amp;utm_campaign=Badge_Grade
[codacy-image]: https://api.codacy.com/project/badge/Grade/807c9c7f10d447d699711e1427fe68ca
[david-dm-image]: https://david-dm.org/julianjensen/typeofs.svg
[david-dm-url]: https://david-dm.org/julianjensen/typeofs
[bithound-image]: https://www.bithound.io/github/julianjensen/typeofs/badges/code.svg
[bithound-url]: https://www.bithound.io/github/julianjensen/typeofs
[codeclimate-image]: https://codeclimate.com/github/julianjensen/typeofs/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/julianjensen/typeofs
