"use client";

import { Photo } from "@/lib/type";
import React from "react";

interface Props {
  photo: Photo;
}
export default function LimitedImageInfos({ photo }: Props) {
  return (
    <div>
      {photo.title} - {new Date(photo.date).getFullYear()}
    </div>
  );
}
