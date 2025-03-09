"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAlert } from "@/app/context/AlertProvider";
import { updateMeta } from "@/app/actions/meta/admin";
import { ItemLayout } from "@/lib/type";

type Props = {
  layout: ItemLayout;
};

export default function ItemLayoutForm({ layout }: Props) {
  const [isChanged, setIsChanged] = useState(false);
  const [value, setValue] = useState(layout.toString());
  const alert = useAlert();
  const [state, action] = useActionState(updateMeta, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      setIsChanged(false);
    }
  }, [state]);

  const handleChange = ({ currentTarget: { value } }) => {
    setValue(value);
    setIsChanged(true);
  };

  return (
    <div className={s.container}>
      <h2 className={s.title2}>Mise en page</h2>
      <form action={action}>
        <input type="hidden" name="label" value="itemLayout" />
        <div className={s.layoutInputContainer}>
          <label className={s.radioLabel}>
            <input
              onChange={handleChange}
              type="radio"
              name="text"
              value="0"
              checked={value === "0"}
              className={s.radioInput}
            />
            Une image dans la largeur
          </label>
          <label className={s.radioLabel}>
            <input
              onChange={handleChange}
              type="radio"
              name="text"
              value="1"
              checked={value === "1"}
              className={s.radioInput}
            />
            Deux images dans la largeur (Par défaut)
          </label>
          <label className={s.radioLabel}>
            <input
              onChange={handleChange}
              type="radio"
              name="text"
              value={"2"}
              checked={value === "2"}
              className={s.radioInput}
            />
            Galerie : plusieurs images dans la largeur
          </label>
        </div>
        <SubmitButton disabled={!isChanged} />
        <CancelButton disabled={!isChanged} />
      </form>
    </div>
  );
}
