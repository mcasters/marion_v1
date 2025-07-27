"use client";

import React, { ReactNode } from "react";

import s from "../modal.module.css";

interface Props {
  children: ReactNode;
  title: string;
  handleCloseOutside?: () => void;
  width?: number;
}

export default function Modal({
  children,
  title,
  handleCloseOutside,
  width,
}: Props) {
  return (
    <div
      className={s.modalOverlay}
      onClick={handleCloseOutside ? handleCloseOutside : undefined}
    >
      <div
        className={s.modalBox}
        onClick={(e) => e.stopPropagation()}
        style={width ? { width } : undefined}
      >
        <h2 className={s.modalTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
