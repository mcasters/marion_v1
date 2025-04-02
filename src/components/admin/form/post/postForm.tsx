"use client";

import React, { useActionState, useEffect, useState } from "react";

import AddImages from "@/components/admin/form/image/addImages";
import { Image, PostFull, Type } from "@/lib/type";
import s from "@/components/admin/admin.module.css";
import CancelButton from "@/components/admin/form/cancelButton";
import SubmitButton from "@/components/admin/form/submitButton";
import { useAlert } from "@/app/context/alertProvider";
import Preview from "@/components/admin/form/image/preview";

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
        <div className={s.imagesContainer}>
          <Preview
            filenames={post.images.map((i) => {
              if (i.isMain) return i.filename;
            })}
            pathImage={`/images/${Type.POST}`}
            onDelete={(filename) => {
              const images = workPost.images.filter(
                (i: Image) => i.filename !== filename,
              );
              setWorkPost({ ...workPost, images });
              setMainFilenameToDelete(filename);
            }}
          />
          <AddImages
            isMultiple={false}
            acceptSmallImage={true}
            info="Image principale (facultative)"
          />
        </div>
        <div className={s.imagesContainer}>
          <Preview
            filenames={
              post.images.map((i) => {
                if (!i.isMain) return i.filename;
              }) || []
            }
            pathImage={`/images/${Type.POST}`}
            onDelete={(filename) => {
              const images = workPost.images.filter(
                (i: Image) => i.filename !== filename,
              );
              setWorkPost({ ...workPost, images });
              setFilenamesToDelete([...filenamesToDelete, filename]);
            }}
          />
          <AddImages
            isMultiple={true}
            acceptSmallImage={true}
            info="Album d'images (facultatif)"
          />
          <AddImages
            type={Type.POST}
            isMultiple={true}
            acceptSmallImage={true}
            onDelete={(filename) =>
              setFilenamesToDelete([...filenamesToDelete, filename])
            }
            images={post.images.filter((i) => !i.isMain) || []}
            info="Album d'images (facultatif)"
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
