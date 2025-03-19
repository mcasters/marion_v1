"use client";

import React from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";

type Props = {
  action: () => Promise<{
    message: string;
    isError: boolean;
  }>;
  disabled?: boolean;
};
export default function DeleteButton({ action, disabled }: Props) {
  const alert = useAlert();

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        if (confirm("Sûr de vouloir supprimé ?")) {
          const res = await action();
          alert(res.message, res.isError);
        }
      }}
      className="iconButton"
      aria-label="Supprimer"
      disabled={disabled ? disabled : false}
    >
      <DeleteIcon />
    </button>
  );
}
