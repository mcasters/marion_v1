"use client";

import React, { useRef, useState } from "react";
import { Label } from "@prisma/client";
import s from "@/styles/admin/Admin.module.css";
import Images from "@/components/admin/form/imageForm/Images";
import Preview from "@/components/admin/form/imageForm/Preview";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { Image } from "@/lib/db/item";
import { useAlert } from "@/app/context/AlertProvider";

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
  const alert = useAlert();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok) {
          alert("Contenu modifié");
          resetImageRef.current = resetImageRef.current + 1;
          setTimeout(function () {
            window.location.reload();
          }, 1500);
          setIsChanged(false);
        } else alert("Erreur à l'enregistrement", true);
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
              onChange={(count) => setIsChanged(count === 1)}
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
