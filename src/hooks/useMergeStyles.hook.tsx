import { CSSProperties, useMemo } from "react";
import merge from "lodash.merge";
import { SxProps, Theme } from "@mui/material";

// Define types for style objects
type StyleObject = {
  [key: string]: string | number | StyleObject | undefined | CSSProperties;
};

/**
 * A custom hook to merge two style objects into one, including nested styles.
 *
 * @param {StyleObject} defaultStyles - The default styles that serve as a base.
 * @param {StyleObject} customStyles - The custom styles that will override default styles.
 * @returns {StyleObject} - The merged styles.
 *
 * @example
 * const defaultStyles = {
 *   container: {
 *     padding: '10px',
 *     backgroundColor: 'lightgrey',
 *     text: {
 *       color: 'black',
 *       fontSize: '16px',
 *     },
 *   },
 * };
 *
 * const customStyles = {
 *   container: {
 *     backgroundColor: 'white', // Override default backgroundColor
 *     text: {
 *       color: 'blue', // Override default text color
 *     },
 *   },
 * };
 *
 * const mergedStyles = useMergeStyles(defaultStyles, customStyles);
 * // mergedStyles will be:
 * // {
 * //   container: {
 * //     padding: '10px',
 * //     backgroundColor: 'white', // customStyles override
 * //     text: {
 * //       color: 'blue', // customStyles override
 * //       fontSize: '16px', // defaultStyles
 * //     },
 * //   },
 * // }
 *
 * @importance
 * This hook simplifies the process of managing and applying complex nested styles by merging default and custom styles.
 * It ensures that styles are applied consistently and allows for easy customization and overrides.
 */
function useMergeStyles(
  defaultStyles: StyleObject,
  customStyles: StyleObject,
): StyleObject {
  // Memoize the merged styles to avoid unnecessary recalculations on re-renders
  const mergedStyles = useMemo(
    () => merge({}, defaultStyles, customStyles),
    [defaultStyles, customStyles],
  );

  return mergedStyles;
}

export default useMergeStyles;
