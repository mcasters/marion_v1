"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowRect, setWindowRect] = useState({
    innerWidth: 374,
    innerHeight: 667,
  });

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    function handleResize() {
      setWindowRect({
        innerWidth: width,
        innerHeight: height,
      });
    }

    if (windowRect.innerWidth !== width || windowRect.innerHeight !== height)
      handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [windowRect]);

  return windowRect;
};
export default useWindowSize;
