import VisualController from "../src/main";
import Test from '../components/Test.jsx'
import Layout from '../components/Layout.jsx'
import NoUpdates from '../components/NoUpdates.jsx'
import askForPromise from "ask-for-promise";

const cid = id => `[data-cy-${id}]`;


const 
      root = document.querySelector ( cid`root` )
    , html = new VisualController ({})
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
                                    done ()
                            })
        }) // it No update methods

}) // describe