import { getMetaMap } from "@/utils/commonUtils";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { getMetas } from "@/app/actions/meta";
import MetaComponent from "@/components/admin/meta/metaComponent";

export default async function Contact() {
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Gestion des métadonnées</h1>
      <MetaComponent metas={metas} />
    </>
  );
}
