"use client";

import json2mq from "json2mq";
import { useEffect, useState } from "react";

interface UseMediaQueryOptions {
  defaultMatches?: boolean;
  matchMedia?: typeof window.matchMedia;
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

export function useBreakpointQuery(
  queryInput: Record<string, string | number | boolean>,
  options: UseMediaQueryOptions = {},
): { matches: boolean; loading: boolean } {
  const {
    defaultMatches = false,
    matchMedia = typeof window !== "undefined" ? window.matchMedia : undefined,
    noSsr = true,
    ssrMatchMedia,
  } = options;

  const isClient = typeof window !== "undefined"; // Detect if running on client
  const [matches, setMatches] = useState<boolean>(() => {
    // On the server, return defaultMatches or SSR-specific logic if available
    if (!isClient) {
      if (ssrMatchMedia) {
        return ssrMatchMedia(json2mq(queryInput)).matches;
      }
      return defaultMatches;
    }

    // On the client, return initial match based on the query
    return matchMedia
      ? matchMedia(json2mq(queryInput)).matches
      : defaultMatches;
  });

  const [loading, setLoading] = useState<boolean>(!isClient); // Set loading to true initially if SSR

  useEffect(() => {
    if (!isClient) {
      return; // Exit early if we're still on the server
    }

    const query =
      typeof queryInput === "string" ? queryInput : json2mq(queryInput);
    const mediaQueryList = matchMedia
      ? matchMedia(query)
      : window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
      setLoading(false); // Once the media query result is determined, stop loading
    };

    // Set initial state from media query
    setMatches(mediaQueryList.matches);
    setLoading(false); // We have the result, stop loading

    // Add the event listener to detect changes
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup event listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [isClient, queryInput, matchMedia]);

  return { matches, loading };
}
