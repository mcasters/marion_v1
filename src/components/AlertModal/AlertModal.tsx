"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./AlertModal.module.css";
import CloseIcon from "@/components/icons/CloseIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";

type Props = {
  message: string;
  isError: boolean;
  time: number;
  onClose: () => void;
};

const errorStyles = {
  backgroundColor: "#f3d0d4",
};

const validStyles = {
  backgroundColor: "#c6eec4",
};

export default function AlertModal({ message, isError, time, onClose }: Props) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, time);
  });

  return createPortal(
    <div className={s.modal}>
      <div className={s.content} style={isError ? errorStyles : validStyles}>
        <div
          className={s.icon}
          style={isError ? { color: "#f8e3e4" } : { color: "#def5dd" }}
        >
          {isError ? <ErrorIcon /> : <CheckIcon />}
        </div>
        <p className={s.message}>{message}</p>
        <button className={`${s.closeButton} iconButton`} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.body,
  );
}
