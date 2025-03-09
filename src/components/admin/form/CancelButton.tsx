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
  return onCancel ? (
    <button
      onClick={(e) => {
        e.preventDefault();
        onCancel();
      }}
      className={`${classname ? classname : ""} adminButton`}
      disabled={disabled ? disabled : false}
    >
      {text ? text : "Annuler"}
    </button>
  ) : (
    <button
      type="reset"
      className={`${classname ? classname : ""} adminButton`}
      disabled={disabled ? disabled : false}
    >
      {text ? text : "Annuler"}
    </button>
  );
}
