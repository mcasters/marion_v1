"use client";

import { Photo } from "@/lib/type";
import React from "react";

interface Props {
  photo: Photo;
}
export default function LimitedImageInfos({ photo }: Props) {
  return (
    <>
      <span>{photo.title}</span> - {new Date(photo.date).getFullYear()}
    </>
  );
}
