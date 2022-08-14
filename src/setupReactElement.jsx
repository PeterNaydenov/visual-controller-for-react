'use strict'
import React from "react";



function SetupReactElement ( Fn, props ) {

    function dummy(props) {
        const { el } = props;
                return (
                    <>
                        {el}
                    </>
        )}

   const el = React.createElement ( Fn, props );
   return     React.createElement ( dummy, {el});
}   // SetupReactElement func.



export default SetupReactElement


