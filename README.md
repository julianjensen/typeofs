Types and Names
===============

[![Coveralls Status][coveralls-image]][coveralls-url] [![Build Status][travis-image]][travis-url]  [![Dependency Status][depstat-image]][depstat-url] [![npm version][npm-image]][npm-url] [![License][license-image]][license-url] [![Known Vulnerabilities][snyk-image]][snyk-url]

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
    { type, name, nameOf } = require( 'typeofs' ),
    myFunc = function() { return arguments; };

console.log( type( myFunc ) ); // => 'function'
console.log( name( myFunc ) ); // => 'myfunc'
console.log( nameOf( myFunc ) ); // => 'myFunc'
console.log( type( myFunc() ) ); // => 'arguments'
console.log( name( myFunc() ) ); // => 'Arguments'
```
Here is a list of examples that should cover most types and names.



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
