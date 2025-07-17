"use client";

import React, { ReactNode } from "react";

import s from "../modal.module.css";

interface Props {
  children?: ReactNode;
  handleCloseOutside?: () => void;
  title: string;
}

export default function Modal({ children, handleCloseOutside, title }: Props) {
  return (
    <div
      className={s.modalOverlay}
      onClick={handleCloseOutside ? handleCloseOutside : undefined}
    >
      <div className={s.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.modalTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
