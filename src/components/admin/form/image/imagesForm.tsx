"use client";

import React, { useState } from "react";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { useAlert } from "@/app/context/alertProvider";
import {
  deleteImageContent,
  updateImageContent,
} from "@/app/actions/contents/admin";
import s from "@/components/admin/admin.module.css";
import { Image } from "@/lib/type";
import PreviewPart from "@/components/admin/form/image/previewPart.tsx";
import { Label } from "../../../../../prisma/generated/client";
import ImageInputPart from "@/components/admin/form/image/imageInputPart.tsx";

type Props = {
  images: Image[];
  isMultiple: boolean;
  label: Label;
  acceptSmallImage: boolean;
  title: string;
  isMain?: boolean;
};

export default function ImagesForm({
  images,
  isMultiple,
  label,
  acceptSmallImage,
  title,
  isMain = false,
}: Props) {
  const alert = useAlert();
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);
  const [reset, setReset] = useState<number>(0);

  const submit = async (formData: FormData) => {
    resizedFiles.forEach((file) => formData.append("files", file));
    const { message, isError } = await updateImageContent(null, formData);
    alert(message, isError);
    setResizedFiles([]);
    setReset((prevState) => prevState + 1);
  };

  return (
    <>
      <label className={s.label}>{title}</label>
      <PreviewPart
        filenames={images.map((i) => i.filename)}
        pathImage="/images/miscellaneous"
        deleteAction={(filename) => deleteImageContent(filename)}
      />
      <form action={submit}>
        <input type="hidden" name="label" value={label} />
        <input type="hidden" name="isMain" value={isMain?.toString()} />
        <ImageInputPart
          key={reset}
          isMultiple={isMultiple}
          acceptSmallImage={acceptSmallImage}
          setResizedFiles={setResizedFiles}
        />
        <div className={s.buttonSection}>
          <SubmitButton />
          <CancelButton
            onCancel={() => setReset((prevState) => prevState + 1)}
          />
        </div>
      </form>
    </>
  );
}
