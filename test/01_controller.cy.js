import VisualController from "../src/main";
import Test from '../components/Test.jsx'
import Layout from '../components/Layout.jsx'
import NoUpdates from '../components/NoUpdates.jsx'
import askForPromise from "ask-for-promise";
import { renderToString } from 'react-dom/server'
import serverRender from './serverRender'

const cid = id => `[data-cy-${id}]`;

let r = {
            value : 0
};
const 
      root = document.querySelector ( cid`root` )
    , html = new VisualController ({r})
    ;

root.id = 'el'

describe ( 'Visual controller for react', () => {

    it ( 'Method "publish" returns a promise', done => {
           
                    html.publish ( Test, {}, 'el' )
                        .then ( el => { // should return 'el' app
                                el.setupText ( 'update' )
                                cy.get ('#ins').should ( 'have.text', 'update' )
                                done ()
                            })
        }) // it Method "publish" returns a promise



    it ( 'Method "has"', done => {
                    let before;
                    html.publish ( Layout,{}, 'el')
                        .then ( () => {
                                    before = html.has ( 'a' );
                                    return Promise.all ([
                                          html.publish ( Test, {}, 'a' )
                                        , html.publish ( Test, {}, 'b' )
                                    ])
                            })
                        .then ( () => {
                                    const after = html.has ( 'a' );
                                    expect ( before ).to.be.equal ( false )
                                    expect ( after  ).to.be.equal ( true  )
                                    done ()
                            })
        }) // it Method "has"



    it ( 'No update methods', done => {
                    html.publish ( NoUpdates, {}, 'el' )
                        .then ( () => {
                                    let x = html.getApp ( 'el' ) // Should return an empty object
                                    expect ( x ).is.empty
                                    html.destroy ( 'el' )
                                    done ()
                            })
                    
        }) // it No update methods

    it ( 'Hydrate, SSR support', done => {
                    let 
                          dependencies = {r}
                        , data = {}
                        , setupUpdates = () => {}
                        ;
                    const 
                          content = serverRender ( Test, {dependencies,data,setupUpdates} )
                        , el = document.getElementById ( 'el' )
                        ;

                    el.innerHTML = content
                    
                    html.publish ( Test, {}, 'el' )
                        .then ( el => {
                                    expect ( el ).to.have.property ( 'setupText' )
                                    const newTitle = 'Updated title';
                                    el.setupText ( newTitle )

                                    setTimeout ( () => {
                                                    const title = document.getElementById ( 'ins' ).innerHTML;
                                                    expect ( title ).to.be.equal ( newTitle )

                                                    let text = document.getElementById('count').innerHTML;
                                                    expect ( text ).to.be.equal ( 'Count: <!-- -->0' )
                                                    cy.get('#ins').click ({ force : true })
                                            } , 10 )
                                            
                                    setTimeout (  () => {
                                                    let text = document.getElementById('count').innerHTML;
                                                    expect ( text ).to.be.equal ( 'Count: <!-- -->12' )
                                                    done ()
                                            }, 100 )

                            })
        }) // it Hydrate

}) // describe