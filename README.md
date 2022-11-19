# Visual Controller for React
*Requirements: React > 18.0.0*

Tool for building a **micro-frontends**(**MFE**) based on **React components** - Start multiple React applications in the same HTML page and control them.

Install visual controller:
```
npm i @peter.naydenov/visual-controller-for-react
```

Initialization process:
```js
import VisualController from '@peter.naydenov/visual-controller-for-react'
const dependencies = {
                // ... put here libraries that should be available for all components
            }
const html = new VisualController ( dependencies );
// Controller is ready to use...
```

Let's show something on the screen:
```js
// Let's have React component 'Hello' with prop 'greeting'

html.publish ( Hello, {greeting:'Hi'}, 'app' )
//arguments are: ( component, props, containerID )
/**
 *  Components props are a bit different
 *   function SomeComponent (props) {
 *              const { dependencies, data, setupUpdates } = props;
 *              ...
 *     }
 *   - dependencies : object provided during initialization process of VisualController
 *   - data: Your privided props. In this case: {greeting:'Hi'}
 *   - setupUpdates(function): Provide a list of all external update methods for 
 *     this component.
 * 
 * 
 *    setupUpdates example:
 *     // from component:
 *       function SomeComponent ( props ) {
 *        const 
 *              { setupUpdates } = props
 *             , [ name, setName ] = useState ('noName')
 *             , [ count, setCount ] = useState (0)
 *             ;
 *          
 *  
 *        setupUpdates ({
 *                          nameUpdate ( newName ) {
 *                                 // function definition
 *                                 setName (newName)
 *                            }
 *                          , counterUpdate () {
 *                                  // function definition
 *                            }
 *                  })
 *               }
 *      // Controller request
 *         html.getApp('someID') will return: { nameUpdate, counterUpdate }
 *        so...
 *         html.getApp('someID').nameUpdate('Peter')
 *        will trigger the nameUpdate function and will change the state of 
 *        'name' inside of the component
 * /
```


## Visual Controller Methods
```js
  publish : 'Render React app in container. Associate app instance with the container.'
, getApp  : 'Returns "update methods" registered by function "setupUpdates"'
, destroy : 'Destroy app by using container name '
, has     : 'Checks if app with specific "id" was published'
```



### VisualController.publish ()
Publish a React app.
```js
html.publish ( component, props, containerID )
```
- **component**: *object*. React component
- **props**: *object*. Part 'data' of the React components props
- **containerID**: *string*. Id of the container where React-app will live.

Example:
```js
 let html = new VisualController ();

 html.publish ( Hi, { greeting: 'hi'}, 'app' )
```

Render component 'Hi' with prop 'data.greeting' and render it in html element with id "app".
- If app with specific `id` exists, old copy will be destroyed first automatically. 
- If app with `id` is not registered but container is not empty - expectation is that this is result of server rendition. If you want to not activate hydration, remove the content first;




### VisualController.getApp ()
Returns an object with update-methods for React-app defined by calling the `props.setUpdates` function from within the component.

```js
 let update_functions_list = html.getApp ( containerID )
```
- **containerID**: *string*. Id of the container.

Example:
```js
let 
      id = 'videoControls'
    , app = html.getApp ( id )
    ;
if ( app )   app.pushPlay () // use update methods of the component
else { // component is not available
       console.error ( `App for id:"${id}" is not available` )
   }
```
If visual controller(html) has a React app associated with this name will return it. Otherwise will return **false**.





### VisualController.destroy ()
Will destroy React app associated with this container name and container will become empty. Function will return 'true' on success and 'false' on failure. 
Function will not delete content of provided container if there is no React app associated with it.

```js
html.destroy ( containerID )
```
- **containerID**: *string*. Id name.

## Other details and requirements

- Visual controller will provide a "**dependency**" object inside props to every started React app;
- Check a [release history](https://github.com/PeterNaydenov/visual-controller-for-react/blob/main/Changelog.md);

### Extra

Visual Controller has versions for few other front-end frameworks:
- [Svelte](https://github.com/PeterNaydenov/visual-controller-for-svelte3)
- [Vue 2](https://github.com/PeterNaydenov/visual-controller-for-vue)
- [Vue 3](https://github.com/PeterNaydenov/visual-controller-for-vue3) 