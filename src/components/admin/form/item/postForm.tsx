"use client";

import React, { FormEvent, useRef, useState } from "react";
import { Image, PostFull, Type } from "@/lib/type";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import Preview from "@/components/admin/form/image/preview";
import { constraintImage } from "@/components/admin/form/formUtils";
import { createItem, updateItem } from "@/app/actions/item-post/admin";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";

interface Props {
  post: PostFull;
  toggleModal: () => void;
}

export default function PostForm({ post, toggleModal }: Props) {
  const isUpdate = post.id !== 0;
  const alert = useAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);

  const [workPost, setWorkPost] = useState<PostFull>(post);
  const [date, setDate] = useState<string>(
    new Date(post.date).getFullYear().toString(),
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);

  const [isSmallMainImage, setIsSmallMainImage] = useState<boolean>(false);
  const [previewMainImages, setPreviewMainImages] = useState<string[]>([]);
  const [resizedMainFiles, setResizedMainFiles] = useState<File[]>([]);

  const [isSmallImage, setIsSmallImage] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);

  const handleFiles = async (isMain: boolean) => {
    const fileList = isMain
      ? mainInputRef.current?.files
      : inputRef.current?.files;
    if (fileList && fileList.length > 0) {
      if (isMain) {
        setResizedMainFiles([]);
        setPreviewMainImages([]);
        const fileToDelete = workPost.images.filter((i) => i.isMain)[0];
        if (fileToDelete) handleDelete(fileToDelete.filename);
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
        if (
          (!isMain && !isSmallImage && width < 2000) ||
          (isMain && !isSmallMainImage && width < 2000)
        ) {
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
        if (isMain) {
          setResizedMainFiles((prevState) => [...prevState, resizedFile]);
          setPreviewMainImages((prevState) => [
            ...prevState,
            URL.createObjectURL(resizedFile),
          ]);
        } else {
          setResizedFiles((prevState) => [...prevState, resizedFile]);
          setPreviewImages((prevState) => [
            ...prevState,
            URL.createObjectURL(resizedFile),
          ]);
        }
      }

      if (error && isMain) {
        setResizedMainFiles([]);
        setPreviewMainImages([]);
        setIsSmallMainImage(false);
        if (mainInputRef.current) mainInputRef.current.value = "";
      } else if (error && !isMain) {
        setResizedFiles([]);
        setPreviewImages([]);
        setIsSmallImage(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    }
  };

  const handleDelete = (filename: string) => {
    const images = workPost.images.filter(
      (i: Image) => i.filename !== filename,
    );
    setWorkPost({ ...workPost, images });
    setFilenamesToDelete([...filenamesToDelete, filename]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("mainFile", resizedMainFiles[0]);
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
        {isUpdate ? "Modifier un post" : "Ajouter un post"}
      </h2>
      <form onSubmit={onSubmit}>
        <input type="hidden" name="type" value={Type.POST} />
        {isUpdate && (
          <>
            <input type="hidden" name="id" value={post.id} />
            <input
              type="hidden"
              name="filenamesToDelete"
              value={filenamesToDelete}
            />
          </>
        )}
        <label className={s.formLabel}>
          Titre
          <input
            onChange={(e) =>
              setWorkPost({ ...workPost, title: e.target.value })
            }
            name="title"
            type="text"
            value={workPost.title}
            required
          />
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
          Texte (facultatif)
          <textarea
            onChange={(e) => setWorkPost({ ...workPost, text: e.target.value })}
            name="text"
            rows={7}
            value={workPost.text}
          />
        </label>
        <div className={s.imagesContainer}>
          <Preview
            filenames={workPost.images
              .filter((i) => i.isMain)
              .map((i) => i.filename)}
            pathImage={`/images/${Type.POST}`}
            onDelete={(filename) => handleDelete(filename)}
            title="Image principale (facultative)"
          />
          <div className={s.imageInputContainer}>
            <input
              type="file"
              ref={mainInputRef}
              onChange={() => handleFiles(true)}
              multiple={false}
              accept="image/png, image/jpeg"
            />
            <label className={s.checkLabel}>
              <input
                type="checkbox"
                checked={isSmallImage}
                onChange={() => setIsSmallImage(!isSmallImage)}
                className={s.checkInput}
              />
              Accepter les images sous 2000 px de large
            </label>
          </div>
          <div className={s.previewAddContainer}>
            {previewMainImages.length > 0 && (
              <Preview filenames={previewMainImages} pathImage={""} />
            )}
          </div>
        </div>

        <div className={s.imagesContainer}>
          <Preview
            filenames={workPost.images
              .filter((i) => !i.isMain)
              .map((i) => i.filename)}
            pathImage={`/images/${Type.POST}`}
            onDelete={(filename) => handleDelete(filename)}
            title="Album d'images (facultatif)"
          />
          <div className={s.imageInputContainer}>
            <input
              type="file"
              ref={inputRef}
              onChange={() => handleFiles(false)}
              multiple={true}
              accept="image/png, image/jpeg"
            />
            <label className={s.checkLabel}>
              <input
                type="checkbox"
                checked={isSmallImage}
                onChange={() => setIsSmallImage(!isSmallImage)}
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
          <SubmitButton disabled={!workPost.title || !date} />
          <CancelButton onCancel={toggleModal} />
        </div>
      </form>
    </div>
  );
}
