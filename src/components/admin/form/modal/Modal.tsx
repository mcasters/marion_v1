"use client";

import { ReactNode } from "react";

import s from "../../../../styles/admin/Modal.module.css";

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal({ children, isOpen, toggle }: Props) {
  return (
    <>
      {isOpen && (
        <div className={s.modalOverlay} onClick={toggle}>
          <div className={s.modalBox} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
