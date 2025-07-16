"use client";

import React, { Fragment } from "react";
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
      <Fragment key={key}>
        <MetaForm
          content={metas.get(key) || ""}
          label={value}
          dbLabel={key}
          isTextArea={key.startsWith("description") || key === "keywords"}
        />
        {separate && (
          <span>
            <br />
            <br />
            ***
          </span>
        )}
      </Fragment>
    );
  });
}
