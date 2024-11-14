import { useCallback } from 'react';

/**
 * Enum for standard analytics events.
 *
 * `AnalyticsEvent` defines the general type of event being tracked, providing an extra layer of categorization.
 */
export enum AnalyticsEvent {
  Interaction = 'interaction',
  Conversion = 'conversion',
  FormSubmission = 'form_submission',
  PageView = 'page_view',
  Error = 'error',
  VideoPlay = 'video_play',
  SocialShare = 'social_share',
}

/**
 * Enum for standard analytics actions.
 *
 * `AnalyticsAction` defines specific user interactions within each event, such as clicking or submitting.
 */
export enum AnalyticsAction {
  Click = 'Click',
  Submit = 'Submit',
  Hover = 'Hover',
  Close = 'Close',
  Open = 'Open',
  Play = 'Play',
  Pause = 'Pause',
  Stop = 'Stop',
  Scroll = 'Scroll',
  Navigate = 'Navigate',
  Expand = 'Expand',
  Collapse = 'Collapse',
  Focus = 'Focus',
  Blur = 'Blur',
  Drag = 'Drag',
  Drop = 'Drop',
}

/**
 * Enum for standard analytics categories.
 *
 * `AnalyticsCategory` represents different UI elements or sections in the app. Categories help group events logically.
 */
export enum AnalyticsCategory {
  Button = 'Button',
  Form = 'Form',
  Navigation = 'Navigation',
  Modal = 'Modal',
  Card = 'Card',
  Link = 'Link',
  Image = 'Image',
  Video = 'Video',
  Banner = 'Banner',
  Dropdown = 'Dropdown',
  Tab = 'Tab',
  Tooltip = 'Tooltip',
}

/**
 * Custom hook for tracking Google Analytics events, client-side only.
 *
 * Returns a function to send structured events to Google Analytics via the `dataLayer`.
 * Includes options to specify `event`, `category`, `action`, and `label` for full flexibility.
 *
 * ### Example Usage
 * ```typescript
 * const trackEvent = useAnalyticsEventTracker(AnalyticsEvent.Interaction, AnalyticsCategory.Button);
 * <button onClick={() => trackEvent(AnalyticsAction.Click, 'Signup Button')}>Sign Up</button>
 * ```
 *
 * @param event - The event type, providing high-level context (e.g., 'interaction', 'conversion').
 * @param category - The category of the event, grouping similar events (e.g., 'Button', 'Navigation').
 * @param debugMode - If true, logs event details to the console for debugging.
 * @returns A function that sends an event to Google Analytics with the specified action and label.
 *
 */
export function useAnalyticsEventTracker(
  event: AnalyticsEvent,
  category: AnalyticsCategory,
  debugMode: boolean = false
) {
  return useCallback(
    /**
     * Sends a structured event to Google Analytics.
     *
     * @param action - The action associated with the event (e.g., 'Click').
     * @param label - Additional information about the event (e.g., 'Signup Button').
     */
    (action: AnalyticsAction, label: string) => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        const analyticsEvent = {
          event,
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
        };

        // Push event to Google Analytics dataLayer
        window.dataLayer.push(analyticsEvent);

        // Optional debugging
        if (debugMode) {
          console.log('GA Event:', analyticsEvent);
        }
      }
    },
    [event, category, debugMode]
  );
}
