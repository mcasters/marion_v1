"use client";

import React, { useEffect } from "react";
import s from "./AlertModal.module.css";
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

  return (
    <div className={s.alertOverlay} onClick={onClose}>
      <div className={s.alertBox} style={isError ? errorStyles : validStyles}>
        <div
          className={s.icon}
          style={isError ? { color: "#f8e3e4" } : { color: "#eafcea" }}
        >
          {isError ? <ErrorIcon /> : <CheckIcon />}
        </div>
        <p className={s.message}>{message}</p>
      </div>
    </div>
  );
}
