/** ****************************************************************************************************
 *
 * A module for getting better type names as well as actual names.
 *
 * async function name() {}
 * class Name {}
 * function* name() {}
 *
 * File: index.js
 * @author Julian Jensen <julian@exploreplanet3.com> on 17-AUG-2016
 * @version 0.0.1
 *******************************************************************************************************/
'use strict';
// @formatter:off

const
    toString = Object.prototype.toString,
    className = o => toString.call( o ).slice( 8, -1 ),

    func = f => typeof f === 'function';

/**
 * @param {*} f
 * @return {boolean}
 */
function isAsync( f )
{
    return func( f ) && String( f ).startsWith( 'async ' );
}

/**
 * @param {*} f
 * @return {boolean}
 */
function isGenerator( f )
{
    return func( f ) && className( f ) === 'GeneratorFunction';
}

/**
 * @param {*} f
 * @return {boolean}
 */
function isClass( f )
{
    return func( f ) && String( f ).startsWith( 'class ' );
}

/**
 * @param {*} o
 * @return {boolean}
 */
function isInstance( o )
{
    return o && o.constructor && isClass( o.constructor );
}

/**
 * @param {*} o
 * @return {boolean}
 */
function isFunctionInstance( o )
{
    return o && o.constructor && func( o.constructor ) && [ 'Function', 'GeneratorFunction', 'AsyncFunction' ].indexOf( o.constructor.name ) === -1;
}

/**
 * @param {function} f
 * @return {boolean}
 */
function _isAsync( f )
{
    return String( f ).startsWith( 'async ' );
}

/**
 * @param {function} f
 * @return {boolean}
 */
function _isGenerator( f )
{
    return className( f ) === 'GeneratorFunction';
}

/**
 * @param {function} f
 * @return {boolean}
 */
function _isClass( f )
{
    return String( f ).startsWith( 'class ' );
}

/**
 * @param {function} f
 * @param {*} [returnIfBad=null]
 * @return {?Object}
 */
function functionInfo( f, returnIfBad = null )
{
    if ( !func( f ) ) return returnIfBad;

    const r = {
        type: 'function'
    };

    if ( f.name ) r.name = f.name;
    if ( _isAsync( f ) ) r.isAsync = true;
    if ( _isGenerator( f ) ) r.isGenerator = true;
    if ( _isClass( f ) ) r.isClass = true;
    if ( isInstance( f ) ) r.isInstance = true;
    if ( isFunctionInstance( f ) ) r.isFunctionInstance = true;

    return r;
}

/**
 * @param {Object} o
 * @return {Object}
 */
function objectInfo( o )
{
    let cn = className( o );

    if ( o.constructor && o.constructor.name !== 'Object' ) cn = o.constructor.name;

    const r = { type: 'object' };

    if ( cn ) r.name = cn;
    if ( o.constructor && _isClass( o.constructor ) ) r.isInstance = true;
    if ( !r.isInstance && isFunctionInstance( o ) ) r.isFunctionInstance = true;

    return r;
}

/**
 * Returns the name of anything.
 *
 * @param {*} obj
 * @return {Object}
 */
function _nameOf( obj )
{
    const type = typeof obj;

    if ( type === 'undefined' ) return { type: 'undefined' };
    if ( type === 'number' )    return { type: 'number', name: obj !== obj ? 'NaN' : 'Number' };           // eslint-disable-line no-self-compare
    if ( obj === null )         return { type: 'null' };
    if ( Array.isArray( obj ) ) return { type: 'Array' };
    if ( type === 'function' )  return functionInfo( obj );
    if ( type === 'object' )    return objectInfo( obj );

    return { type: typeof obj, name: obj.constructor.name };
}

/**
 * @param {*} obj
 * @return {string}
 */
function nameOf( obj )
{
    const
        { name, type } = _nameOf( obj ),
        correct = n => n === 'function' ? 'Function' : n === 'object' ? 'Object' : n;

    return correct( name ) || correct( type );
}

/**
 * @param {*} obj
 * @return {Object}
 */
function infoOf( obj )
{
    return _nameOf( obj );
}

/**
 * @param {*} obj
 * @return {string}
 */
function name( obj )
{
    return nameOf( obj ).toLowerCase();
}

/**
 * @param {*} obj
 * @return {string}
 */
function type( obj )
{
    return _nameOf( obj ).type.toLowerCase();
}

module.exports = {
    nameOf, name, type, isInstance, isClass, isAsync, isGenerator, functionInfo, infoOf, isFunctionInstance
};
