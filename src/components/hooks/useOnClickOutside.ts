"use client";

import { useEffect, useState } from "react";

const useOnClickOutside = (ref) => {
  const [isOutside, setIsOutside] = useState<boolean>(true);

  useEffect(() => {
    const listener = (event) => {
      if (ref.current) setIsOutside(!ref.current.contains(event.target));
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
