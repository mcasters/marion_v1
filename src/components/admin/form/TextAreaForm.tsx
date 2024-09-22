"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "@prisma/client";
import s from "@/styles/admin/Admin.module.css";
import Images from "@/components/admin/form/imageForm/Images";
import Preview from "@/components/admin/form/imageForm/Preview";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { Image } from "@/lib/db/item";

interface Props {
  label: Label;
  textContent: string;
  api: string;
  textLabel?: string;
  images?: Image[];
}
export default function TextAreaForm({
  label,
  textContent,
  api,
  textLabel,
  images = undefined,
}: Props) {
  const [text, setText] = useState<string>(textContent);
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resetImageRef = useRef<number>(0);

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
          resetImageRef.current = resetImageRef.current + 1;
          setTimeout(function () {
            window.location.reload();
          }, 1500);
          setIsChanged(false);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        {images && (
          <div>
            <Preview
              images={images}
              pathImage="/images/miscellaneous"
              apiForDelete="api/content/delete-image"
            />
            <Images
              onAdd={(count) => setIsChanged(count === 1)}
              isMultiple={false}
              title="Image de présentation (facultative)"
              reset={resetImageRef.current}
            />
          </div>
        )}
        <input type="hidden" name="label" value={label} />
        <label className={s.formLabel}>
          {textLabel}
          <textarea
            name="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsChanged(true);
            }}
          />
        </label>
        <SubmitButton disabled={!isChanged} />
        <CancelButton disabled={!isChanged} />
      </form>
    </div>
  );
}