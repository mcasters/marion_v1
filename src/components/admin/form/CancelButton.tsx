"use client";

import React from "react";

interface Props {
  text?: string;
  classname?: string;
  disabled?: boolean;
  onCancel?: () => void;
}

export default function CancelButton({
  text,
  classname,
  disabled,
  onCancel,
}: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onCancel) onCancel();
        else
          setTimeout(() => {
            window.location.reload();
          }, 0);
      }}
      className={`${classname ? classname : ""} adminButton`}
      disabled={disabled ? disabled : false}
    >
      {text ? text : "Annuler"}
    </button>
  );
}
