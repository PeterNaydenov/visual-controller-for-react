# Release History



### 4.0.0 (2026-08-03)
- [x] **Breaking change.** Region-based API. The v2 `id`-based API (`publish(component, data, id)` etc.) is removed. Regions are defined with the inlined dim subset (see `src/dim.js`) via the new `set` method, which mirrors `dim.set` exactly.
- [x] New API: `set`, `publish(alias, component, data?, extraParams?)`, `destroy`, `has`, `getApp`, `isEmpty`, `list`, `reset`.
- [x] Multiple placeholders can coexist inside a single parent without DOM `id` collisions — selection is by alias returned from the `set` callback.
- [x] Destroying an app empties the region but keeps the markers, so the same alias can host a different app later.
- [x] Mount container is a bare `<span style="display:contents">` — invisible to layout, no DOM wrapper authored by the user.
- [x] SSR hydration preserved: when the range already contains content at publish time, the controller picks it as the mount target (single element → direct mount, multiple siblings → wrapped in a mount span) and uses `hydrateRoot`. React hydrates the existing DOM in place.
- [x] `isEmpty(alias)` delegates to the inlined dim's `range.isEmpty()` — returns `true` for collapsed or orphaned ranges, `undefined` for unknown aliases.
- [x] `destroy()` is polymorphic — accepts no argument (destroys every published app, returns count), an alias string, or an array of alias strings. Markers stay in the DOM in every form.
- [x] No `@peter.naydenov/dim` dependency. The slim subset of dim the controller uses is inlined in `src/dim.js`. The file header documents the upstream reference for syncing if the official package changes.
- [x] `extraParams` slot accepted but ignored — reserved for future use.



### 3.1.3 (2026-07-21)
- [x] Dependency update: Ask-for-promise@3.2.0;
- [x] Dev dependency update. Typescript@7.0.2;




### 3.1.2 (2026-06-06)
- [x] Update dev dependencies;
- [x] Update react versions dependencies;
- [x] New build in esm, commonjs and umd versions;



### 3.1.1 (2026-04-23)
- [x] Dependency update. Ask-for-promise@3.1.1;



### 3.1.0 (2026-04-17)
- [x] Refactoring: From code based on class to code based on function;
- [x] Build a esm, commonjs and umd version of the library;
- [x] Adding jsdoc descriptions;
- [x] Adding typescript support;
- [x] Update all dev dependencies;



### 3.0.2 (2025-10-29)
- [x] Dependency update: Ask-for-promise@3.1.0;
- [x] Dependency update: React@19.2.0;
- [x] Dependency update: React-dom@19.2.0;
- [x] Dev dependency update - Cypress@15.5.0;
- [x] Dev dependency update - Vite@7.1.12;



### 3.0.1 (2025-08-03)
- [x] Dependency update: React@19.1.1;
- [x] Dependency update: React-dom@19.1.1;
- [x] Dev dependency update - Cypress@14.5.3;
- [x] Dev dependency update - Vite@7.0.6;



### 3.0.0 (2024-12-19)
- [x] Dependency update: Ask-for-promise@3.0.1;
- [x] React@19.0.0;
- [x] React-dom@19.0.0;
- [x] Dev dependency update - Cypress@13.17.0;
- [x] Dev dependency update - Vite@6.0.3;
- [x] Dev dependency update - @vitejs/plugin-react@4.3.4;



### 2.2.4 (2024-02-22)
- [x] Dependency update: Ask-for-promise@2.0.3;
- [x] Dev dependency update - Cypress@13.6.5;
- [x] Dev dependency update - Vite@5.1.4;



### 2.2.3 (2024-01-18)
- [x] Dependency update: Ask-for-promise@2.0.0;



### 2.2.2 (2023-11-04)
- [x] Dependency update: Ask-for-promise@1.5.0;



### 2.2.0 (2022-11-19 )
- [x] Support for SSR hydratation;



### 2.1.1 ( 2022-10-18 )
- [x] Fix: Error on components without update methods;



### 2.1.0 ( 2022-10-18 )
- [x] New method 'has';
- [ ] Bug: Error on components without update methods;



### 2.0.1 ( 2022-10-17 )
- [x] Fix: Missing import "useEffect";
- [ ] Bug: Error on components without update methods;



### 2.0.0 ( 2022-10-16)
 - [x] Method 'publish' returns a promise;
 - [x] Testing setup ( Cypress);
 - [ ] Bug: Missing import "useEffect";
 - [ ] Bug: Error on components without update methods;



### 1.0.0 (2022-08-14)
 - [x] Initial code;
 - [x] Documentation;
 - [ ] Bug: Error on components without update methods;
