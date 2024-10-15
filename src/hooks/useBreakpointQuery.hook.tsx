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

  const [matches, setMatches] = useState<boolean>(() => {
    if (noSsr && ssrMatchMedia) {
      return ssrMatchMedia(json2mq(queryInput)).matches;
    }
    return defaultMatches;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query =
      typeof queryInput === "string" ? queryInput : json2mq(queryInput);
    console.log(query, "this is query");
    const mediaQueryList = matchMedia
      ? matchMedia(query)
      : window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
      setLoading(false); // Once the media query result is determined, set loading to false
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
  }, [queryInput, matchMedia]);

  return { matches, loading };
}
