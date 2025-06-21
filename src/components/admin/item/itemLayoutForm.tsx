"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import { updateMeta } from "@/app/actions/meta/admin";
import { Type } from "@/lib/type";
import Image from "next/image";
import { getItemLayout } from "@/utils/commonUtils";
import { useMetas } from "@/app/context/metaProvider";

type Props = {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
};

export default function ItemLayoutForm({ type }: Props) {
  const metas = useMetas();
  const alert = useAlert();
  const [itemLayout, itemDarkBackground] = getItemLayout(metas, type);
  const [layout, setLayout] = useState<string>(itemLayout.toString());
  const [darkBackground, setDarkBackground] = useState<boolean>(
    itemDarkBackground === 1,
  );
  const [state, action] = useActionState(updateMeta, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
    }
  }, [state]);

  return (
    <div className={s.container}>
      <h2 className={s.title2}>Mise en page</h2>
      <form action={action}>
        <input
          type="hidden"
          name="label"
          value={
            type === Type.PAINTING
              ? "paintingLayout"
              : type === Type.SCULPTURE
                ? "sculptureLayout"
                : "drawingLayout"
          }
        />
        <input type="hidden" name="layout" value={layout} />
        <input
          type="hidden"
          name="darkBackground"
          value={darkBackground ? "1" : "0"}
        />
        {(type === Type.PAINTING || type === Type.DRAWING) && (
          <>
            <label className={s.layoutLabel}>
              <button
                onClick={() => setLayout("0")}
                className={
                  layout === "0"
                    ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                    : s.buttonLayout
                }
              >
                <Image
                  src="/assets/mono-layout.png"
                  alt=""
                  width={200}
                  height={130}
                  unoptimized
                />
              </button>
              <p>
                <strong>{`Une seule image dans la largeur :`}</strong>
                <br />
                {`Les œuvres se suivent, leur description est à côté.`}
              </p>
            </label>
            <label className={s.layoutLabel}>
              <button
                onClick={() => setLayout("1")}
                className={
                  layout === "1"
                    ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                    : s.buttonLayout
                }
              >
                <Image
                  src="/assets/double-layout.png"
                  alt=""
                  width={200}
                  height={130}
                  unoptimized
                />
              </button>
              <p>
                <strong>{`Deux images dans la largeur :`}</strong>
                <br />
                {`Les œuvres sont individualisées, leur description est en
                dessous.`}
              </p>
            </label>
          </>
        )}
        {type === Type.SCULPTURE && (
          <label className={s.layoutLabel}>
            <button
              onClick={() => setLayout("3")}
              className={
                layout === "3"
                  ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                  : s.buttonLayout
              }
            >
              <Image
                src="/assets/sculpture-layout.png"
                alt=""
                width={200}
                height={130}
                unoptimized
              />
            </button>
            <p>
              <strong>{`Images de la sculpture groupées :`}</strong>
              <br />
              {`Les sculptures sont individualisées, leur description est en
              dessous.`}
            </p>
          </label>
        )}
        <label className={s.layoutLabel}>
          <button
            onClick={() => setLayout("2")}
            className={
              layout === "2"
                ? `${s.buttonLayoutSelected} ${s.buttonLayout}`
                : s.buttonLayout
            }
          >
            <Image
              src="/assets/gallery-layout.png"
              alt=""
              width={200}
              height={130}
              unoptimized
            />
          </button>
          <p>
            <strong>{`Galerie : toutes les images s'imbriquent :`}</strong>
            <br />
            {`Vision d'ensemble, toutes les œuvres sont ensemble, et leur description n'apparait que lorsqu'on pointe la souris, ou dans la "lightbox" (lorsqu'on ouvre l'image en grand).`}
          </p>
        </label>
        <br />
        <br />
        <label className={s.checkLabel}>
          <button
            onClick={() => setDarkBackground(!darkBackground)}
            className={
              darkBackground
                ? `${s.buttonLayoutSelected} ${s.buttonDarkBackground}`
                : `${s.buttonDarkBackground}`
            }
          />
          <strong>Zone plus foncée derrière les œuvres</strong>
        </label>
      </form>
    </div>
  );
}
