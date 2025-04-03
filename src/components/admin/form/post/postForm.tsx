"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Image, PostFull, Type } from "@/lib/type";
import s from "@/components/admin/admin.module.css";
import CancelButton from "@/components/admin/form/cancelButton";
import SubmitButton from "@/components/admin/form/submitButton";
import { useAlert } from "@/app/context/alertProvider";
import ImageFormPart from "@/components/admin/form/item/imageFormPart";

interface Props {
  post: PostFull;
  formAction: (
    prevState: { message: string; isError: boolean } | null,
    formData: FormData,
  ) => Promise<{ isError: boolean; message: string }>;
  toggleModal: () => void;
}

export default function PostForm({ post, formAction, toggleModal }: Props) {
  const isUpdate = post.id !== 0;
  const alert = useAlert();

  const [workPost, setWorkPost] = useState<PostFull>(post);
  const [date, setDate] = useState<string>(
    new Date(post.date).getFullYear().toString(),
  );
  const [mainFilenameToDelete, setMainFilenameToDelete] = useState<string>("");
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [state, action] = useActionState(formAction, null);

  useEffect(() => {
    if (state) {
      if (!state.isError) toggleModal();
      alert(state.message, state.isError);
    }
  }, [state]);

  const handleOnDelete = (filename: string, isMain: boolean) => {
    const images = workPost.images.filter(
      (i: Image) => i.filename !== filename,
    );
    setWorkPost({ ...workPost, images });
    if (isMain) setMainFilenameToDelete(filename);
    else setFilenamesToDelete([...filenamesToDelete, filename]);
  };

  return (
    <div className={s.modalContainer}>
      <h2 className={s.modalTitle}>
        {isUpdate ? "Modifier un post" : "Ajouter un post"}
      </h2>
      <form action={action}>
        {isUpdate && (
          <>
            <input type="hidden" name="id" value={post.id} />
            <input
              type="hidden"
              name="mainFilenameToDelete"
              value={mainFilenameToDelete}
            />
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
        <ImageFormPart
          filenames={workPost.images
            .filter((i) => i.isMain)
            .map((i) => i.filename)}
          type={Type.POST}
          isMultiple={false}
          acceptSmallImage={true}
          onDelete={(filename) => handleOnDelete(filename, true)}
          title="Image principale (facultative)"
        />
        <br />
        <ImageFormPart
          filenames={workPost.images
            .filter((i) => !i.isMain)
            .map((i) => i.filename)}
          type={Type.POST}
          isMultiple={true}
          acceptSmallImage={true}
          onDelete={(filename) => handleOnDelete(filename, false)}
          title="Album d'images (facultatif)"
        />
        <div className={s.buttonSection}>
          <SubmitButton disabled={!workPost.title || !date} />
          <CancelButton onCancel={toggleModal} />
        </div>
      </form>
    </div>
  );
}
