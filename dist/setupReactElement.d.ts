export default SetupReactElement;
/**
 * Create a React element with a wrapper component that waits for the loadTask promise to be resolved.
 * @param {Object} loadTask - An ask-for-promise object that should be resolved when the React app is ready.
 * @param {React.ComponentType} Fn - The React component to be wrapped.
 * @param {Object} props - Props of the React component.
 * @returns {React.ReactElement} A React element with the wrapped component.
 */
declare function SetupReactElement(loadTask: any, Fn: React.ComponentType, props: any): React.ReactElement;
import React from "react";
