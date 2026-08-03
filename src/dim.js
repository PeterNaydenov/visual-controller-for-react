"use strict"
/**
 *  Minimal inlined subset of `@peter.naydenov/dim` v1.0 API.
 *
 *  Refer to the upstream at https://github.com/PeterNaydenov/dim for the
 *  reference implementation. When updating this file, diff against the
 *  reference and keep the API surface of the methods below identical to
 *  dim's.
 *
 *  @packageDocumentation
 */


/**
 *  Creates a dim instance with the minimal API surface used by the
 *  visual controller.
 *  @returns {{ set: Function, get: Function, reset: Function, aliases: Function }}
 */
function dim () {
    /** @type {Object.<string, any>} */
    const ranges = {}
    /** @type {Object.<string, any>} */
    const aliasMap = {}

    function set ( fn, ...args ) {
        const start = document.createTextNode ( '' )
        const end   = document.createTextNode ( '' )
        const name  = fn ( { start, end }, ...args )
        if ( !start.parentNode || !end.parentNode ) {
            throw new Error ( 'dim.set: callback must attach both "start" and "end" markers to the DOM' )
        }
        const range = document.createRange ()
        range.setStartAfter ( start )
        range.setEndBefore ( end )
        const api = {
            isEmpty () {
                if ( !start.isConnected || !end.isConnected )   return true
                range.setStartAfter ( start )
                range.setEndBefore  ( end )
                return range.collapsed
            },
            getContext () {
                return ( start.isConnected && end.isConnected )
                    ? range.commonAncestorContainer
                    : null
            },
            destroy () {
                if ( start.isConnected )   start.parentNode.removeChild ( start )
                if ( end.isConnected )     end.parentNode.removeChild ( end )
            }
        }
        if ( name )   aliasMap[name] = api
        ranges[Object.keys(ranges).length] = api
    }

    function get ( name ) {
        if ( typeof name !== 'string' && !Array.isArray ( name ) )   return undefined
        if ( typeof name === 'string' && name.includes ( ',' ) )   name = name.split ( ',' ).map ( s => s.trim() )
        return Array.isArray ( name )
            ? name.map ( n => aliasMap[n] || ranges[n] )
            : ( aliasMap[name] || ranges[name] )
    }

    function reset () {
        const seen = new Set ()
        for ( const r of Object.values ( ranges ) )   seen.add ( r )
        for ( const r of Object.values ( aliasMap ) ) seen.add ( r )
        for ( const r of seen )                       r.destroy ()
        for ( const k of Object.keys ( ranges ) )     delete ranges[k]
        for ( const k of Object.keys ( aliasMap ) )   delete aliasMap[k]
    }

    function aliases () {
        return Object.keys ( aliasMap )
    }

    return { set, get, reset, aliases }
}


export default dim
