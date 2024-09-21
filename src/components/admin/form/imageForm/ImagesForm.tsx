"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { FileUploaderButton } from "@/components/admin/form/imageForm/FileUploaderButton";
import s from "@/styles/admin/Admin.module.css";
import toast from "react-hot-toast";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";

type Props = {
  isMultiple: boolean;
  api: string;
  label: string;
  title?: string;
};

export default function ImagesForm({ isMultiple, api, label, title }: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [toUpdate, setToUpdate] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFiles = (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const files = Array.from(filesUploaded);

      const newFiles: string[] = [];
      files.forEach((file) => {
        newFiles.push(URL.createObjectURL(file));
      });
      setNewImages(newFiles);
      setToUpdate(true);
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok) {
          toast.success("Contenu modifié");
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={submit}>
      <input type="hidden" name="label" value={label} />
      <h4 className={s.imageTitle}>
        {title !== undefined ? title : isMultiple ? "Images :" : "Image :"}
      </h4>
      <FileUploaderButton
        name={isMultiple ? "files" : "file"}
        handleFiles={handleFiles}
        isMultiple={isMultiple}
      />
      <div>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.imageWrapper}>
              <Image
                unoptimized={true}
                src={src}
                width={150}
                height={150}
                alt="Nouvelle image de l'item"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
      </div>
      {toUpdate && (
        <>
          <SubmitButton />
          <CancelButton />
        </>
      )}
    </form>
  );
}
