"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const useOnMousePosition = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [refLocation, setRefLocation] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const moveTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const onDown = useCallback(
    (e: MouseEvent) => {
      if (ref.current && e.target === ref.current) {
        setRefLocation({
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
      /*ref.current?.removeEventListener("mousemove", onMove); // unregister the event
      clearTimeout(moveTimer.current); // clear previous timeout instance
      moveTimer.current = setTimeout(
        () => ref.current?.addEventListener("mousemove", onMove), // re-register the event after a certain time
        5000,
      );*/

      if (isDown)
        setRefLocation((prevState) => {
          return {
            x: (prevState?.x || 0) + e.movementX,
            y: (prevState?.y || 0) + e.movementY,
          };
        });
    },
    [isDown, ref, moveTimer],
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

  return { refLocation, ref };
};

export default useOnMousePosition;
