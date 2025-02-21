"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "@/styles/admin/Admin.module.css";
import { useAlert } from "@/app/context/AlertProvider";
import Preview from "@/components/admin/form/imageForm/Preview";
import { ItemFull } from "@/lib/type";

interface Props {
  reset: number;
  isMultiple: boolean;
  smallImage: boolean;
  onNewImages?: (arg0: string[]) => void;
  onDelete?: (filename: string) => void;
  item?: ItemFull;
  title?: string;
}

export default function Images({
  reset,
  isMultiple,
  smallImage,
  onNewImages,
  onDelete,
  item,
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
  }, [reset]);

  const handleFiles = async () => {
    if (
      !onNewImages ||
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
        if (weight > 20000000) {
          error = true;
          alert(
            "La taille totale des fichiers excède la limite de sécurité (20 MB).\nAjouter moins de fichier à la fois",
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
            `La dimension de l'image ${file.name} est trop petite. Largeur minimum : 2000 pixels`,
            true,
          );
          bmp.close();
          break;
        }
        newFiles.push(URL.createObjectURL(file));
        bmp.close();
      }

      if (!error && newFiles.length > 0) {
        setNewImages(newFiles);
        onNewImages(newFiles);
      } else {
        setNewImages([]);
        setAcceptSmallImage(false);
        inputRef.current.value = "";
        onNewImages([]);
      }
    }
  };

  return (
    <>
      {title && <label className={s.formLabel}>{title}</label>}
      {item && onDelete && (
        <Preview
          images={item.images}
          pathImage={`/images/${item.type}`}
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
          className={s.inputButton}
        />
        {smallImage && (
          <label htmlFor="small-image" className={s.radioLabel}>
            <input
              type={"radio"}
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
