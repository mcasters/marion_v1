"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";

import Images from "@/components/admin/form/imageForm/Images";
import { PostFull } from "@/lib/model";
import s from "@/styles/admin/Admin.module.css";
import { getEmptyPost, getMainImage } from "@/utils/commonUtils";
import Preview from "@/components/admin/form/imageForm/Preview";
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
  const resetMainImageRef = useRef<number>(0);
  const resetImagesRef = useRef<number>(0);
  const alert = useAlert();

  const [workPost, setWorkPost] = useState<PostFull>(post);
  const [date, setDate] = useState<string>(
    new Date(post.date).getFullYear().toString(),
  );
  const [mainFilenameToDelete, setMainFilenameToDelete] = useState<string>("");
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const mainImage = getMainImage(post);
  const [state, action] = useActionState(
    isUpdate ? updatePost : createPost,
    null,
  );

  const reset = () => {
    if (toggleModal) toggleModal();
    else {
      setWorkPost(getEmptyPost());
      setDate("");
      resetMainImageRef.current = resetMainImageRef.current + 1;
      resetImagesRef.current = resetImagesRef.current + 1;
    }
  };

  useEffect(() => {
    if (state) {
      if (!state.isError) reset();
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>{isUpdate ? "Modifier un post" : "Ajouter un post"}</h2>
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
            autoFocus
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
            rows={5}
            value={workPost.text}
          />
        </label>
        <div className={s.imageFormContainer}>
          <h3>Image principale (facultative)</h3>
          {isUpdate && (
            <Preview
              images={post.images.filter((i) => i.isMain) || []}
              pathImage="/images/post"
              onDelete={(filename) => setMainFilenameToDelete(filename)}
            />
          )}
        </div>
        <Images
          isMultiple={false}
          reset={resetMainImageRef.current}
          smallImage={true}
        />
        <div className={s.imageFormContainer}>
          <h3>Album d&apos;images (facultatif)</h3>
          {isUpdate && (
            <Preview
              images={post.images.filter((i) => !i.isMain) || []}
              pathImage="/images/post"
              onDelete={(filename) =>
                setFilenamesToDelete([...filenamesToDelete, filename])
              }
            />
          )}
          <Images
            isMultiple={true}
            reset={resetImagesRef.current}
            smallImage={true}
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton disabled={!workPost.title || !date} />
          <CancelButton onCancel={reset} />
        </div>
      </form>
    </div>
  );
}
