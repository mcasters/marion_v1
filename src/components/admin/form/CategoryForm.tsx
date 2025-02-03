"use client";

import React, { useActionState, useEffect, useState } from "react";

import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { Category } from "@/lib/type";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  categoryAction: (
    prevState: { message: string; isError: boolean } | null,
    formData: FormData,
  ) => Promise<{ isError: boolean; message: string }>;
  category?: Category;
  toggleModal?: () => void;
}
export default function CategoryForm({
  categoryAction,
  category,
  toggleModal,
}: Props) {
  const isUpdate = category !== undefined;
  const [text, setText] = useState<string>(category?.value || "");
  const [state, action] = useActionState(categoryAction, null);
  const alert = useAlert();

  const reset = () => (toggleModal ? toggleModal() : setText(""));

  useEffect(() => {
    if (state) {
      if (!state.isError) reset();
      else alert(state.message, true);
    }
  }, [state]);

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>
        {isUpdate ? "Modification d'une catégorie" : "Ajout d'une catégorie"}
      </h2>
      <form action={action}>
        {isUpdate && <input type="hidden" name="id" value={category?.id} />}
        <input
          placeholder="catégorie"
          name="text"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <SubmitButton />
        <CancelButton onCancel={reset} />
      </form>
    </div>
  );
}
