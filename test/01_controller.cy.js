import VisualController from "../src/main";
import Test from '../components/Test.jsx'

const cid = id => `[data-cy-${id}]`;

describe ( 'Visual controller for react', () => {

    it ( 'Method "publish" returns a promise', done => {
                    const 
                          root = document.querySelector ( cid`root` )
                        , html = new VisualController ({})
                        ;

                    root.id = 'el'

                    html.publish ( Test, {}, 'el' )
                        .then ( el => { // should return 'el' app
                                el.setupText ( 'update' )
                                cy.get ('#ins').should ( 'have.text', 'update' )
                                done ()
                            })
        }) // it Method "publish" returns a promise



    it ( 'Method "has"', done => {
                    const 
                          root = document.querySelector ( cid`root` )
                        , html = new VisualController ({})
                        ;

                    root.id = 'el'

                    const before = html.has ( 'el' );

                    html.publish ( Test, {}, 'el' )
                        .then ( () => {
                                const after = html.has ( 'el' );
                                expect ( before ).to.be.equal ( false )
                                expect ( after  ).to.be.equal ( true  )
                                done ()
                            })
        }) // it Method "publish" returns a promise

}) // describe