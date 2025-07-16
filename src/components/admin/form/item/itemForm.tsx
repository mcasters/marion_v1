"use client";

import React, { FormEvent, useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { Category, Image, Type, WorkFull } from "@/lib/type";
import { useAlert } from "@/app/context/alertProvider";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { createItem, updateItem } from "@/app/actions/item-post/admin";
import PreviewPart from "@/components/admin/form/image/previewPart.tsx";
import ImageInputPart from "@/components/admin/form/image/imageInputPart.tsx";
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

  useEffect(() => {
    if (!isSculpture && workItem.images.length > 0 && resizedFiles.length > 0) {
      handleDeleteFile(workItem.images[0].filename);
    }
  }, [resizedFiles]);

  const handleDeleteFile = (filename: string) => {
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
      ? await updateItem(formData)
      : await createItem(formData);
    alert(message, isError);
    if (!isError) toggleModal();
  };

  return (
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
      <div className={s.column}>
        <input
          onChange={(e) => setWorkItem({ ...workItem, title: e.target.value })}
          name="title"
          type="text"
          value={workItem.title}
          autoFocus
          required
          placeholder="Titre"
        />
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
        <input
          onChange={(e) => {
            setDate(e.target.value);
          }}
          name="date"
          type="date"
          value={date}
          required
          placeholder="Date"
        />
        <input
          onChange={(e) =>
            setWorkItem({ ...workItem, technique: e.target.value })
          }
          name="technique"
          type="text"
          value={workItem.technique}
          required
          placeholder="Technique"
        />
        <div className={s.dimensions}>
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, height: Number(e.target.value) })
            }
            name="height"
            type="number"
            value={workItem.height === 0 ? "" : workItem.height.toString()}
            required
            placeholder="Hauteur (cm)"
          />
          <input
            onChange={(e) =>
              setWorkItem({ ...workItem, width: Number(e.target.value) })
            }
            name="width"
            type="number"
            value={workItem.width === 0 ? "" : workItem.width.toString()}
            required
            placeholder="Largeur (cm)"
          />
          {isSculpture && (
            <input
              onChange={(e) =>
                setWorkItem({ ...workItem, length: Number(e.target.value) })
              }
              name="length"
              type="number"
              value={workItem.length === 0 ? "" : workItem.length.toString()}
              required
              placeholder="Profondeur (cm)"
            />
          )}
        </div>
        <div className={s.checkTextForm}>
          <label className="checkboxLabel">
            <input
              onChange={(e) =>
                setWorkItem({ ...workItem, isToSell: e.target.checked })
              }
              name="isToSell"
              type="checkbox"
              defaultChecked={workItem.isToSell}
            />
            À vendre
          </label>
          {workItem.isToSell && (
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
              placeholder="Prix (facultatif)"
            />
          )}
        </div>
        <textarea
          onChange={(e) =>
            setWorkItem({ ...workItem, description: e.target.value })
          }
          name="description"
          rows={3}
          value={workItem.description}
          placeholder="Description (facultative)"
        />
        <div className={s.checkTextForm}>
          <label className="checkboxLabel">
            <input
              onChange={(e) =>
                setWorkItem({ ...workItem, isOut: e.target.checked })
              }
              name="isOut"
              type="checkbox"
              defaultChecked={workItem.isOut}
            />
            Sortie
          </label>
          {workItem.isOut && (
            <textarea
              onChange={(e) =>
                setWorkItem({ ...workItem, outInformation: e.target.value })
              }
              name="outInformation"
              rows={3}
              value={workItem.outInformation}
              placeholder="Information de sortie (facultative)"
            />
          )}
        </div>
      </div>
      <div className={s.imagesContainer}>
        <PreviewPart
          filenames={workItem.images.map((i: Image) => i.filename)}
          pathImage={`/images/${item.type}`}
          onDelete={handleDeleteFile}
          title={isSculpture ? "Une photo minimum :" : "Une seule photo :"}
        />
        <ImageInputPart
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
  );
}
