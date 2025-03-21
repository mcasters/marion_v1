"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import Preview from "@/components/admin/form/image/preview";
import { Image as IImage, Type } from "@/lib/type";

interface Props {
  type: Type | null;
  isMultiple: boolean;
  smallImage: boolean;
  resetFlag?: number;
  onNewImages?: (arg0: string[]) => void;
  onDelete?: (filename: string) => void;
  images?: IImage[];
  title?: string;
}

export default function Images({
  type,
  resetFlag,
  isMultiple,
  smallImage,
  onNewImages,
  onDelete,
  images,
  title,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [acceptSmallImage, setAcceptSmallImage] = useState<boolean>(false);
  const alert = useAlert();

  useEffect(() => {
    setNewImages([]);
    setAcceptSmallImage(false);
    if (inputRef.current) inputRef.current.value = "";
  }, [resetFlag]);

  const handleFiles = async () => {
    if (
      !inputRef.current ||
      !inputRef.current.files ||
      inputRef.current.files.length === 0
    )
      return;
    const filesUploaded = inputRef.current.files;
    if (filesUploaded.length > 0) {
      const files = Array.from(filesUploaded);
      const newFiles: string[] = [];
      let error = false;
      let weight = 0;

      for await (const file of files) {
        weight += file.size;
        if (weight > 30000000) {
          error = true;
          alert(
            "La taille totale des fichiers excède la limite de sécurité (30 MB).\nAjouter moins de fichier à la fois.",
            true,
            5000,
          );
          break;
        }

        const bmp = await createImageBitmap(file);
        const { width } = bmp;
        if (!acceptSmallImage && width < 2000) {
          error = true;
          alert(
            `Dimension de l'image trop petite. Largeur minimum : 2000 pixels`,
            true,
            5000,
          );
          bmp.close();
          break;
        }
        newFiles.push(URL.createObjectURL(file));
        bmp.close();
      }

      if (!error && newFiles.length > 0) {
        setNewImages(newFiles);
        if (onNewImages) onNewImages(newFiles);
      } else {
        setNewImages([]);
        setAcceptSmallImage(false);
        inputRef.current.value = "";
        if (onNewImages) onNewImages([]);
      }
    }
  };

  return (
    <>
      {title && <label className={s.formLabel}>{title}</label>}
      {images && onDelete && type && (
        <Preview
          images={images}
          pathImage={`/images/${type}`}
          onDelete={onDelete}
        />
      )}
      <div className={s.imageInputContainer}>
        <input
          type="file"
          name={isMultiple ? "files" : "file"}
          onChange={handleFiles}
          ref={inputRef}
          multiple={isMultiple}
        />
        {smallImage && (
          <label htmlFor="small-image" className={s.radioLabel}>
            <input
              type="radio"
              id="small-image"
              name="small-image"
              checked={acceptSmallImage}
              onClick={() => setAcceptSmallImage(!acceptSmallImage)}
              onChange={handleFiles}
              className={s.radioInput}
            />
            Accepter les images sous 2000 px de large
          </label>
        )}
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
    </>
  );
}
