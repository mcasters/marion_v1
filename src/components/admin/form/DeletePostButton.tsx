"use client";

import React, { useActionState, useEffect } from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";
import { deletePost } from "@/app/actions/posts/admin";

type Props = {
  id: number;
};
export default function DeletePostButton({ id }: Props) {
  const alert = useAlert();
  const idDeleteAction = deletePost.bind(null, id);
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
      <button type="submit" className="iconButton" aria-label="Supprimer">
        <DeleteIcon />
      </button>
    </form>
  );
}
