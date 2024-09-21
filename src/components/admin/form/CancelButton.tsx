"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onCancel
          ? onCancel()
          : setTimeout(function () {
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
