"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "@/styles/admin/Admin.module.css";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  hasImage?: (arg0: boolean) => void;
  reset?: number;
  isMultiple: boolean;
  minWidth?: boolean;
  title?: string;
}

export default function Images({
  hasImage,
  reset,
  isMultiple,
  minWidth = true,
  title,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [acceptSmallImage, setAcceptSmallImage] = useState<boolean>(!minWidth);

  const alert = useAlert();

  useEffect(() => {
    if (reset !== undefined) {
      setNewImages([]);
      setAcceptSmallImage(false);
      inputRef.current.value = "";
    }
  }, [reset]);

  const handleFiles = async () => {
    const filesUploaded = inputRef.current.files;
    if (filesUploaded?.length > 0) {
      const files = Array.from(filesUploaded);
      const newFiles: string[] = [];
      let error = false;

      for await (const file of files) {
        const bmp = await createImageBitmap(file);
        const { width } = bmp;
        if (!acceptSmallImage && width < 2000) {
          alert(
            `La dimension de l'image ${file.name} est trop petite. Largeur minimum : 2000 pixels`,
            true,
          );
          bmp.close();
          error = true;
        } else {
          newFiles.push(URL.createObjectURL(file));
          bmp.close();
        }
      }
      if (!error && newFiles.length > 0) {
        setNewImages(newFiles);
        if (hasImage !== undefined) hasImage(true);
      } else {
        setNewImages([]);
        setAcceptSmallImage(false);
        inputRef.current.value = "";
        if (hasImage !== undefined) hasImage(false);
      }
    }
  };

  return (
    <div className={s.fileUploaderContainer}>
      <p className={s.imageTitle}>{title}</p>
      <div>
        <input
          type="file"
          name={isMultiple ? "files" : "file"}
          onChange={handleFiles}
          ref={inputRef}
          multiple={isMultiple}
          className={s.inputButton}
        />
      </div>
      <div>
        <input
          type={"radio"}
          id="small-image"
          name="small-image"
          checked={acceptSmallImage}
          onChange={(event) => setAcceptSmallImage(event.target.checked)}
          className={s.radioInput}
        />
        <label htmlFor="small-image" className={s.radioLabel}>
          Accepter des images en dessous de 2000 px de large
        </label>
      </div>
      <div>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.imageWrapper}>
              <Image
                unoptimized={true}
                src={src}
                width={150}
                height={150}
                alt="Nouvelle image"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
