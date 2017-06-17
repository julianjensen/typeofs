/** ****************************************************************************************************
 * File: index-test.js
 * @author Julian Jensen <jjdanois@gmail.com> on 17-AUG-2016
 * @version 0.0.1
 *******************************************************************************************************/
'use strict';
// @formatter:off

const
    object = o => typeof o === 'object' && !Array.isArray( o ),
    _inspect = require( 'util' ).inspect,
    inspect = ( o, d ) => _inspect( o, typeof d === 'number' ? { depth: d } : object( d ) ? d : {} );

_inspect.defaultOptions = { depth: 4, colors: true };

/**
 * @param {String} name
 * @param {Number} age
 * @constructor
 */
function Person( name, age )
{
    this.name = name;
    this.age = age;
}

const AnonPerson = function( name, age ) {
        this.name = name;
        this.age = age;
    },
    classVar = class Named {},
    anonClass = class {};

const
    { nameOf, name, type, isInstance, isClass, isAsync, isGenerator, functionInfo, infoOf, isFunctionInstance } = require( '../index' ),
    chai = require( 'chai' ),
    expect = chai.expect,

    tests = [   null, undefined, 'foo',     5, false, /^yes/,   [ 'foo', 42 ], { hello: 'world' }, function() {},
                String( 'foo' ), Number( '42' ), Boolean( '1' ), new Date(), new RegExp( '^no', 'g' ), new Array(), new Object(),
                Object.create( null ), new Function( 'x', 'y', 'return x + y' ), new Error( 'error' ), new TypeError( 'type error' ),
                Error, TypeError, NaN, Infinity, Math, JSON, ( function() { return arguments; } )(), Symbol( 'foo' ), Promise.resolve( 1 ),
                Promise, class TestClass {}, new Person( 'alice', 5 ), new AnonPerson( 'bob', 4 ), new ( class Foo { constructor() {} } ), new ( class { constructor() {} } ),
                classVar, anonClass, function * gen() {} ],

    types = [ 'null', 'undefined', 'string', 'number', 'boolean', 'object', 'array', 'object', 'function',
                'string', 'number', 'boolean', 'object', 'object', 'array', 'object',
                'object', 'function', 'object', 'object',
                'function', 'function', 'number', 'number', 'object', 'object', 'object', 'symbol', 'object',
                'function', 'function', 'object', 'object', 'object', 'object', 'function', 'function', 'function' ],
    names = [ 'null', 'undefined', 'string',    'number', 'boolean', 'regexp',  'array', 'object', 'function',
                'string', 'number', 'boolean',  'date', 'regexp', 'array',  'object',
                'object', 'anonymous', 'error', 'typeerror',
                'error', 'typeerror', 'nan', 'number', 'math', 'json', 'arguments', 'symbol', 'promise',
                'promise', 'testclass', 'person', 'anonperson', 'foo', 'object',
                'named', 'anonclass', 'gen' ],
    namesUc = [ 'null', 'undefined', 'String',    'Number', 'Boolean', 'RegExp',  'Array', 'Object', 'Function',
                'String', 'Number', 'Boolean',  'Date', 'RegExp', 'Array',  'Object',
                'Object', 'anonymous', 'Error', 'TypeError',
                'Error', 'TypeError', 'NaN', 'Number', 'Math', 'JSON', 'Arguments', 'Symbol', 'Promise',
                'Promise', 'TestClass', 'Person', 'AnonPerson', 'Foo', 'Object',
                'Named', 'anonClass', 'gen' ];

// tests.forEach( t => console.log( `type: ${type( t )}, name: ${name( t )}, nameOf: ${nameOf( t )}` ) );
//
// console.log( 'gen:', functionInfo( function * () {} ) );
// console.log( 'gen1:', ( async function () {} ).constructor.name );

describe( 'Types and names', function() {

    it( 'should get all expected types', () => {
        expect( tests.every( ( t, i ) => type( t ) === types[ i ] ) ).to.be.true;
    } );

    it( 'should get all expected names', () => {
        expect( tests.every( ( t, i ) => name( t ) === names[ i ] ) ).to.be.true;
    } );

    it( 'should get all expected names in the normal case', () => {
        expect( tests.every( ( t, i ) => nameOf( t ) === namesUc[ i ] ) ).to.be.true;
    } );

    it( 'should detect classes and instances', () => {
        expect( isClass( class Foo {} ) ).to.be.true;
        expect( isClass( new class Foo {} ) ).to.be.false;
        expect( isClass( new class {} ) ).to.be.false;
        expect( isClass( class {} ) ).to.be.true;

        expect( isInstance( class Foo {} ) ).to.be.false;
        expect( isInstance( new class Foo {} ) ).to.be.true;
        expect( isInstance( new class {} ) ).to.be.true;
        expect( isInstance( class {} ) ).to.be.false;

        expect( isClass( function() {} ) ).to.be.false;
        expect( isClass( new function() {} ) ).to.be.false;
        expect( isInstance( function() {} ) ).to.be.false;
        expect( isInstance( new function() {} ) ).to.be.false;
        expect( isFunctionInstance( function() {} ) ).to.be.false;
        expect( isFunctionInstance( new function() {} ) ).to.be.true;
    } );

    it( 'should detect async and generator functions', () => {
        expect( isAsync( function() {} ) ).to.be.false;
        expect( isAsync( new function() {} ) ).to.be.false;
        expect( isAsync( function * () {} ) ).to.be.false;
        expect( isAsync( async function() {} ) ).to.be.true;

        expect( isGenerator( function() {} ) ).to.be.false;
        expect( isGenerator( new function() {} ) ).to.be.false;
        expect( isGenerator( function * () {} ) ).to.be.true;
        expect( isGenerator( async function() {} ) ).to.be.false;
    } );

    it( 'should get info blocks', () => {
        expect( infoOf( null ) ).to.eql( { type: 'null' } );

        expect( functionInfo( function() {} ) ).to.eql( { type: 'function' } );
        expect( functionInfo( function Foo() {} ) ).to.eql( { type: 'function', name: 'Foo' } );
        expect( functionInfo( function * () {} ) ).to.eql( { type: 'function', isGenerator: true } );
        expect( functionInfo( async function() {} ) ).to.eql( { type: 'function', isAsync: true } );

        expect( infoOf( function() {} ) ).to.eql( { type: 'function' } );
        expect( infoOf( function Foo() {} ) ).to.eql( { type: 'function', name: 'Foo' } );
        expect( infoOf( new function() {} ) ).to.eql( { type: 'object', isFunctionInstance: true } );
        expect( infoOf( function * () {} ) ).to.eql( { type: 'function', isGenerator: true } );
        expect( infoOf( async function() {} ) ).to.eql( { type: 'function', isAsync: true } );
        expect( infoOf( class {} ) ).to.eql( { type: 'function', isClass: true } );
        expect( infoOf( new class {} ) ).to.eql( { type: 'object', isInstance: true } );
    } );
} );
