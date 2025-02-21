"use client";

import React, { useActionState, useEffect, useRef } from "react";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import Images from "@/components/admin/form/imageForm/Images";
import { useAlert } from "@/app/context/AlertProvider";
import { updateContent } from "@/app/actions/contents/admin";
import { Label } from "@prisma/client";
import PreviewForm from "@/components/admin/form/imageForm/PreviewForm";
import { Image } from "@/lib/type";
import s from "@/styles/admin/Admin.module.css";

type Props = {
  images: Image[];
  isMultiple: boolean;
  label: string;
  smallImage: boolean;
  title?: string;
  isMain?: boolean;
};

export default function ImagesForm({
  images,
  isMultiple,
  label,
  smallImage,
  title,
  isMain = false,
}: Props) {
  const alert = useAlert();
  const resetImageRef = useRef<number>(0);
  const [state, action] = useActionState(updateContent, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      if (!state.isError) resetImageRef.current = resetImageRef.current + 1;
    }
  }, [state]);

  return (
    <>
      {title && <label className={s.formLabel}>{title}</label>}
      <PreviewForm images={images} contentLabel={Label.SLIDER} />
      <form action={action}>
        <input type="hidden" name="label" value={label} />
        <input type="hidden" name="isMain" value={isMain?.toString()} />
        <Images
          isMultiple={isMultiple}
          smallImage={smallImage}
          reset={resetImageRef.current}
        />
        <>
          <SubmitButton />
          <CancelButton />
        </>
      </form>
    </>
  );
}
