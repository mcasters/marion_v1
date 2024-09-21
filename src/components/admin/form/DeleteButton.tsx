"use client";

import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import toast from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  api: string;
  disabled?: boolean;
};
export default function DeleteButton({ api, disabled }: Props) {
  const router = useRouter();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(api).then((res) => {
        if (res.ok) {
          toast.success("supprimé");
          router.refresh();
        } else toast.error("Erreur à la suppression");
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
      <FiTrash2 />
    </button>
  );
}
