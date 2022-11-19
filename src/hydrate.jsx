import ReactDOM from 'react-dom/client'

function hydrate ( node, Comp, props={} ) {
    return ReactDOM.hydrateRoot ( node, <Comp {...props} /> )
} // hydrate func.


export default hydrate
