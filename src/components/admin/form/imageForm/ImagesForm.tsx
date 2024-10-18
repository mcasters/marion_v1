"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import Images from "@/components/admin/form/imageForm/Images";

type Props = {
  isMultiple: boolean;
  api: string;
  label: string;
  title?: string;
  isMain?: boolean;
};

export default function ImagesForm({
  isMultiple,
  api,
  label,
  title,
  isMain = false,
}: Props) {
  const [toUpdate, setToUpdate] = useState(0);
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
      <input type="hidden" name="isMain" value={isMain?.toString()} />
      <Images isMultiple={isMultiple} title={title} onChange={setToUpdate} />
      {toUpdate > 0 && (
        <>
          <SubmitButton />
          <CancelButton />
        </>
      )}
    </form>
  );
}
