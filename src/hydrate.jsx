import React from 'react'
import { hydrateRoot } from 'react-dom/client'

/**
 * Hydrate a React component.
 * @param {HTMLElement} node - Element to hydrate into
 * @param {React.ComponentType} Comp - React component to hydrate
 * @param {Object} [props={}] - Props to pass to the component
 * @returns {import('react-dom/client').Root} - Hydrated React root
 */
function hydrate ( node, Comp, props={} ) {
    return hydrateRoot ( node, React.createElement(Comp, props) )
} // hydrate func.


export default hydrate
