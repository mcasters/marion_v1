"use client";

import React, { useRef, useState } from "react";
import { parse } from "date-fns";
import s from "@/styles/admin/Admin.module.css";
import { CategoryFull, ItemFull, Type } from "@/lib/db/item";
import { getImageTab } from "@/utils/commonUtils";
import Images from "@/components/admin/form/imageForm/Images";
import Preview from "@/components/admin/form/imageForm/Preview";
import CancelButton from "@/components/admin/form/CancelButton";
import SubmitButton from "@/components/admin/form/SubmitButton";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  item: ItemFull;
  toggleModal?: () => void;
  categories?: CategoryFull[];
}

export default function ItemForm({
  item,
  toggleModal,
  categories,
  typeAdd,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const resetImageRef = useRef<number>(0);
  const alert = useAlert();

  const isSculpture =
    item?.type === Type.SCULPTURE || typeAdd === Type.SCULPTURE;
  const [workItem, setWorkItem] = useState<ItemFull>(item);

  const [title, setTitle] = useState<string>(item?.title || "");
  const [date, setDate] = useState<Date>(new Date(item?.date || new Date()));
  const [technique, setTechnique] = useState<string>(item?.technique || "");
  const [description, setDescription] = useState<string>(
    item?.description || "",
  );
  const [height, setHeight] = useState<string>(item?.height.toString() || "");
  const [width, setWidth] = useState<string>(item?.width.toString() || "");
  const [price, setPrice] = useState<string>(item?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState<string>(
    item?.category?.id.toString() || "",
  );
  const [isToSell, setIsToSell] = useState<boolean>(item?.isToSell || false);
  const [length, setLength] = useState<string>(
    item?.type === Type.SCULPTURE ? item.length.toString() : "",
  );
  const [hasImages, setHasImages] = useState<boolean>(
    item === undefined
      ? false
      : item.type === Type.SCULPTURE
        ? item.images.length > 0
        : item.imageFilename !== "",
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const api = item ? `api/${item.type}/update` : `api/${typeAdd}/add`;

  const reset = () => {
    setTitle("");
    setDate(new Date());
    setTechnique("");
    setDescription("");
    setHeight("");
    setWidth("");
    setLength("");
    setPrice("");
    setIsToSell(false);
    setCategoryId("");
    resetImageRef.current = resetImageRef.current + 1;
    if (toggleModal) toggleModal();
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          if (toggleModal) {
            toggleModal();
          } else {
            reset();
          }
          alert(item ? "item modifié" : "item ajouté", false);
          router.refresh();
        } else alert("Erreur à l'enregistrement", true);
      });
    }
  };

  return (
    <div className={item ? s.wrapperModal : s.formContainer}>
      <h2>{item ? `Modifier une ${item.type}` : `Ajouter une ${typeAdd}`}</h2>
      <form ref={formRef} onSubmit={submit}>
        {item && <input type="hidden" name="id" value={item.id} />}
        {item && (
          <input
            type="hidden"
            name="filenamesToDelete"
            value={filenamesToDelete}
          />
        )}
        <input type="hidden" name="isToSell" value={String(isToSell)} />
        <label className={s.formLabel}>
          Titre
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            value={title}
            required
          />
        </label>
        <label className={s.formLabel}>
          Catégorie (facultatif)
          <select
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
              const date = parse(e.currentTarget.value, "yyyy", new Date());
              setDate(date);
            }}
            name="date"
            type="number"
            value={date.getFullYear()}
            required
          />
        </label>
        <label className={s.formLabel}>
          Technique
          <input
            onChange={(e) => setTechnique(e.target.value)}
            name="technique"
            type="text"
            value={technique}
            required
          />
        </label>
        <label className={s.formLabel}>
          Description (facultatif)
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={5}
            value={description}
          />
        </label>
        <label className={s.formLabel}>
          Hauteur (cm)
          <input
            onChange={(e) => setHeight(e.target.value)}
            name="height"
            type="number"
            value={height}
            required
          />
        </label>
        <label className={s.formLabel}>
          Largeur (cm)
          <input
            onChange={(e) => setWidth(e.target.value)}
            name="width"
            type="number"
            value={width}
          />
        </label>
        {isSculpture && (
          <label className={s.formLabel}>
            Profondeur (cm)
            <input
              onChange={(e) => setLength(e.target.value)}
              name="length"
              type="number"
              value={length}
              required
            />
          </label>
        )}
        <label className={s.formLabel}>
          À vendre :
          <input
            onChange={(e) => setIsToSell(e.target.checked)}
            name="isToSell"
            type="checkbox"
            defaultChecked={isToSell}
          />
        </label>
        {isToSell && (
          <label className={s.formLabel}>
            Prix
            <input
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              type="text"
              value={price}
            />
          </label>
        )}
        <div className={s.imageFormContainer}>
          {item && (
            <Preview
              images={getImageTab(item)}
              pathImage={`/images/${item.type}`}
              onDelete={(filename) => {
                setFilenamesToDelete([...filenamesToDelete, filename]);
                if (item) {
                  setHasImages(
                    filenamesToDelete.length < getImageTab(item).length,
                  );
                }
              }}
            />
          )}
          <Images
            isMultiple={isSculpture}
            title={isSculpture ? "1 photo minimum" : "1 seule photo"}
            reset={resetImageRef.current}
            hasImage={setHasImages}
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton
            disabled={
              !title ||
              !date ||
              !technique ||
              !height ||
              !width ||
              (isSculpture && !length) ||
              (isToSell && !price) ||
              !hasImages
            }
          />
          <CancelButton onCancel={reset} />
        </div>
      </form>
    </div>
  );
}
