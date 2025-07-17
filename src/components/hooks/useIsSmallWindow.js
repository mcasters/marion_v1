"use client";

import { useEffect, useState } from "react";
import { DEVICE } from "@/constants/image";

const useIsSmallWindow = () => {
  const [innerWidth, setInnerWidth] = useState(375);

  useEffect(() => {
    const width = window.innerWidth;

    function handleResize() {
      setInnerWidth(width);
    }

    if (innerWidth !== width) handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [innerWidth]);

  return innerWidth < DEVICE.SMALL;
};
export default useIsSmallWindow;
