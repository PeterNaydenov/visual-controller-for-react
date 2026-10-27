"use strict"
/**
 *  Visual Controller for React — v3.0.0
 *  A thin lifecycle bridge between the inlined dim subset (see `./dim.js`)
 *  and React 18/19. Define regions with invisible markers via `set`, then
 *  mount React apps into those regions via `publish`. `destroy` empties
 *  a region without removing the markers, so the same alias can host a
 *  different app later.
 *
 *  @packageDocumentation
 */

import askForPromise from 'ask-for-promise'
import ReactDOM from 'react-dom/client'
import React from 'react'
import dim from './dim.js'
import setupReactElement from './setupReactElement.jsx'
import hydrate from './hydrate.jsx'


/**
 *  Callback that places dim markers into the DOM.
 *  @callback SetCallback
 *  @param {{ start: Text, end: Text }} markers - invisible text nodes; must be attached to the DOM
 *  @param {...*} args - additional arguments passed through by `set`
 *  @returns {string | void} - return a string to register an alias
 */

/**
 *  Object passed to `setupUpdates` from inside a published component.
 *  @typedef {Record<string, any>} SetupUpdates
 */

/**
 *  Controller instance returned by `VisualController`.
 *  @typedef {Object} VisualControllerInstance
 *  @property {(fn: SetCallback, ...args: any[]) => void} set
 *  @property {(alias: string, component: any, data?: object, extraParams?: object) => Promise<SetupUpdates | false>} publish
 *  @property {(target?: string | string[]) => boolean | number} destroy
 *  @property {(alias: string) => boolean} has
 *  @property {(alias: string) => SetupUpdates | false} getApp
 *  @property {(alias: string) => boolean | undefined} isEmpty
 *  @property {() => string[]} list
 *  @property {() => void} reset
 */


/**
 *  Visual Controller for React
 *  @param {Object} [dependencies={}] - External dependencies to inject into React apps
 *  @returns {VisualControllerInstance}
 */
function VisualController ( dependencies = {} ) {
    /** @type {Object.<string, { app: any, mountSpan: HTMLElement, setupUpdates: SetupUpdates }>} */
    const cache = {}
    /** @type {Set<string>} */
    const aliases = new Set()
    /** @type {Object.<string, { start: Text, end: Text }>} */
    const markersMap = {}
    /** @type {ReturnType<typeof dim>} */
    const d = dim()


    /**
     *  Define a region by placing dim markers in the DOM. The callback
     *  receives { start, end } text-node markers and must attach both to
     *  the DOM. The string the callback returns becomes the alias.
     *  @param {SetCallback} fn
     *  @param {...*} args
     *  @returns {void}
     */
    function set ( fn, ...args ) {
        let capturedAlias = null
        let capturedMarkers = null
        d.set ( ( markers, ...rest ) => {
            capturedMarkers = markers
            const ret = fn ( markers, ...rest )
            if ( typeof ret === 'string' )   capturedAlias = ret
            return ret
        }, ...args )
        if ( capturedAlias ) {
            aliases.add ( capturedAlias )
            markersMap[capturedAlias] = capturedMarkers
        }
    }


    /**
     *  Publish a React app into a region. Mounts into a <span style="display:contents">
     *  inserted directly between the markers. If the range has content, that
     *  content is used as the SSR mount target and `hydrateRoot` is used.
     *  @param {string} alias
     *  @param {any} component
     *  @param {Object} [data={}]
     *  @param {Object} [extraParams={}] - reserved for future use
     *  @returns {Promise<SetupUpdates | false>}
     */
    function publish ( alias, component, data = {}, extraParams = {} ) {
        const endTask = askForPromise ()
        void extraParams

        if ( !component ) {
            console.error ( `Error: Component is undefined` )
            endTask.done ( false )
            return endTask.promise
        }
        if ( !alias || typeof alias !== 'string' ) {
            console.error ( `Error: Alias is missing or invalid` )
            endTask.done ( false )
            return endTask.promise
        }

        const markers = markersMap[alias]
        if ( !markers || !markers.start.isConnected || !markers.end.isConnected ) {
            console.error ( `Error: Region "${alias}" was not defined or its markers are orphaned. Call html.set(...) first.` )
            endTask.done ( false )
            return endTask.promise
        }

        if ( cache[alias] )   destroy ( alias )

        // Inspect existing range content for SSR detection
        const between = []
        let n = markers.start.nextSibling
        while ( n && n !== markers.end ) { between.push ( n ); n = n.nextSibling }

        /** @type {HTMLElement} */
        let mountTarget
        let useSSR = false

        if ( between.length === 0 ) {
            mountTarget = document.createElement ( 'span' )
            mountTarget.style.display = 'contents'
            markers.end.parentNode.insertBefore ( mountTarget, markers.end )
            useSSR = false
        } else if ( between.length === 1 && between[0].nodeType === 1 ) {
            mountTarget = /** @type {HTMLElement} */ (between[0])
            useSSR = true
        } else {
            const wrapper = document.createElement ( 'span' )
            wrapper.style.display = 'contents'
            markers.end.parentNode.insertBefore ( wrapper, markers.end )
            between.forEach ( node => wrapper.appendChild ( node ) )
            mountTarget = wrapper
            useSSR = true
        }

        /** @type {{ app: any, mountSpan: HTMLElement, setupUpdates: SetupUpdates }} */
        const entry = { app: null, mountSpan: mountTarget, setupUpdates: {} }
        cache[alias] = entry

        /** @type {(lib: SetupUpdates) => void} */
        const setupUpdates = lib => { entry.setupUpdates = lib }
        const props = { dependencies, data, setupUpdates }

        const loadTask = askForPromise ()

        if ( useSSR ) {
            entry.app = hydrate ( mountTarget, component, props )
            setTimeout ( () => loadTask.done (), 1 )
        } else {
            entry.app = ReactDOM.createRoot ( mountTarget )
            const el = setupReactElement ( loadTask, component, props )
            entry.app.render ( el )
        }

        loadTask.onComplete ( () => endTask.done ( entry.setupUpdates ) )
        return endTask.promise
    }


    /**
     *  Destroy the app published in a region. Empties the range but leaves
     *  the markers in place so the alias can be published again.
     *  With no argument, destroys every published app and returns the count.
     *  @param {string} [target] - omit to destroy all apps
     *  @returns {boolean | number}
     */
    function destroy ( target ) {
        if ( target === undefined ) {
            let count = 0
            for ( const a of Object.keys ( cache ) ) {
                destroy ( a )
                count++
            }
            return count
        }
        if ( Array.isArray ( target ) ) {
            let count = 0
            for ( const a of target ) {
                if ( typeof a === 'string' && cache[a] ) {
                    destroy ( a )
                    count++
                }
            }
            return count
        }
        if ( typeof target !== 'string' ) {
            console.error ( `Error: destroy() expects a string alias or an array of strings` )
            return false
        }
        const entry = cache[target]
        if ( !entry )   return false
        entry.app.unmount ()
        if ( entry.mountSpan.parentNode ) {
            entry.mountSpan.parentNode.removeChild ( entry.mountSpan )
        }
        delete cache[target]
        return true
    }


    /**
     *  Is an app currently published in this region?
     *  @param {string} alias
     *  @returns {boolean}
     */
    function has ( alias ) {
        return Boolean ( cache[alias] )
    }


    /**
     *  Returns the setupUpdates interface for a published app.
     *  @param {string} alias
     *  @returns {SetupUpdates | false}
     */
    function getApp ( alias ) {
        const entry = cache[alias]
        if ( !entry ) {
            console.error ( `App with alias: "${alias}" was not found.` )
            return false
        }
        return entry.setupUpdates
    }


    /**
     *  Returns every alias registered via set, regardless of publish state.
     *  @returns {string[]}
     */
    function list () {
        return Array.from ( aliases )
    }


    /**
     *  Is the region empty (no content between its markers)?
     *  @param {string} alias
     *  @returns {boolean | undefined}
     */
    function isEmpty ( alias ) {
        if ( !alias || typeof alias !== 'string' ) {
            console.error ( `Error: Alias is missing or invalid` )
            return undefined
        }
        const range = d.get ( alias )
        if ( !range ) {
            console.error ( `Region "${alias}" was not defined. Call html.set(...) first.` )
            return undefined
        }
        return range.isEmpty ()
    }


    /**
     *  Unmount every published app, clear internal state, call dim.reset().
     *  Markers are removed from the DOM in dim 1.0+ inlined behavior.
     *  @returns {void}
     */
    function reset () {
        for ( const alias of Object.keys ( cache ) )   destroy ( alias )
        aliases.clear ()
        for ( const alias of Object.keys ( markersMap ) )   delete markersMap[alias]
        d.reset ()
    }


    return {
          set
        , publish
        , destroy
        , has
        , getApp
        , isEmpty
        , list
        , reset
    }
} // visualController



export default VisualController
