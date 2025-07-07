"use client";

import { RefObject, useEffect, useState } from "react";

const useOnClickOutside = (ref: RefObject<HTMLDivElement | null>) => {
  const [isOutside, setIsOutside] = useState<boolean>(true);

  useEffect(() => {
    const listener = (
      e: DocumentEventMap["mousedown"] | DocumentEventMap["touchstart"],
    ) => {
      if (ref.current && e.target instanceof Node) {
        if ("contains" in ref.current) {
          setIsOutside(!ref.current.contains(e.target));
        }
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);

  return isOutside;
};

export default useOnClickOutside;
