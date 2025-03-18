"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import s from "@/styles/admin/admin.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import { useAlert } from "@/app/context/AlertProvider";
import Images from "@/components/admin/form/imageForm/Images";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";

interface Props {
  item: ItemFull;
  itemAction: (
    prevState: { message: string; isError: boolean } | null,
    formData: FormData,
  ) => Promise<{ isError: boolean; message: string }>;
  toggleModal?: () => void;
  categories?: Category[];
}

export default function ItemForm({
  item,
  itemAction,
  toggleModal,
  categories,
}: Props) {
  const isUpdate = item.id !== 0;
  const isSculpture = item.type === Type.SCULPTURE;
  const alert = useAlert();
  const resetImageRef = useRef<number>(0);

  const [workItem, setWorkItem] = useState<ItemFull>(item);
  const [date, setDate] = useState<string>(
    new Date(item.date).getFullYear().toString(),
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [state, action] = useActionState(itemAction, null);

  const reset = () => {
    if (toggleModal) toggleModal();
    else {
      setWorkItem(getEmptyItem(item.type));
      setDate("");
      setFilenamesToDelete([]);
      setNewImages([]);
      resetImageRef.current = resetImageRef.current + 1;
    }
  };

  useEffect(() => {
    if (state) {
      if (!state.isError) reset();
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={s.modalContainer}>
      <h2 className={s.modalTitle}>
        {`${isUpdate ? "Modifier" : "Ajouter"} ${item.type === Type.DRAWING ? "un" : "une"} ${item.type}`}
      </h2>
      <form action={action}>
        {isUpdate && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="type" value={item.type} />
        <input
          type="hidden"
          name="filenamesToDelete"
          value={filenamesToDelete}
        />
        <input type="hidden" name="isToSell" value={String(item.isToSell)} />
        <label className={s.formLabel}>
          Titre
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, title: e.target.value })
            }
            name="title"
            type="text"
            value={workItem.title}
            required
          />
        </label>
        <label className={s.formLabel}>
          Catégorie (facultatif)
          <select
            name="categoryId"
            value={workItem.categoryId?.toString()}
            onChange={(e) => {
              setWorkItem(
                Object.assign({}, workItem, {
                  categoryId: e.target.value,
                }),
              );
            }}
          >
            <option value={0}>-- Aucune catégorie --</option>
            {categories &&
              categories.map((cat) => {
                if (cat.value !== "Sans catégorie")
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.value}
                    </option>
                  );
              })}
          </select>
        </label>
        <label className={s.formLabel}>
          Année
          <input
            onChange={(e) => {
              setDate(e.target.value);
            }}
            name="date"
            type="number"
            min={1980}
            max={2100}
            value={date}
            required
          />
        </label>
        <label className={s.formLabel}>
          Technique
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, technique: e.target.value })
            }
            name="technique"
            type="text"
            value={workItem.technique}
            required
          />
        </label>
        <label className={s.formLabel}>
          Description (facultatif)
          <textarea
            onChange={(e) =>
              setWorkItem({ ...workItem, description: e.target.value })
            }
            name="description"
            rows={3}
            value={workItem.description}
          />
        </label>
        <label className={s.formLabel}>
          Hauteur (cm)
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, height: Number(e.target.value) })
            }
            name="height"
            type="number"
            value={workItem.height === 0 ? "" : workItem.height.toString()}
            required
          />
        </label>
        <label className={s.formLabel}>
          Largeur (cm)
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, width: Number(e.target.value) })
            }
            name="width"
            type="number"
            value={workItem.width === 0 ? "" : workItem.width.toString()}
            required
          />
        </label>
        {isSculpture && (
          <label className={s.formLabel}>
            Profondeur (cm)
            <input
              onChange={(e) =>
                setWorkItem({ ...workItem, length: Number(e.target.value) })
              }
              name="length"
              type="number"
              value={workItem.length === 0 ? "" : workItem.length.toString()}
              required
            />
          </label>
        )}
        <label className={`${s.formLabel} ${s.checkLabel}`}>
          À vendre :
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, isToSell: e.target.checked })
            }
            name="isToSell"
            type="checkbox"
            defaultChecked={workItem.isToSell}
            className={s.checkInput}
          />
        </label>
        {workItem.isToSell && (
          <label className={s.formLabel}>
            Prix
            <input
              onChange={(e) =>
                setWorkItem({ ...workItem, price: Number(e.target.value) })
              }
              name="price"
              type="number"
              value={
                !workItem.price || workItem.price === 0
                  ? ""
                  : workItem.price.toString()
              }
            />
          </label>
        )}
        <div className={s.imagesContainer}>
          <Images
            type={item.type}
            reset={resetImageRef.current}
            isMultiple={isSculpture}
            smallImage={true}
            onNewImages={setNewImages}
            onDelete={(filename) => {
              setFilenamesToDelete([...filenamesToDelete, filename]);
            }}
            images={item.images}
            title={isSculpture ? "Une photo minimum :" : "Une seule photo :"}
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton
            disabled={
              workItem.title === "" ||
              workItem.technique === "" ||
              date === "" ||
              workItem.height === 0 ||
              workItem.width === 0 ||
              (isSculpture && workItem.length === 0) ||
              (newImages.length === 0 && workItem.images.length === 0) ||
              (newImages.length === 0 &&
                filenamesToDelete.length >= workItem.images.length)
            }
          />
          <CancelButton onCancel={reset} />
        </div>
      </form>
    </div>
  );
}
