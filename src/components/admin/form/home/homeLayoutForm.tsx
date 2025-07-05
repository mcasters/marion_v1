"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import { updateMeta } from "@/app/actions/meta/admin";
import Image from "next/image";
import { useMetas } from "@/app/context/metaProvider";
import { getHomeLayout } from "@/utils/commonUtils";

export default function HomeLayoutForm() {
  const metas = useMetas();
  const alert = useAlert();
  const [value, setValue] = useState<string>(getHomeLayout(metas).toString());
  const [state, action] = useActionState(updateMeta, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={s.layoutContainer}>
      <h2 className={s.title2}>Mise en page</h2>
      <form action={action}>
        <input type="hidden" name="label" value={"homeLayout"} />
        <input type="hidden" name="text" value={value} />

        <label className={s.layoutLabel}>
          <button
            onClick={(e) => setValue(e.currentTarget.value)}
            className={
              value === "1"
                ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                : s.buttonLayout
            }
            value="1"
          >
            <Image
              src="/assets/home-nav-layout.png"
              alt=""
              width={200}
              height={130}
              unoptimized
            />
          </button>
          <p>
            <strong>{`Texte séparé :`}</strong>
            <br />
            {`Le titre du site, les menus, et l'introduction sont situés au dessus de l'image.`}
          </p>
        </label>
        <label className={s.layoutLabel}>
          <button
            onClick={(e) => setValue(e.currentTarget.value)}
            className={
              value === "0"
                ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                : s.buttonLayout
            }
            value="0"
          >
            <Image
              src="/assets/home-plain-layout.png"
              alt=""
              width={200}
              height={130}
              unoptimized
            />
          </button>
          <p>
            <strong>{`Texte intégré :`}</strong>
            <br />
            {`Le titre du site, les menus, et l'introduction sont situés sur l'image qui prend tout l'écran. Leur couleur doit alors être accordée avec l'image pour qu'ils restent lisibles : Mettre une seule image est sans doute plus simple.`}
          </p>
        </label>
      </form>
    </div>
  );
}
