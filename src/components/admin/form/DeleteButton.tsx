"use client";

import React, { useActionState, useEffect } from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";

type Props = {
  deleteAction: (id: number) => Promise<{
    message: string;
    isError: false;
  }>;
  id: number;
  disabled?: boolean;
};
export default function DeleteButton({ deleteAction, id, disabled }: Props) {
  const alert = useAlert();
  const idDeleteAction = deleteAction.bind(null, id);
  const [state, action] = useActionState(idDeleteAction, {
    message: "",
    isError: false,
  });

  useEffect(() => {
    if (state.message !== "") {
      console.log("ENETER");
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
