"use client";

import React, { FormEvent, useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { Category, Image, Type, WorkFull } from "@/lib/type";
import { useAlert } from "@/app/context/alertProvider";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { createItem, updateItem } from "@/app/actions/item-post/admin";
import Preview from "@/components/admin/form/image/preview";
import ImageInput from "@/components/admin/form/image/imageInput";
import { format } from "date-fns/format";

interface Props {
  item: WorkFull;
  toggleModal: () => void;
  categories?: Category[];
}

export default function ItemForm({ item, toggleModal, categories }: Props) {
  const isUpdate = item.id !== 0;
  const isSculpture = item.type === Type.SCULPTURE;
  const alert = useAlert();
  const [workItem, setWorkItem] = useState<WorkFull>(item);
  const [date, setDate] = useState<string>(
    format(new Date(item.date), "yyyy-MM-dd"),
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);

  console.log(format(new Date(item.date), "yyyy-MM-dd"));
  useEffect(() => {
    if (!isSculpture && workItem.images.length > 0 && resizedFiles.length > 0) {
      handleDelete(workItem.images[0].filename);
    }
  }, [resizedFiles]);

  const handleDelete = (filename: string) => {
    const images = workItem.images.filter(
      (i: Image) => i.filename !== filename,
    );
    setWorkItem({ ...workItem, images });
    setFilenamesToDelete([...filenamesToDelete, filename]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    resizedFiles.forEach((file) => formData.append("files", file));
    const { message, isError } = isUpdate
      ? await updateItem(null, formData)
      : await createItem(null, formData);
    alert(message, isError);
    if (!isError) toggleModal();
  };

  return (
    <div className={s.modalContainer}>
      <h2 className={s.modalTitle}>
        {`${isUpdate ? "Modifier" : "Ajouter"} ${item.type === Type.DRAWING ? "un" : "une"} ${item.type}`}
      </h2>
      <form onSubmit={onSubmit}>
        <input type="hidden" name="type" value={item.type} />
        {isUpdate && (
          <>
            <input type="hidden" name="id" value={item.id} />
            <input
              type="hidden"
              name="filenamesToDelete"
              value={filenamesToDelete}
            />
          </>
        )}
        <input type="hidden" name="isToSell" value={String(item.isToSell)} />
        <input
          type="hidden"
          name="oldCategoryId"
          value={String(item.categoryId)}
        />
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
          Date
          <input
            onChange={(e) => {
              setDate(e.target.value);
            }}
            name="date"
            type="date"
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
          <Preview
            filenames={workItem.images.map((i: Image) => i.filename)}
            pathImage={`/images/${item.type}`}
            onDelete={handleDelete}
            title={isSculpture ? "Une photo minimum :" : "Une seule photo :"}
          />
          <ImageInput
            isMultiple={isSculpture}
            acceptSmallImage={true}
            setResizedFiles={setResizedFiles}
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
              (resizedFiles.length === 0 && workItem.images.length === 0)
            }
          />
          <CancelButton onCancel={toggleModal} />
        </div>
      </form>
    </div>
  );
}
