"use client";

import React, { ReactNode, useEffect } from "react";

import s from "../modal.module.css";
import useOnMousePosition from "@/components/hooks/useOnMousePosition.ts";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClickOutside?: () => void;
  width?: number;
}

export default function Modal({
  children,
  isOpen,
  title,
  onClickOutside,
  width = 730,
}: Props) {
  const { location, ref } = useOnMousePosition();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    document.body.style.userSelect = isOpen ? "none" : "unset";
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={s.modalOverlay}
          onClick={() => (onClickOutside ? onClickOutside() : undefined)}
          // set "draggable" to be able to remove draggable with "onDragStart" (inherit from dragList)
          draggable
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <div
            ref={ref}
            className={s.modalBox}
            style={
              location
                ? { width, top: location.y, left: location.x }
                : { width }
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className={s.modalTitle}>{title}</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
