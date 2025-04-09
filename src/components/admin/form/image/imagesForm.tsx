"use client";

import React, { useActionState, useEffect, useState } from "react";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import AddImages from "@/components/admin/form/image/addImages";
import { useAlert } from "@/app/context/alertProvider";
import {
  deleteImageContent,
  updateImageContent,
} from "@/app/actions/contents/admin";
import s from "@/components/admin/admin.module.css";
import { Image } from "@/lib/type";
import Preview from "@/components/admin/form/image/preview";
import { Label } from "@prisma/client";

type Props = {
  images: Image[];
  isMultiple: boolean;
  label: Label;
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
  const [state, action] = useActionState(updateImageContent, undefined);
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
      <Preview
        filenames={images.map((i) => i.filename)}
        pathImage="/images/miscellaneous"
        deleteAction={(filename) => deleteImageContent(filename)}
      />
      <form action={action}>
        <input type="hidden" name="label" value={label} />
        <input type="hidden" name="isMain" value={isMain?.toString()} />
        <AddImages
          isMultiple={isMultiple}
          acceptSmallImage={acceptSmallImage}
          resetFlag={reset}
          info={title}
        />
        <div className={s.buttonSection}>
          <SubmitButton />
          <CancelButton onCancel={handleReset} />
        </div>
      </form>
    </>
  );
}
