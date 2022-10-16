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

}) // describe