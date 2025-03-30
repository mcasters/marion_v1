"use client";

import React, { useActionState, useEffect, useState } from "react";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import Images from "@/components/admin/form/image/images";
import { useAlert } from "@/app/context/alertProvider";
import { updateContent } from "@/app/actions/contents/admin";
import { Label } from "@prisma/client";
import PreviewForm from "@/components/admin/form/image/previewForm";
import { Image } from "@/lib/type";

type Props = {
  images: Image[];
  isMultiple: boolean;
  label: string;
  acceptSmallImage: boolean;
  title?: string;
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
  const [state, action] = useActionState(updateContent, null);
  const [reset, setReset] = useState(0);

  const handleReset = () => setReset(reset + 1);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      if (!state.isError) handleReset();
    }
  }, [state]);

  return (
    <>
      <PreviewForm images={images} contentLabel={Label.SLIDER} />
      <form action={action}>
        <input type="hidden" name="label" value={label} />
        <input type="hidden" name="isMain" value={isMain?.toString()} />
        <Images
          type={null}
          isMultiple={isMultiple}
          acceptSmallImage={acceptSmallImage}
          resetFlag={reset}
          info={title}
        />
        <>
          <SubmitButton />
          <CancelButton onCancel={handleReset} />
        </>
      </form>
    </>
  );
}
