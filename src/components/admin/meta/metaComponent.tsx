"use client";

import React from "react";
import MetaForm from "@/components/admin/form/content/metaForm";
import { META, SEO } from "@/constants/admin";

interface Props {
  metas: Map<string, string>;
}
export default function MetaComponent({ metas }: Props) {
  const isM = metas.get(META.SITE_TITLE)?.startsWith("M");

  return Object.entries(SEO).map(([key, value]) => {
    const separate = key.startsWith("description") || key === "keywords";

    if (!isM && (key.endsWith("Drawing") || key.endsWith("DrawingHome")))
      return;
    return (
      <div key={key}>
        <MetaForm
          textContent={metas.get(key) || ""}
          textLabel={value}
          label={key}
          isTextArea={key.startsWith("description") || key === "keywords"}
        />
        {separate && (
          <span>
            <br />
            <br />
            ***
          </span>
        )}
      </div>
    );
  });
}
