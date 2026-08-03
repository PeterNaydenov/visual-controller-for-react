'use strict'
import { useState } from 'react'

function Sidebar ( props ) {
    const { setupUpdates } = props
    const [ items, setItems ] = useState ( [ 'Apples', 'Oranges', 'Pears' ] )
    const [ filter, setFilter ] = useState ( '' )

    setupUpdates ({
        addItem: name => setItems ( items => [ ...items, name ] ),
        removeItem: idx => setItems ( items => items.filter ( ( _, i ) => i !== idx ) ),
        setFilter: text => setFilter ( text )
    })

    const visible = () => items.filter ( i => i.toLowerCase().includes ( filter.toLowerCase() ) )

    return (
        <div className="sidebar">
            <h3>Items</h3>
            <input value={filter} onChange={e => setFilter ( e.target.value )} placeholder="filter..." />
            <ul>
                { visible ().map ( ( item, idx ) => (
                    <li key={item}>
                        {item}
                        <button onClick={() => setItems ( items => items.filter ( ( _, i ) => i !== idx ) )}>x</button>
                    </li>
                ) ) }
            </ul>
        </div>
    )
}

export default Sidebar
