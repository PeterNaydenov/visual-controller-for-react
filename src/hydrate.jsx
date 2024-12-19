import React from 'react'
import { hydrateRoot } from 'react-dom/client'

function hydrate ( node, Comp, props={} ) {
    return hydrateRoot ( node, <Comp {...props} /> )
} // hydrate func.


export default hydrate
