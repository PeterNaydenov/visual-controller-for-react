'use strict'
import React, { useEffect } from "react";



/**
 * Create a React element with a wrapper component that waits for the loadTask promise to be resolved.
 * @param {Object} loadTask - An ask-for-promise object that should be resolved when the React app is ready.
 * @param {React.ComponentType} Fn - The React component to be wrapped.
 * @param {Object} props - Props of the React component.
 * @returns {React.ReactElement} A React element with the wrapped component.
 */
function SetupReactElement ( loadTask, Fn, props ) {

    function dummy ( props ) {
                const { el } = props;
                useEffect ( () =>  loadTask.done (), [])        
                return (
                    <>
                        {el}
                    </>
        )
    }

   const el = React.createElement ( Fn, props );
   return     React.createElement ( dummy, {el});
}   // SetupReactElement func.



export default SetupReactElement


