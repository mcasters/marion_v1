"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import s from "@/styles/admin/Admin.module.css";
import { CategoryFull, ItemFull, Type } from "@/lib/db/item";
import { getEmptyItem } from "@/utils/commonUtils";
import { useAlert } from "@/app/context/AlertProvider";
import Preview from "@/components/admin/form/imageForm/Preview";
import Images from "@/components/admin/form/imageForm/Images";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { createPainting } from "@/app/actions/paintings/admin";

interface Props {
  item: ItemFull;
  toggleModal?: () => void;
  categories?: CategoryFull[];
}

export default function ItemForm({ item, toggleModal, categories }: Props) {
  const [state, action] = useActionState(createPainting, {
    message: "",
    isError: false,
  });
  const isUpdate = item.id !== 0;
  const isSculpture = item.type === Type.SCULPTURE;
  const api = isUpdate ? `api/${item.type}/update` : `api/${item.type}/add`;
  const alert = useAlert();
  const resetImageRef = useRef<number>(0);

  const [workItem, setWorkItem] = useState<ItemFull>(item);
  const [date, setDate] = useState<string>(
    new Date(item.date).getFullYear().toString(),
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);

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
    if (state.message !== "") {
      if (!state.isError) reset();
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>
        {`${isUpdate ? "Modifier" : "Ajouter"} ${item.type === Type.DRAWING ? "un" : "une"} ${item.type}`}
      </h2>
      <form action={action}>
        {isUpdate && <input type="hidden" name="id" value={item.id} />}
        {isUpdate && (
          <input
            type="hidden"
            name="filenamesToDelete"
            value={filenamesToDelete}
          />
        )}
        <input type="hidden" name="isToSell" value={String(item.isToSell)} />
        <label className={s.formLabel}>
          Titre
          <input
            autoFocus
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
            value={workItem.category?.id}
            onChange={(e) => {
              setWorkItem(
                Object.assign({}, workItem, {
                  category: { id: e.target.value },
                }),
              );
            }}
            className={s.select}
          >
            <option value="">-- Aucune catégorie --</option>
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
            rows={5}
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
        <div className={s.formLabel}>
          <label className={` ${s.checkLabel}`}>
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
        </div>
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
                workItem.price === undefined || workItem.price === 0
                  ? ""
                  : workItem.price.toString()
              }
            />
          </label>
        )}
        <div className={s.imageFormContainer}>
          {isUpdate && (
            <Preview
              images={item.images}
              pathImage={`/images/${item.type}`}
              onDelete={(filename) => {
                setFilenamesToDelete([...filenamesToDelete, filename]);
              }}
            />
          )}
          <Images
            isMultiple={isSculpture}
            title={isSculpture ? "1 photo minimum" : "1 seule photo"}
            reset={resetImageRef.current}
            onNewImages={setNewImages}
            smallImage={true}
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
