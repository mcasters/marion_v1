"use client";

import React, { useRef, useState } from "react";
import { Label } from "@prisma/client";
import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  label: Label;
  textContent: string;
  api: string;
  textLabel?: string;
}
export default function TextAreaForm({
  label,
  textContent,
  api,
  textLabel,
}: Props) {
  const [text, setText] = useState<string>(textContent);
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
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
          alert("Contenu modifié", false);
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
