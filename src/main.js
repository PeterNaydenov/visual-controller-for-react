"use strict"
/**
 *  Visual Controller for React
 *  Controls multiple React apps with a single controller.
 * 
 *  History notes:
 *   - Development started on August 13th, 2022
 *   - Published on GitHub for first time: August 14th, 2022
 *   - Method 'publish' returns a promise: October 16th, 2022
 *  
 */


import askForPromise from 'ask-for-promise'
import ReactDOM from 'react-dom/client'
import setupReactElement from './setupReactElement.jsx'
 




class VisualController {

    constructor ( dependencies={} ) {
              const 
                    cache = {}  // collect react apps
                  , updateInterface = {}
                  ;

              this.dependencies = { ...dependencies }
              return {
                          publish : this.publish ( dependencies, cache, updateInterface )
                        , destroy : this.destroy ( cache, updateInterface )
                        , getApp  : this.getApp  ( updateInterface )
                        , has     : id => cache[id] ? true : false
                    }
        }



    publish ( dependencies, cache, updateInterface ) {
        return function (reactFn, data, id) {
                const hasKey = cache[id] ? true : false;
                let   node;
                
                if ( !reactFn ) {
                        console.error ( `Error: Component is undefined` )
                        return false
                   }
                if ( hasKey )   this.destroy ( id )
                node = document.getElementById ( id )
                        if ( !node ) {  
                                    console.error ( `Can't find node with id: "${id}"`)
                                    return false
                            }
                updateInterface[id] = {}
                const 
                      app = ReactDOM.createRoot ( node )
                    , setupUpdates = lib => updateInterface[id] = lib
                    , loadTask = askForPromise ()
                    , endTask  = askForPromise ()
                    , el = setupReactElement ( loadTask, reactFn, { dependencies, data, setupUpdates})
                    ;
                app.render ( el  )
                cache[id] = app
                loadTask.onComplete ( () => {
                        endTask.done ( updateInterface[id])   
                    })
                return endTask.promise
            }} // publish func.



    destroy ( cache, updateInterface ) {
        return function (id) {
                const htmlKeys = Object.keys(cache);
                if ( htmlKeys.includes(id) ) {                    
                        let item    = cache[id];
                        item.unmount ()
                        delete cache[id]
                        delete updateInterface[id]
                        return true
                    }
                else    return false
            }} // destroy func.


            
    getApp ( updateInterface ) {
        return function (id) {
                const item = updateInterface[id];
                if ( !item ) {  
                        console.error ( `App with id: "${id}" was not found.`)
                        return false
                    }
                return item
        }} // getApp func.
} // visualController



export default VisualController


