import { getMetaMap } from "@/utils/commonUtils";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { getMetas } from "@/app/actions/meta";
import { SEO } from "@/constants/specific";
import MetaForm from "@/components/admin/form/metaForm";

export default async function Contact() {
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Gestion des métadonnées</h1>
      {Object.entries(SEO).map(([key, value]) => {
        const separate =
          value.startsWith("Description") || value.startsWith("Mots");
        return (
          <div key={key}>
            <MetaForm
              textContent={metas.get(key) || ""}
              label={key}
              textLabel={value}
            />
            {separate ? (
              <span>
                <br />
                <br />
                ***
              </span>
            ) : undefined}
          </div>
        );
      })}
    </>
  );
}
