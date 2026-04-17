export default VisualController;
/**
 * Visual Controller for React
 * Controls multiple React apps with a single controller.
 *
 * @param {Object} dependencies - Object with dependencies that should be available for all components
 * @return {Object} - Object with methods: publish, destroy, getApp, has
 * @example
 * const html = new VisualController ({ r })
 * html.publish ( Test, {greeting:'Hi'}, 'app' )
 */
declare function VisualController(dependencies?: any): any;
