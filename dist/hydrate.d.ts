export default hydrate;
/**
 * Hydrate a React component.
 * @param {HTMLElement} node - Element to hydrate into
 * @param {React.ComponentType} Comp - React component to hydrate
 * @param {Object} [props={}] - Props to pass to the component
 * @returns {import('react-dom/client').Root} - Hydrated React root
 */
declare function hydrate(node: HTMLElement, Comp: React.ComponentType, props?: any): import("react-dom/client").Root;
import React from 'react';
