"use client";

import React, { useActionState, useEffect, useState } from "react";

import s from "@/components/admin/admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { Category, Image, ItemFull, Type } from "@/lib/type";
import { useAlert } from "@/app/context/AlertProvider";
import { getEmptyCategory } from "@/utils/commonUtils";
import SelectImageList from "@/components/admin/form/image/SelectImageList";
import { createCategory, updateCategory } from "@/app/actions/items/admin";

interface Props {
  category: Category;
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  toggleModal?: () => void;
}
export default function CategoryForm({
  category,
  items,
  type,
  toggleModal,
}: Props) {
  const isUpdate = category.id !== 0;
  const [workCategory, setWorkCategory] = useState<Category>(category);
  const [image, setImage] = useState<Image>(category.content.image);
  const [state, action] = useActionState(
    isUpdate ? updateCategory : createCategory,
    null,
  );
  const alert = useAlert();
  const message = `Parmi les renseignements facultatif d'une catégorie, la photo d'une œuvre peut être assignée à cette catégorie, cela permet à l'utilisateur d'avoir une idée du genre d'œuvre qui s'y trouve (cette photo s'affiche dans la pastille sur laquelle on clique pour sélectionner la catégorie). Cependant, cette photo ne peut être ajoutée qu'une fois que des œuvres y sont classées, puisque le choix de la photo s'effectue parmi ces œuvres. Donc après avoir créé la catégorie, et après y avoir classé des œuvres, tu pourras alors choisir une photo en allant dans la mise à jour de la catégorie.`;

  const handleReset = () => {
    if (toggleModal) toggleModal();
    else {
      const emptyCat = getEmptyCategory();
      setWorkCategory(emptyCat);
      setImage(emptyCat.content.image);
    }
  };

  useEffect(() => {
    if (state) {
      if (!state.isError) {
        alert(state.message, false);
        handleReset();
      } else alert(state.message, true);
    }
  }, [state]);

  return (
    <div className={s.modalContainer}>
      <h2 className={s.modalTitle}>
        {isUpdate ? "Modification d'une catégorie" : "Ajout d'une catégorie"}
      </h2>
      <form action={action}>
        {isUpdate && <input type="hidden" name="id" value={category.id} />}
        <input type="hidden" name="type" value={type} />
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
          <p>
            <small>{message}</small>
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
          <SelectImageList
            items={items}
            value={workCategory.content.image}
            onChange={(image) => setImage(image)}
          />
        )}
        <div className={s.buttonSection}>
          <SubmitButton />
          <CancelButton onCancel={handleReset} />
        </div>
      </form>
    </div>
  );
}
