"use client";

import React from "react";
import DeleteIcon from "@/components/icons/deleteIcon";
import ImageWrapper from "@/components/admin/form/image/imageWrapper";
import s from "@/components/admin/admin.module.css";
import DeleteButton from "@/components/admin/form/deleteButton";

type Props = {
  filenames: string[];
  pathImage: string;
  onDelete?: (filename: string) => void;
  deleteAction?: (
    filename: string,
  ) => Promise<{ isError: boolean; message: string }>;
  title?: string;
};

export default function Preview({
  filenames,
  pathImage,
  onDelete,
  deleteAction,
  title,
}: Props) {
  return (
    <>
      {title && <label className={s.formLabel}>{title}</label>}
      {filenames.map((filename) => (
        <div key={filename} className={s.previewContainer}>
          <ImageWrapper
            src={pathImage === "" ? filename : `${pathImage}/sm/${filename}`}
            alt="Image de l'item"
          />
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(filename);
              }}
              className="iconButton"
              aria-label="Supprimer"
            >
              <DeleteIcon />
            </button>
          )}
          {deleteAction && (
            <DeleteButton action={() => deleteAction(filename)} />
          )}
        </div>
      ))}
    </>
  );
}
