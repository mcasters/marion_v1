"use client";

import React, { useActionState, useEffect, useState } from "react";

import Images from "@/components/admin/form/image/Images";
import { PostFull, Type } from "@/lib/type";
import s from "@/components/admin/admin.module.css";
import { getEmptyPost } from "@/utils/commonUtils";
import CancelButton from "@/components/admin/form/CancelButton";
import SubmitButton from "@/components/admin/form/SubmitButton";
import { useAlert } from "@/app/context/AlertProvider";
import { createPost, updatePost } from "@/app/actions/posts/admin";

interface Props {
  post: PostFull;
  toggleModal?: () => void;
}

export default function PostForm({ post, toggleModal }: Props) {
  const isUpdate = post.id !== 0;
  const alert = useAlert();

  const [reset, setReset] = useState(0);
  const [workPost, setWorkPost] = useState<PostFull>(post);
  const [date, setDate] = useState<string>(
    new Date(post.date).getFullYear().toString(),
  );
  const [mainFilenameToDelete, setMainFilenameToDelete] = useState<string>("");
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const [state, action] = useActionState(
    isUpdate ? updatePost : createPost,
    null,
  );

  const handleReset = () => {
    if (toggleModal) toggleModal();
    else {
      setWorkPost(getEmptyPost());
      setDate("");
      setReset(reset + 1);
    }
  };

  useEffect(() => {
    if (state) {
      if (!state.isError) handleReset();
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={isUpdate ? s.modalContainer : s.container}>
      <h2 className={isUpdate ? s.modalTitle : s.title2}>
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
          <Images
            type={Type.POST}
            resetFlag={reset}
            smallImage={true}
            isMultiple={false}
            images={post.images.filter((i) => i.isMain) || []}
            onDelete={(filename) => setMainFilenameToDelete(filename)}
            title="Image principale (facultative)"
          />
        </div>
        <div className={s.imagesContainer}>
          <Images
            type={Type.POST}
            resetFlag={reset}
            smallImage={true}
            isMultiple={true}
            images={post.images.filter((i) => !i.isMain) || []}
            onDelete={(filename) =>
              setFilenamesToDelete([...filenamesToDelete, filename])
            }
            title="Album d'images (facultatif)"
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton disabled={!workPost.title || !date} />
          <CancelButton onCancel={handleReset} />
        </div>
      </form>
    </div>
  );
}
