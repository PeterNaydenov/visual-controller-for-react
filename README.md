# Visual Controller for React

![version](https://img.shields.io/github/package-json/v/PeterNaydenov/visual-controller-for-react)
![license](https://img.shields.io/github/license/PeterNaydenov/visual-controller-for-react)
![npm downloads](https://img.shields.io/npm/dw/@peter.naydenov/visual-controller-for-react)
![bundle size](https://img.shields.io/bundlephobia/minzip/@peter.naydenov/visual-controller-for-react)

Run multiple React apps on the same page from a single controller. Each app gets its own region defined by invisible markers — **no DOM ids, no wrapper elements, no `getElementById` calls**.

```js
import VisualController from '@peter.naydenov/visual-controller-for-react'
import HeaderApp from './apps/HeaderApp.jsx'
import SidebarApp from './apps/SidebarApp.jsx'
import CartApp from './apps/CartApp.jsx'

const html = new VisualController({})

html.set(({ start, end }) => {
    document.querySelector('header').append(start, end)
    return 'header'
})
html.set(({ start, end }) => {
    document.querySelector('aside').append(start, end)
    return 'sidebar'
})
html.set(({ start, end }) => {
    document.querySelector('main').append(start, end)
    return 'cart'
})

html.publish('header', HeaderApp)
html.publish('sidebar', SidebarApp)
html.publish('cart', CartApp)
```

Each `publish` is independent — apps can be added, removed, swapped, or destroyed at runtime. Each app gets access to the same shared dependencies through its `dependencies` prop.

> **v4.0.0 — breaking change.** The v2 `id`-based API is gone. The controller is region-only: define regions with `set`, then publish by alias.


## Why use this

Most pages need more than one React app — a header from team A, a sidebar from team B, and a checkout widget from team C. The challenge is coordinating them without coupling.

The marker model replaces authored mount elements and DOM lookup with regions declared in JavaScript:

```js
html.set(({ start, end }) => {
    document.querySelector('#main').append(start, end)
    return 'app'
})

html.publish('app', MyComponent, { greeting: 'Hi!' })
```

The controller owns the location. No ids to manage, no collisions, and no wrapper elements authored by the page.

The dynamic lifecycle is the other half:

```js
html.publish('header', HeaderApp)
html.publish('header', PromoBannerApp)
html.destroy('header')
html.publish('header', HeaderApp)
```

Same parent, multiple regions, no DOM ids.


## Quick start

```js
import VisualController from '@peter.naydenov/visual-controller-for-react'
import HeaderApp from './HeaderApp.jsx'
import SidebarApp from './SidebarApp.jsx'

const html = new VisualController({})

html.set(({ start, end }) => {
    document.querySelector('#main').append(start, end)
    return 'header'
})

html.set(({ start, end }) => {
    document.querySelector('#main').append(start, end)
    return 'sidebar'
})

html.publish('header', HeaderApp, { greeting: 'Hi!' })
html.publish('sidebar', SidebarApp)
```

```html
<main id="main">
    <h2>Static page heading</h2>
</main>
```

The same parent hosts multiple regions without id collisions. Selection is by alias, not by DOM lookup.

The marker model is a slim inlined subset of [`@peter.naydenov/dim`](https://github.com/PeterNaydenov/dim), located in `src/dim.js`; the dim package is not a runtime dependency.


## API

```js
  set     : 'Define a region by placing markers in the DOM'
, publish : 'Mount a React app into a region by alias'
, destroy : 'Unmount the app(s); empty the range(s); keep the markers'
, has     : 'Is an app currently published in this region?'
, getApp  : 'Returns the setupUpdates interface for a published app'
, isEmpty : 'Is the region empty (no content between markers)?'
, list    : 'Returns every alias registered via set'
, reset   : 'Unmount all apps, clear internal state, remove the markers'
```


### `html.set(fn, ...args)`

Define a region. The callback receives `{ start, end }` text-node markers and must attach both to the DOM. Whatever string the callback returns becomes the alias used by the other methods.

```js
html.set(({ start, end }) => {
    document.querySelector('#main').append(start, end)
    return 'header'
})

html.set(({ start, end }, locale) => {
    document.querySelector('#main').append(start, end)
    return `header-${locale}`
}, 'en')
```

Extra arguments are forwarded to the callback. Multiple regions can live inside the same parent. Markers stay where they were placed until `reset()`.


### `html.publish(alias, component, data?, extraParams?)`

Mount a React app into a region. The controller inserts a `<span style="display:contents">` between the markers, mounts React to it, and tracks the app under the alias.

| Arg | Required | Default | Description |
| --- | --- | --- | --- |
| `alias` | yes | — | Region alias returned from `set`. |
| `component` | yes | — | A React component. |
| `data` | no | `{}` | Component data passed as the `data` prop. |
| `extraParams` | no | `{}` | Reserved for future use. Accepted and ignored. |

Returns a `Promise` resolving to the `setupUpdates` object, or `false` on error.

```js
html.publish('header', HeaderApp)
html.publish('header', HeaderApp, { greeting: 'Hi!' })
html.publish('header', HeaderApp, { greeting: 'Hi!' }, {})
```

Calling `publish` for an alias that already has a published app silently destroys the old one, then mounts the new one in the same location.


### `html.destroy(target?)`

Unmount the app published in a region and empty the range. Markers stay in the DOM, so the alias can be published again later.

```js
html.destroy('header')
html.destroy()
html.destroy(['header', 'sidebar'])
```

Three forms are supported:

- **`destroy(alias)`** — returns `true` on success, or `false` if no app is published for the alias.
- **`destroy()`** — destroys every published app and returns the count.
- **`destroy(aliases)`** — destroys each app in the array and returns the count actually destroyed. Missing aliases are skipped.

**`destroy()` touches:**

- Unmounts the React app
- Removes the mount span from the DOM
- Deletes the cache entry, so `has(alias)` becomes `false`

**`destroy()` does not touch:**

- The markers
- The alias in `list()`
- The internal marker registry

For a full cleanup that also removes markers, use `reset()`.


### `html.has(alias)`

Returns `true` if an app is currently published in the region, and `false` otherwise.

```js
html.has('header')
```


### `html.getApp(alias)`

Returns the `setupUpdates` object provided by the published component, or `false` if no app is published for the alias.

```js
const app = html.getApp('header')
if (app) app.changeMessage('New value')
```


### `html.isEmpty(alias)`

Returns `true` when there is no content between the markers and `false` when the region contains content. Returns `undefined` for an unknown alias and logs an error. Orphaned markers are treated as empty.

```js
html.isEmpty('header')
```

After `destroy`, the markers remain and the region is empty again.


### `html.list()`

Returns every alias registered via `set`, regardless of whether an app is currently published. `reset()` clears the list.

```js
html.list()
```


### `html.reset()`

Unmounts every published app, clears internal state, and removes every marker from the DOM. Regions must be created again with `set()` before publishing.

```js
html.reset()
```


## Inside a component

Every published React component receives `dependencies`, `data`, and `setupUpdates` as props. Use `setupUpdates` to expose methods for external control through `getApp(alias)`.

```jsx
import { useState } from 'react'

export default function HeaderApp({ dependencies, data, setupUpdates }) {
    const [message, setMessage] = useState(data.greeting ?? 'Hello from React!')
    const [count, setCount] = useState(0)

    function changeMessage(nextMessage) {
        setMessage(nextMessage)
    }

    function increment() {
        setCount(value => value + 1)
    }

    setupUpdates({ changeMessage, increment })

    return (
        <section>
            <h2>{message}</h2>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    )
}
```

`dependencies` contains the object passed to the controller constructor. `data` contains the component data passed to `publish`.

```js
const updates = html.getApp('header')
updates.changeMessage('New message content')
updates.increment()
```


## Other details

### SSR hydration

When a region already contains HTML, `publish` detects it and uses `hydrateRoot` to hydrate in place.

The three cases are:

- **Empty range** — inserts a fresh `<span style="display:contents">` and mounts normally.
- **Single element between markers** — hydrates that element directly.
- **Multiple sibling nodes between markers** — wraps them in a `<span style="display:contents">` and hydrates the wrapper.

React emits its standard hydration warnings when the server markup does not match the component. The controller does not suppress them.



### Type declarations

The package ships TypeScript declarations. They are generated from the JSDoc in `src/main.js`, so the docs and the types cannot drift apart.

```bash
npm run types    # regenerate dist/main.d.ts + dist/index.d.ts from the JSDoc
```

What lands in `dist/`:

| File | What it is |
| --- | --- |
| `dist/main.d.ts` | The instance types (`VisualControllerInstance`, `SetCallback`, `SetupUpdates`), generated from the JSDoc. |
| `dist/index.d.ts` | The public entry — re-exports those types and declares the default export. |
| `dist/main.d.cts` / `dist/index.d.cts` | The same declarations in CommonJS form, for `require()`. |

Two details are worth knowing if you touch this pipeline:

- **The package is dual-mode** (ESM + CommonJS), so the `exports` map in `package.json` points each condition at its own declaration file. Without the `types` conditions, TypeScript ignores the top-level `"types"` field and consumers get `TS2307: Cannot find module`.
- **`src/index.ts` exists because of `new`.** The README, the demo and the tests all use `new VisualController({ ... })`, but TypeScript's declaration emit for a JSDoc function is always `declare function X(...)` — a call signature with no construct signature — and a JSDoc type literal cannot express `new (...)` either. Left alone, `new VisualController()` fails with `TS7009: 'new' expression, whose target lacks a construct signature`. So `src/index.ts` declares the default export with *both* a call signature and a construct signature. Both forms work at runtime too — `VisualController` returns the instance object, and a constructor returning an object hands that object back.

> **CommonJS note.** This package's CommonJS build exports the controller directly (`module.exports = VisualController`), so the CommonJS declaration uses `export =`. TypeScript's `export =` cannot carry other exports — so the named types (`SetCallback`, `SetupUpdates`, `VisualControllerInstance`) are importable from the ESM entry only. The default export, and with it the whole instance type, works in both.

`SetupUpdates` is typed as `Record<string, any>`, so `html.getApp('header').changeMessage('...')` type-checks without a cast — the component decides which methods it exposes.

## Development

```bash
npm install
npm test
npm run cover
npm run types
npm run build
npm run dev
```

`npm run types` regenerates `dist/main.d.ts` from the JSDoc declarations. `npm run build` creates the ESM, CommonJS, and UMD bundles and regenerates the types.

Source layout:

| Path | Purpose |
| --- | --- |
| `src/main.js` | The controller and public API. |
| `src/dim.js` | Slim inlined subset of the dim marker model. |
| `src/setupReactElement.jsx` | React mount readiness wrapper. |
| `src/hydrate.jsx` | SSR hydration helper. |
| `test/` | React controller tests and fixtures. |
| `demo/` | Runnable demo. |
| `dist/` | Build artifacts committed for npm publishing. |

When adding a method:

1. Add the function to `src/main.js` with JSDoc.
2. Export it from the return block.
3. Add it to the `VisualControllerInstance` typedef.
4. Add tests.
5. Update the README API table and section.
6. Add a changelog entry.

Keep the inlined `src/dim.js` subset aligned with the upstream dim marker model when its API changes.


## Migration from v2

The v4 release replaces the v2 id-based API with the region-based API.

- Replace `<div id="app">` mount containers with `html.set(({ start, end }) => { ...; return 'app' })`.
- Change `publish(component, data, containerID)` to `publish(alias, component, data?, extraParams?)`.
- `destroy`, `has`, and `getApp` now receive an alias rather than a DOM id.
- `isEmpty`, `list`, and `reset` are new methods.
- The marker subset is inlined in `src/dim.js`; no dim runtime dependency is required.
- `setupUpdates` remains a component prop and is exposed through `getApp(alias)`.


## Extra

Visual Controller has versions for other front-end frameworks:

- [Vue 3](https://github.com/PeterNaydenov/visual-controller-for-vue3)
- [Svelte 5](https://github.com/PeterNaydenov/visual-controller-for-svelte5)
- [Solid](https://github.com/PeterNaydenov/visual-controller-for-solid)
- [Preact](https://github.com/PeterNaydenov/visual-controller-for-preact)
- [Lit](https://github.com/PeterNaydenov/visual-controller-for-lit)
- [Vue 2](https://github.com/PeterNaydenov/visual-controller-for-vue)
- [Svelte 3 and 4](https://github.com/PeterNaydenov/visual-controller-for-svelte3)


## Credits

`visual-controller-for-react` was created and supported by Peter Naydenov.


## License

Released under the [MIT License](https://github.com/PeterNaydenov/visual-controller-for-react/blob/main/LICENSE).
