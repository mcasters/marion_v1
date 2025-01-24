"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Images from "@/components/admin/form/imageForm/Images";
import { PostFull } from "@/lib/db/item";
import s from "@/styles/admin/Admin.module.css";
import { getEmptyPost, getMainImage } from "@/utils/commonUtils";
import Preview from "@/components/admin/form/imageForm/Preview";
import CancelButton from "@/components/admin/form/CancelButton";
import SubmitButton from "@/components/admin/form/SubmitButton";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  post: PostFull;
  toggleModal?: () => void;
}

export default function PostForm({ post, toggleModal }: Props) {
  const isUpdate = post.id !== 0;
  const formRef = useRef<HTMLFormElement>(null);
  const resetMainImageRef = useRef<number>(0);
  const resetImagesRef = useRef<number>(0);
  const router = useRouter();
  const alert = useAlert();
  const api = isUpdate ? `api/post/update` : `api/post/add`;

  const [workPost, setWorkPost] = useState<PostFull>(post);
  const [date, setDate] = useState<string>(
    new Date(post.date).getFullYear().toString(),
  );
  const [mainFilenameToDelete, setMainFilenameToDelete] = useState<string>("");
  const [filenamesToDelete, setFilenamesToDelete] = useState<string[]>([]);
  const mainImage = getMainImage(post);

  const reset = () => {
    if (toggleModal) toggleModal();
    else {
      setWorkPost(getEmptyPost());
      setDate("");
      resetMainImageRef.current = resetMainImageRef.current + 1;
      resetImagesRef.current = resetImagesRef.current + 1;
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          reset();
          alert(isUpdate ? "Post modifié" : "Post ajouté", false);
          router.refresh();
        } else alert("Erreur à l'enregistrement", true);
      });
    }
  };

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>{isUpdate ? "Modifier un post" : "Ajouter un post"}</h2>
      <form ref={formRef} onSubmit={submit}>
        {isUpdate && <input type="hidden" name="id" value={post.id} />}
        {isUpdate && (
          <input
            type="hidden"
            name="mainFilenameToDelete"
            value={mainFilenameToDelete}
          />
        )}
        {isUpdate && (
          <input
            type="hidden"
            name="filenamesToDelete"
            value={filenamesToDelete}
          />
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
