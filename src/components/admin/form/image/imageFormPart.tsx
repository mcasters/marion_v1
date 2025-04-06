"use client";

import React from "react";
import s from "@/components/admin/admin.module.css";
import { Type } from "@/lib/type";
import AddImages from "@/components/admin/form/image/addImages";
import Preview from "@/components/admin/form/image/preview";

interface Props {
  filenames: string[];
  type: Type;
  isMultiple: boolean;
  acceptSmallImage: boolean;
  onDelete: (filename: string) => void;
  onAdd?: (filenames: string[]) => void;
  title: string;
}

export default function ImageFormPart({
  filenames,
  type,
  isMultiple,
  acceptSmallImage,
  onDelete,
  onAdd,
  title,
}: Props) {
  return (
    <div className={s.imagesContainer}>
      <Preview
        filenames={filenames}
        pathImage={`/images/${type}`}
        onDelete={onDelete}
        title={title}
      />
      <AddImages
        isMultiple={isMultiple}
        acceptSmallImage={acceptSmallImage}
        onNewImages={onAdd ? onAdd : undefined}
      />
    </div>
  );
}
