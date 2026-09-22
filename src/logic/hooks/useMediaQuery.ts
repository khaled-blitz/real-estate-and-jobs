import { useState, useEffect } from "react";

export function useMediaQuery() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }
    const result = window.matchMedia("(max-width: 768px)");
    result.addEventListener("change", onChange);
    setValue(result.matches);
    return () => result.removeEventListener("change", onChange);
  }, []);

  return {
    isSmallScreen: value,
  };
}
