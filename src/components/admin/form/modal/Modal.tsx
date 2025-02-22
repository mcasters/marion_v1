"use client";

import { ReactNode } from "react";

import s from "../../../../styles/admin/Modal.module.css";

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  closeOnClickOutside?: boolean;
}

export default function Modal({
  children,
  isOpen,
  toggle,
  closeOnClickOutside = false,
}: Props) {
  return (
    <>
      {isOpen && (
        <div
          className={s.modalOverlay}
          onClick={closeOnClickOutside ? toggle : () => {}}
        >
          <div className={s.modalBox} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
