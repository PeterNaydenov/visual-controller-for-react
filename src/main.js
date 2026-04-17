"use strict"
/**
 *  Visual Controller for React
 *  Controls multiple React apps with a single controller.
 * 
 *  History notes:
 *   - Development started on August 13th, 2022
 *   - Published on GitHub for first time: August 14th, 2022
 *   - Method 'publish' returns a promise: October 16th, 2022
 *   - Support for SSR hydratation: November 19th, 2022
 *   - Refacoring code from class to function: April 17th, 2026
 *  
 */


import askForPromise from 'ask-for-promise'
import ReactDOM from 'react-dom/client'
import setupReactElement from './setupReactElement.jsx'
import hydrate from './hydrate.jsx'




/**
 * Visual Controller for React
 * Controls multiple React apps with a single controller.
 * 
 * @param {Object} dependencies - Object with dependencies that should be available for all components
 * @return {Object} - Object with methods: publish, destroy, getApp, has
 * @example
 * const html = new VisualController ({ r })
 * html.publish ( Test, {greeting:'Hi'}, 'app' )
 */
function VisualController ( dependencies={} ) {
        const 
                  cache = {}  // collect react apps
                , updateInterface = {}
                ;



    /**
     * Publish a React app
     * @param {React.ComponentType} reactFn - React component
     * @param {Object} data - Data for the React component
     * @param {string} id - Id of the container where React-app will live
     * @return {Promise|boolean} - Promise that will be resolved when the application is ready, or false on error
     * @example
     * const html = new VisualController ({ r })
     * html.publish ( Test, {greeting:'Hi'}, 'app' )
     */
    function publish  (reactFn, data, id) {
                const hasKey = cache[id] ? true : false;
                let   node;
                
                if ( !reactFn ) {
                        console.error ( `Error: Component is undefined` )
                        return false
                   }
                if ( hasKey )   destroy ( id )
                node = document.getElementById ( id )
                if ( !node ) {  
                            console.error ( `Can't find node with id: "${id}"`)
                            return false
                    }

                updateInterface[id] = {}
                let app;
                const
                      loadTask = askForPromise ()
                    , endTask  = askForPromise ()
                    , setupUpdates = lib =>  updateInterface[id] = lib
                    ;

                if ( node.innerHTML.trim () ) {   // Hydrate SSR result
                            app = hydrate ( node, reactFn, { dependencies, data, setupUpdates } )
                            setTimeout ( () =>  loadTask.done (), 1 )
                    }
                else {   // Start a new React App
                            app = ReactDOM.createRoot ( node )
                            const el = setupReactElement ( loadTask, reactFn, { dependencies, data, setupUpdates});
                            app.render ( el  )
                    }

                cache[id] = app
                loadTask.onComplete ( () => endTask.done ( updateInterface[id])   )
                return endTask.promise
            } // publish func.



    /**
     * Destroy a React app by using container name
     * @param {string} id - Id of the container where React-app lives
     * @return {boolean} - Returns true on success and false on failure
     * @example
     * const html = new VisualController ({ r })
     * html.destroy ( 'app' )
     */
    function destroy (id) {
                const htmlKeys = Object.keys(cache);
                if ( htmlKeys.includes(id) ) {                    
                        let item    = cache[id];
                        item.unmount ()
                        delete cache[id]
                        delete updateInterface[id]
                        return true
                    }
                else    return false
            } // destroy func.


            
    /**
     * Returns an object with update-methods for React-app defined by calling the `props.setUpdates` function from within the component.
     * @param {string} id - Id of the container where React-app lives
     * @return {object} - Object with update-methods for React-app or false on failure
     * @example
     * const html = new VisualController ({ r })
     * const app = html.getApp ( 'app' )
     * if ( app )   app.pushPlay () // use update methods of the component
     */
    function getApp (id) {
                const item = updateInterface[id];
                if ( !item ) {  
                        console.error ( `App with id: "${id}" was not found.`)
                        return false
                    }
                return item
        } // getApp func.


    
    /**
     * Checks if app with specific "id" was published
     * @param {string} id - Id of the container where React-app lives
     * @return {boolean} - Returns true if app with specific id exists, false otherwise
     * @example
     * const html = new VisualController ({ r })
     * const has = html.has ( 'app' )
     * if ( has )   console.log ( 'App is available' )
     */
    function has ( id ) {
                return cache[id] ? true : false
        } // has func.



    return {
                  publish
                , destroy 
                , getApp  
                , has
            }
} // visualController



export default VisualController


