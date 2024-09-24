"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";

interface Props {
  label: string;
  api: string;
  textContent: string;
  textLabel?: string;
  isPhone?: boolean;
  isEmail?: boolean;
}
export default function InputForm({
  label,
  api,
  textContent,
  textLabel,
  isPhone = false,
  isEmail = false,
}: Props) {
  const [text, setText] = useState<string>(textContent);
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok) {
          toast.success("Enregistré");
          setIsChanged(false);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        <label className={s.formLabel}>
          {textLabel}
          <input
            placeholder={label}
            name="text"
            type={isPhone ? "tel" : isEmail ? "email" : "text"}
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
