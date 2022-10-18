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
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Molestiae repudiandae ullam architecto, exercitationem, 
                repellendus ratione atque blanditiis magni, mollitia sunt 
                temporibus! Eaque voluptatem dignissimos consequatur vitae 
                perspiciatis praesentium dolores totam eum earum, labore, 
                saepe tenetur. Inventore aliquam excepturi non assumenda!
                </p>
        </>
)}



export default Test


