import React from 'react';
import { renderToString } from 'react-dom/server';

function serverRender ( Comp, props ) {
    return renderToString ( <Comp {...props} /> )
} // serverRender func..



export default serverRender


