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
  const { refLocation, ref } = useOnMousePosition();

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
        >
          <div
            ref={ref}
            className={s.modalBox}
            style={
              refLocation
                ? { width, top: refLocation.y, left: refLocation.x }
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
