'use strict'
import { useState } from 'react'

function Header ( props ) {
    const { setupUpdates } = props
    const [ message, setMessage ] = useState ( 'Hello from Header!' )
    const [ count, setCount ] = useState ( 0 )

    setupUpdates ({
        changeMessage: msg => setMessage ( msg ),
        increment: () => setCount ( c => c + 1 ),
        getCount: () => count
    })

    return (
        <div className="header">
            <h3>{message}</h3>
            <p>Count: {count}</p>
            <button onClick={() => setCount ( c => c + 1 )}>Increment</button>
        </div>
    )
}

export default Header
