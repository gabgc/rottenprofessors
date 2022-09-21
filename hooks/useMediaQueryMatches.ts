import { useEffect, useState } from "react";

export const MEDIA_QUERY_BREAKPOINTS: { [key: string]: Breakpoint } = {
  sm: "(min-width: 600px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
};

type Breakpoint =
  | "(min-width: 600px)"
  | "(min-width: 768px)"
  | "(min-width: 992px)"
  | "(min-width: 1200px)";

const useMediaQueryMatches = (breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia(breakpoint).matches);
    window
      .matchMedia(breakpoint)
      .addEventListener("change", (e) => setMatches(e.matches));
  }, [breakpoint]);

  return matches;
};

export default useMediaQueryMatches;
