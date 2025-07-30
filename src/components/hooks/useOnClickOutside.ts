"use client";

import { useEffect, useRef, useState } from "react";

const useOnClickOutside = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const [isOutside, setIsOutside] = useState<boolean>(true);

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (ref.current) setIsOutside(!ref.current.contains(e.target as Node));
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);

  return { isOutside, ref };
};

export default useOnClickOutside;
