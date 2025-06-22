"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { Category, Image, Type, workFull } from "@/lib/type";
import { useAlert } from "@/app/context/alertProvider";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { createItem, updateItem } from "@/app/actions/item-post/admin";
import Preview from "@/components/admin/form/image/preview";
import { constraintImage } from "@/components/admin/form/formUtils";

interface Props {
  item: workFull;
  toggleModal: () => void;
  categories?: Category[];
}

export default function ItemForm({ item, toggleModal, categories }: Props) {
  const isUpdate = item.id !== 0;
  const isSculpture = item.type === Type.SCULPTURE;
  const alert = useAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  const [workItem, setWorkItem] = useState<workFull>(item);
  const [date, setDate] = useState<string>(
    new Date(item.date).getFullYear().toString(),
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [smallImageSelected, setSmallImageSelected] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!isSculpture && item.images.length > 0 && resizedFiles.length > 0) {
      setFilenamesToDelete([item.images[0].filename]);
    }
  }, [resizedFiles]);

  const handleFiles = async () => {
    const fileList = inputRef.current?.files;
    if (fileList && fileList.length > 0) {
      if (!isSculpture) {
        setResizedFiles([]);
        setPreviewImages([]);
      }

      const files = Array.from(fileList);
      let error = false;
      let weight = 0;

      for (const file of files) {
        weight += file.size;
        if (weight > 30000000) {
          error = true;
          alert(
            "La taille totale des fichiers excède la limite de sécurité (30 MB).\nAjouter moins de fichier à la fois.",
            true,
            5000,
          );
          break;
        }
        const bmp = await createImageBitmap(file);
        const { width } = bmp;
        if (!smallImageSelected && width < 2000) {
          error = true;
          alert(
            `Dimension de l'image trop petite. Largeur minimum : 2000 pixels`,
            true,
            5000,
          );
          bmp.close();
          break;
        }

        const resizedFile = await constraintImage(file);
        setResizedFiles((prevState) => [...prevState, resizedFile]);
        setPreviewImages((prevState) => [
          ...prevState,
          URL.createObjectURL(resizedFile),
        ]);
      }

      if (error) {
        setResizedFiles([]);
        setPreviewImages([]);
        setSmallImageSelected(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    resizedFiles.forEach((file) => formData.append("files", file));
    const { message, isError } = isUpdate
      ? await updateItem(null, formData)
      : await createItem(null, formData);
    alert(message, isError);
    toggleModal();
  };

  return (
    <div className={s.modalContainer}>
      <h2 className={s.modalTitle}>
        {`${isUpdate ? "Modifier" : "Ajouter"} ${item.type === Type.DRAWING ? "un" : "une"} ${item.type}`}
      </h2>
      <form onSubmit={onSubmit}>
        <input type="hidden" name="type" value={item.type} />
        <input type="hidden" name="blob" value={resizedFiles.toString()} />
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
          <Preview
            filenames={workItem.images.map((i: Image) => i.filename)}
            pathImage={`/images/${item.type}`}
            onDelete={(filename) => {
              const images = workItem.images.filter(
                (i: Image) => i.filename !== filename,
              );
              setWorkItem({ ...workItem, images });
              setFilenamesToDelete([...filenamesToDelete, filename]);
            }}
            title={isSculpture ? "Une photo minimum :" : "Une seule photo :"}
          />
          <div className={s.imageInputContainer}>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFiles}
              multiple={isSculpture}
              accept="image/png, image/jpeg"
            />
            <label className={s.checkLabel}>
              <input
                type="checkbox"
                checked={smallImageSelected}
                onChange={() => setSmallImageSelected(!smallImageSelected)}
                className={s.checkInput}
              />
              Accepter les images sous 2000 px de large
            </label>
          </div>
          <div className={s.previewAddContainer}>
            {previewImages.length > 0 && (
              <Preview filenames={previewImages} pathImage={""} />
            )}
          </div>
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
