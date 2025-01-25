"use client";

import React, { useActionState, useEffect, useState } from "react";

import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAlert } from "@/app/context/AlertProvider";
import { Category } from "@/lib/db/item";
import {
  createCategoryPainting,
  updateCategoryPainting,
} from "@/app/actions/paintings/admin";

interface Props {
  category?: Category;
  toggleModal?: () => void;
}
export default function CategoryForm({ category, toggleModal }: Props) {
  const isUpdate = category !== undefined;
  const [text, setText] = useState<string>(category?.value || "");
  const alert = useAlert();
  const [state, action] = useActionState(
    isUpdate ? updateCategoryPainting : createCategoryPainting,
    {
      message: "",
      isError: false,
    },
  );

  const reset = () => (toggleModal ? toggleModal() : setText(""));

  useEffect(() => {
    if (state.message !== "") {
      if (!state.isError) reset();
      alert(state.message, state.isError);
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
