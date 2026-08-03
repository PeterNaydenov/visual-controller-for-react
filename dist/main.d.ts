export type SetCallback = (markers: {
    start: Text;
    end: Text;
}, ...args: any) => string | void;
export type SetupUpdates = Object;
export type VisualControllerInstance = {
    set: (fn: SetCallback, ...args: any[]) => void;
    publish: (alias: string, component: any, data?: object, extraParams?: object) => Promise<SetupUpdates | false>;
    destroy: (target?: string | string[]) => boolean | number;
    has: (alias: string) => boolean;
    getApp: (alias: string) => SetupUpdates | false;
    isEmpty: (alias: string) => boolean | undefined;
    list: () => string[];
    reset: () => void;
};
/**
 *  Callback that places dim markers into the DOM.
 *  @callback SetCallback
 *  @param {{ start: Text, end: Text }} markers - invisible text nodes; must be attached to the DOM
 *  @param {...*} args - additional arguments passed through by `set`
 *  @returns {string | void} - return a string to register an alias
 */
/**
 *  Object passed to `setupUpdates` from inside a published component.
 *  @typedef {Object} SetupUpdates
 */
/**
 *  Controller instance returned by `VisualController`.
 *  @typedef {Object} VisualControllerInstance
 *  @property {(fn: SetCallback, ...args: any[]) => void} set
 *  @property {(alias: string, component: any, data?: object, extraParams?: object) => Promise<SetupUpdates | false>} publish
 *  @property {(target?: string | string[]) => boolean | number} destroy
 *  @property {(alias: string) => boolean} has
 *  @property {(alias: string) => SetupUpdates | false} getApp
 *  @property {(alias: string) => boolean | undefined} isEmpty
 *  @property {() => string[]} list
 *  @property {() => void} reset
 */
/**
 *  Visual Controller for React
 *  @param {Object} [dependencies={}] - External dependencies to inject into React apps
 *  @returns {VisualControllerInstance}
 */
declare function VisualController(dependencies?: any): VisualControllerInstance;
export default VisualController;
