'use strict'

import { useState } from 'react'

function Test ( props ) {
    let 
          { dependencies, data, setupUpdates } = props
        , [ text, setText ] = useState ('Test element')
        , [ count, setCount] = useState ( 0 )
        ;
    setupUpdates ({
                setupText : x => setText(x)
        })

    function debug () {
                setCount ( 12 )
        }
    return (
        <>
            <div id="ins" onClick={debug}>{text}</div>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Molestiae repudiandae ullam architecto, exercitationem, 
                repellendus ratione atque blanditiis magni, mollitia sunt 
                temporibus! Eaque voluptatem dignissimos consequatur vitae 
                perspiciatis praesentium dolores totam eum earum, labore, 
                saepe tenetur. Inventore aliquam excepturi non assumenda!
                </p>
            <p id="count">Count: {count}</p>
        </>
)}



export default Test


