"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";

import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { CategoryFull, Image, Type } from "@/lib/type";
import { useAlert } from "@/app/context/AlertProvider";
import { getEmptyCategory } from "@/utils/commonUtils";
import SelectImageForm from "@/components/admin/form/imageForm/SelectImageForm";

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
  const [image, setImage] = useState<Image>(category.content.image);
  const [state, action] = useActionState(categoryAction, null);
  const resetImageRef = useRef<number>(0);
  const alert = useAlert();

  const reset = () => {
    if (toggleModal) toggleModal();
    else {
      setWorkCategory(getEmptyCategory());
      setImage(null);
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
        {isUpdate && <input type="hidden" name="id" value={category.id} />}
        <input type="hidden" name="filename" value={image.filename} />
        <input type="hidden" name="width" value={image.width} />
        <input type="hidden" name="height" value={image.height} />
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
        {!isUpdate && (
          <p className={s.catInfo}>
            La partie descriptive d'une catégorie est facultative. Lorsqu'une
            peinture, par exemple, comporte des catégories, mais qu'au lieu de
            cliquer sur l'une des catégories dans le sous-menu de 'peinture", on
            clique plutôt sur le menu 'peinture', alors on arrive sur une page
            où figurent toutes les catégories, avec la photo représentative de
            la catégorie. Cela permet de voir un peu à quel genre s'attendre
            dans les diverses catégories.
            <br />
            Le titre et le texte, eux aussi facultatifs, seront affichés en
            introduction en haut de la page des œuvres de la catégorie.
            <br />À noter que l'image de la catégorie ne peut être ajoutée
            qu'une fois que la catégorie a été créée et que des items sont
            classés dedans. Il faudra alors aller sur la modification de la
            catégorie, où tu pourras choisir parmi les photos des items qui y
            sont classés.
          </p>
        )}
        <label className={s.formLabel}>
          titre du descriptif (facultatif)
          <input
            name="title"
            type="text"
            value={workCategory.content.title}
            onChange={(e) =>
              setWorkCategory({
                ...workCategory,
                content: { ...workCategory.content, title: e.target.value },
              })
            }
          />
        </label>
        <label className={s.formLabel}>
          Texte descriptif (facultatif)
          <textarea
            name="text"
            rows={5}
            value={workCategory.content.text}
            onChange={(e) =>
              setWorkCategory({
                ...workCategory,
                content: { ...workCategory.content, text: e.target.value },
              })
            }
          />
        </label>
        {isUpdate && (
          <SelectImageForm
            items={category.items}
            value={workCategory.content.image}
            onChange={(image) => setImage(image)}
          />
        )}
        <div className={s.buttonSection}>
          <SubmitButton />
          <CancelButton onCancel={reset} />
        </div>
      </form>
    </div>
  );
}
