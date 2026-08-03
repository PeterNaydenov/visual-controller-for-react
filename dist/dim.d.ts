/**
 *  Minimal inlined subset of `@peter.naydenov/dim` v1.0 API.
 *
 *  Refer to the upstream at https://github.com/PeterNaydenov/dim for the
 *  reference implementation. When updating this file, diff against the
 *  reference and keep the API surface of the methods below identical to
 *  dim's.
 *
 *  @packageDocumentation
 */
/**
 *  Creates a dim instance with the minimal API surface used by the
 *  visual controller.
 *  @returns {{ set: Function, get: Function, reset: Function, aliases: Function }}
 */
declare function dim(): {
    set: Function;
    get: Function;
    reset: Function;
    aliases: Function;
};
export default dim;
