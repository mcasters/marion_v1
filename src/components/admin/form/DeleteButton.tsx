"use client";

import React, { useActionState, useEffect } from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";

type Props = {
  deleteAction: () => Promise<{
    message: string;
    isError: boolean;
  }>;
  disabled?: boolean;
};
export default function DeleteButton({ deleteAction, disabled }: Props) {
  const alert = useAlert();
  const [state, action] = useActionState(deleteAction, {
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
