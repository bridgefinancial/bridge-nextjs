import merge from 'lodash.merge';
import { useMemo } from 'react';

// This will replace the useMergeStyles hook if it works well.
// we can delete useMergeStyles hook later, and replace it with this
// it makes more sense to  have a useMergeProps because you might want to merge
// default props with incoming props and not just styles

/**
 * A custom hook to merge any type of objects into one, including deeply nested properties.
 *
 * @param {Record<string, any>} defaultProps - The default object that serves as a base.
 * @param {Record<string, any>} customProps - The custom object that will override default values.
 * @returns {Record<string, any>} - The merged object.
 *
 * @example
 * const defaultProps = {
 *   settings: {
 *     theme: 'light',
 *     user: {
 *       name: 'Default User',
 *       preferences: {
 *         notifications: true,
 *       },
 *     },
 *   },
 * };
 *
 * const customProps = {
 *   settings: {
 *     theme: 'dark', // Override default theme
 *     user: {
 *       preferences: {
 *         notifications: false, // Override default notifications
 *       },
 *     },
 *   },
 * };
 *
 * const mergedProps = useMergeProps(defaultProps, customProps);
 * // mergedProps will be:
 * // {
 * //   settings: {
 * //     theme: 'dark',
 * //     user: {
 * //       name: 'Default User',
 * //       preferences: {
 * //         notifications: false,
 * //       },
 * //     },
 * //   },
 * // }
 */
function useMergeProps<T extends Record<string, any>>(
  defaultProps: T,
  customProps: T
): T {
  // Memoize the merged object to avoid unnecessary recalculations
  const mergedProps = useMemo(
    () => merge({}, defaultProps, customProps),
    [defaultProps, customProps]
  );

  return mergedProps;
}

export default useMergeProps;
