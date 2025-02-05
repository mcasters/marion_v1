"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";

import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { CategoryFull, Type } from "@/lib/type";
import { useAlert } from "@/app/context/AlertProvider";
import { getEmptyCategory } from "@/utils/commonUtils";
import Preview from "@/components/admin/form/imageForm/Preview";
import Images from "@/components/admin/form/imageForm/Images";

interface Props {
  category: CategoryFull;
  type: Type;
  categoryAction: (
    prevState: { message: string; isError: boolean } | null,
    formData: FormData,
  ) => Promise<{ isError: boolean; message: string }>;
  toggleModal?: () => void;
}
export default function CategoryForm({
  category,
  type,
  categoryAction,
  toggleModal,
}: Props) {
  const isUpdate = category.id !== 0;
  const [workCategory, setWorkCategory] = useState<CategoryFull>(category);
  const [image, setImage] = useState<string[]>([
    category.content.image.filename,
  ]);
  const [state, action] = useActionState(categoryAction, null);
  const resetImageRef = useRef<number>(0);
  const alert = useAlert();

  const reset = () => {
    if (toggleModal) toggleModal();
    else {
      setWorkCategory(getEmptyCategory());
      setImage([]);
      resetImageRef.current = resetImageRef.current + 1;
    }
  };

  useEffect(() => {
    if (state) {
      if (!state.isError) {
        alert(state.message, false);
        reset();
      } else alert(state.message, true);
    }
  }, [state]);

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>
        {isUpdate ? "Modification d'une catégorie" : "Ajout d'une catégorie"}
      </h2>
      <form action={action}>
        {isUpdate && <input type="hidden" name="id" value={category?.id} />}
        <label className={s.formLabel}>
          Nom de la catégorie
          <input
            name="value"
            type="text"
            value={workCategory.value}
            onChange={(e) =>
              setWorkCategory({ ...workCategory, value: e.target.value })
            }
            required
          />
        </label>
        <p className={s.catInfo}>
          La partie descriptive d'une catégorie est facultative. Lorsqu'une
          peinture, par exemple, comporte des catégories, mais qu'au lieu de
          cliquer sur l'une des catégories dans le sous-menu de 'peinture", on
          clique directement sur le menu 'peinture', alors on arrive sur une
          page où figurent toutes les catégories, avec notamment la photo
          descriptive de la catégorie. Cela permet de voir un peu à quel genre
          s'attendre dans les diverses catégories.
          <br />
          Le titre et le texte, eux aussi facultatifs, seront affichés en
          introduction en haut de la page des œuvres en question.
        </p>
        <label className={s.formLabel}>
          titre du descriptif (facultatif)
          <input
            name="title"
            type="text"
            value={workCategory.content?.title}
            onChange={(e) =>
              setWorkCategory({ ...workCategory, title: e.target.value })
            }
          />
        </label>
        <label className={s.formLabel}>
          Texte descriptif (facultatif)
          <textarea
            name="text"
            rows={5}
            value={workCategory.content?.text}
            onChange={(e) =>
              setWorkCategory({ ...workCategory, text: e.target.value })
            }
          />
        </label>
        <div className={s.imageFormContainer}>
          {isUpdate && workCategory.content.image.filename !== "" && (
            <Preview
              images={[workCategory.content.image]}
              pathImage={`/images/${type}`}
              onDelete={() => {
                setImage([]);
              }}
            />
          )}
          <Images
            isMultiple={false}
            title={"Une photo descriptive (facultative)"}
            reset={resetImageRef.current}
            onNewImages={setImage}
            smallImage={true}
          />
        </div>
        <SubmitButton />
        <CancelButton onCancel={reset} />
      </form>
    </div>
  );
}
