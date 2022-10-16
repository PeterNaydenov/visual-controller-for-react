'use strict'
import React, { useState } from "react";



function SetupReactElement ( loadTask, Fn, props ) {

    function dummy ( props ) {
                const { el } = props;
                useEffect ( () =>  loadTask.done (), [])        
                return (
                    <>
                        {el}
                    </>
        )}

   const el = React.createElement ( Fn, props );
   return     React.createElement ( dummy, {el});
}   // SetupReactElement func.



export default SetupReactElement


