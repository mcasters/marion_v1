"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Image, PostFull, Type } from "@/lib/type";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import Preview from "@/components/admin/form/image/preview";
import { createItem, updateItem } from "@/app/actions/item-post/admin";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import ImageInput from "@/components/admin/form/image/imageInput";

interface Props {
  post: PostFull;
  toggleModal: () => void;
}

export default function PostForm({ post, toggleModal }: Props) {
  const isUpdate = post.id !== 0;
  const alert = useAlert();

  const [workPost, setWorkPost] = useState<PostFull>(post);
  const [date, setDate] = useState<string>(
    new Date(post.date).getFullYear().toString(),
  );
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [resizedMainFiles, setResizedMainFiles] = useState<File[]>([]);
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);

  useEffect(() => {
    const mainFilename = workPost.images
      .filter((i) => i.isMain)
      .map((i) => i.filename)[0];
    if (mainFilename && resizedMainFiles.length > 0) {
      handleDelete(mainFilename);
    }
  }, [resizedMainFiles]);

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
    if (!isError) toggleModal();
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
          <ImageInput
            isMultiple={false}
            acceptSmallImage={true}
            setResizedFiles={setResizedMainFiles}
          />
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
          <ImageInput
            isMultiple={true}
            acceptSmallImage={true}
            setResizedFiles={setResizedFiles}
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton disabled={!workPost.title || !date} />
          <CancelButton onCancel={toggleModal} />
        </div>
      </form>
    </div>
  );
}
