"use client";

import React, { useActionState, useEffect, useState } from "react";

import s from "@/components/admin/admin.module.css";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { Category, CategoryFull, Image } from "@/lib/type";
import { useAlert } from "@/app/context/alertProvider";
import SelectImageList from "@/components/admin/form/image/selectImageList";

import {
  createCategory,
  updateCategory,
} from "@/app/actions/item-post/categories/admin";

interface Props {
  category: CategoryFull;
  toggleModal: () => void;
}
export default function CategoryForm({ category, toggleModal }: Props) {
  const isUpdate = category.id !== 0;
  const [workCategory, setWorkCategory] = useState<Category>(category);
  const [image, setImage] = useState<Image>(category.content.image);
  const [state, action] = useActionState(
    isUpdate ? updateCategory : createCategory,
    null,
  );
  const alert = useAlert();
  const message = `Parmi les renseignements facultatif d'une catégorie, en plus d'un descriptif, la photo d'une œuvre peut être assignée à cette catégorie, cela permet à l'utilisateur d'avoir une idée du genre d'œuvre qui s'y trouve (cette photo s'affiche dans la pastille sur laquelle on clique pour voir les œuvres de la catégorie). Cependant, cette photo ne peut être ajoutée qu'une fois que des œuvres y sont classées, puisque le choix de la photo s'effectue parmi ces œuvres. Donc après avoir créé la catégorie, et après y avoir classé des œuvres, tu pourras alors choisir une photo en allant dans la mise à jour de la catégorie.`;

  useEffect(() => {
    if (state) {
      if (!state.isError) {
        alert(state.message, false);
        toggleModal();
      } else alert(state.message, true);
    }
  }, [state]);

  return (
    <div className={s.modalContainer}>
      <h2 className={s.modalTitle}>
        {isUpdate ? "Modification d'une catégorie" : "Ajout d'une catégorie"}
      </h2>
      <form action={action}>
        <input type="hidden" name="id" value={category.id} />
        <input type="hidden" name="type" value={category.workType} />
        <input type="hidden" name="filename" value={image.filename} />
        <input type="hidden" name="width" value={image.width} />
        <input type="hidden" name="height" value={image.height} />
        <input
          name="value"
          type="text"
          value={workCategory.value}
          onChange={(e) =>
            setWorkCategory({ ...workCategory, value: e.target.value })
          }
          required
          placeholder="Nom de la catégorie"
        />
        {!isUpdate && (
          <p>
            <br />
            <small>{message}</small>
          </p>
        )}
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
          placeholder="Titre du descriptif (facultatif)"
        />
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
          placeholder="Texte descriptif (facultatif)"
        />
        {isUpdate && (
          <SelectImageList
            itemsImages={category.images}
            selectedImage={workCategory.content.image}
            onChange={(image) => setImage(image)}
            type={category.workType}
          />
        )}
        <div className={s.buttonSection}>
          <SubmitButton />
          <CancelButton onCancel={toggleModal} />
        </div>
      </form>
    </div>
  );
}
