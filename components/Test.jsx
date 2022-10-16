'use strict'

import { useState } from 'react'

function Test ( props ) {
    const 
          { dependencies, data, setupUpdates } = props
        , [ text, setText ] = useState ('Test element')
        ;
    setupUpdates ({
                setupText : x => setText(x)
        })
    return (
        <>
        <div id="ins">{text}</div>
        </>
)}



export default Test


