"use client";

import React, { useActionState, useEffect } from "react";
import Image from "next/image";
import s from "@/styles/admin/Admin.module.css";
import { Image as IImage } from "@/lib/model";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";
import { Label } from "@prisma/client";
import { deleteContentImage } from "@/app/actions/contents/admin";

type Props = {
  images: IImage[];
  contentLabel: Label;
};

export default function PreviewForm({ images, contentLabel }: Props) {
  const alert = useAlert();
  const [state, action] = useActionState(deleteContentImage, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <>
      {images.map((image) => (
        <form action={action} key={image.filename} className={s.imageWrapper}>
          <input type="hidden" name="label" value={contentLabel} />
          <input type="hidden" name="filename" value={image.filename} />
          <div>
            <Image
              loader={({ src }) => {
                return `/images/miscellaneous/sm/${src}`;
              }}
              src={`${image.filename}`}
              width={150}
              height={150}
              alt="Image de l'item"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <button type="submit" className="iconButton" aria-label="Supprimer">
            <DeleteIcon />
          </button>
        </form>
      ))}
    </>
  );
}
