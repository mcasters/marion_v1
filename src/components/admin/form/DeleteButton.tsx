"use client";

import React, { useActionState, useEffect } from "react";
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
  const idDeleteAction = deleteAction.bind(null, id, type);
  const [state, action] = useActionState(idDeleteAction, {
    message: "",
    isError: false,
  });

  useEffect(() => {
    if (state.message !== "") {
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <form action={action}>
      <button
        type="submit"
        className="iconButton"
        aria-label="Supprimer"
        disabled={disabled ? disabled : false}
      >
        <DeleteIcon />
      </button>
    </form>
  );
}
