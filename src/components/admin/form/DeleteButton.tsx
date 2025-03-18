"use client";

import React from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";
import { Type } from "@/lib/type";
import { deleteCategory, deleteItem } from "@/app/actions/items/admin";

type Props = {
  id: number;
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  isCategory: boolean;
  disabled?: boolean;
};
export default function DeleteButton({
  id,
  type,
  isCategory,
  disabled,
}: Props) {
  const alert = useAlert();
  const deleteAction = isCategory ? deleteCategory : deleteItem;

  return (
    <button
      onClick={async () => {
        const res = await deleteAction(id, type);
        alert(res.message, res.isError);
      }}
      className="iconButton"
      aria-label="Supprimer"
      disabled={disabled ? disabled : false}
    >
      <DeleteIcon />
    </button>
  );
}
