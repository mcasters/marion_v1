"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Label } from "@prisma/client";
import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAlert } from "@/app/context/AlertProvider";
import { updateContent } from "@/app/actions/contents/admin";

interface Props {
  label: Label;
  textContent: string;
  textLabel?: string;
}
export default function TextAreaForm({ label, textContent, textLabel }: Props) {
  const [text, setText] = useState<string>(textContent);
  const [isChanged, setIsChanged] = useState(false);
  const alert = useAlert();
  const [state, action] = useActionState(updateContent, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      setIsChanged(false);
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="label" value={label} />
      <label className={s.formLabel}>
        {textLabel}
        <textarea
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsChanged(true);
          }}
        />
      </label>
      <SubmitButton disabled={!isChanged} />
      <CancelButton disabled={!isChanged} />
    </form>
  );
}
