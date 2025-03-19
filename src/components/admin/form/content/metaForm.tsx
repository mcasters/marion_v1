"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAlert } from "@/app/context/AlertProvider";
import { updateMeta } from "@/app/actions/meta/admin";

interface Props {
  textContent: string;
  label: string;
  textLabel: string;
  isTextArea: boolean;
}
export default function MetaForm({
  textContent,
  label,
  textLabel,
  isTextArea,
}: Props) {
  const [text, setText] = useState<string>(textContent);
  const [isChanged, setIsChanged] = useState(false);
  const alert = useAlert();
  const [state, action] = useActionState(updateMeta, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      setIsChanged(false);
    }
  }, [state]);

  return (
    <>
      <form action={action} className={s.metaForm}>
        <input type="hidden" name="label" value={label} />
        <label className={s.formLabel}>
          {textLabel}
          {isTextArea ? (
            <textarea
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setIsChanged(true);
              }}
              rows={3}
            />
          ) : (
            <input
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setIsChanged(true);
              }}
            />
          )}
        </label>
        <SubmitButton disabled={!isChanged} />
        <CancelButton disabled={!isChanged} />
      </form>
    </>
  );
}
