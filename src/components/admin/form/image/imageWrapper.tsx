"use client";

import React from "react";
import Image from "next/image";
import s from "@/components/admin/admin.module.css";

interface Props {
  src: string;
  alt: string;
}

export default function ImageWrapper({ src, alt }: Props) {
  return (
    <div key={src} className={s.imageWrapper}>
      <Image
        src={src}
        width={150}
        height={150}
        alt={alt}
        unoptimized={true}
        style={{
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}
