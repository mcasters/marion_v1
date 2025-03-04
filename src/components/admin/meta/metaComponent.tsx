"use client";

import React from "react";
import { SEO } from "@/constants/specific";
import MetaForm from "@/components/admin/form/metaForm";

interface Props {
  metas: Map<string, string>;
}
export default function MetaComponent({ metas }: Props) {
  return Object.entries(SEO).map(([key, value]) => {
    console.log("key : ", key);
    console.log("value : ", value);
    const separate =
      value.startsWith("Description") || value.startsWith("Mots clés");
    return (
      <>
        <MetaForm
          textContent={metas.get(key) || ""}
          textLabel={value}
          label={key}
          isTextArea={
            key.startsWith("description") || key.startsWith("keywords")
          }
        />
        {separate ? (
          <span>
            <br />
            <br />
            ***
          </span>
        ) : undefined}
      </>
    );
  });
}
