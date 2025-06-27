"use client";

import React from "react";
import DeleteIcon from "@/components/icons/deleteIcon";
import s from "@/components/admin/admin.module.css";
import DeleteButton from "@/components/admin/form/deleteButton";
import Image from "next/image";

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
          <div key={filename} className={s.imageWrapper}>
            <Image
              src={pathImage === "" ? filename : `${pathImage}/sm/${filename}`}
              width={150}
              height={150}
              alt="Image de l'item"
              unoptimized={true}
              style={{
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onDelete) {
                  onDelete(filename);
                }
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
