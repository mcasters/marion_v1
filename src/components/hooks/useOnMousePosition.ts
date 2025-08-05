"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const useOnMousePosition = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [location, setLocation] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onDown = useCallback(
    (e: MouseEvent) => {
      if (ref.current && e.target === ref.current) {
        setLocation({
          x: ref.current.getBoundingClientRect().left,
          y: ref.current.getBoundingClientRect().top,
        });
        setIsDown(true);
      }
    },
    [ref],
  );

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (isDown)
        setLocation((prevState) => {
          return {
            x: (prevState?.x || 0) + e.movementX,
            y: (prevState?.y || 0) + e.movementY,
          };
        });
    },
    [isDown, ref],
  );

  useEffect(() => {
    function onUp() {
      setIsDown(false);
    }

    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mousemove", onMove);
    };
  });

  return { location, ref };
};

export default useOnMousePosition;
