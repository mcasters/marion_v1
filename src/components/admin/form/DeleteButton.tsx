"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";

type Props = {
  api: string;
  disabled?: boolean;
};
export default function DeleteButton({ api, disabled }: Props) {
  const router = useRouter();
  const alert = useAlert();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(api).then((res) => {
        if (res.ok) {
          alert("Supprimé");
          router.refresh();
        } else alert("Erreur à la suppression", true);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="iconButton"
      aria-label="Supprimer"
      disabled={disabled ? disabled : false}
    >
      <DeleteIcon />
    </button>
  );
}
