"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Label } from "@prisma/client";
import s from "@/components/admin/admin.module.css";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { useAlert } from "@/app/context/alertProvider";
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
  const [state, action] = useActionState(updateContent, undefined);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      setIsChanged(false);
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="label" value={label} />
      <label className={s.label}>
        {textLabel}
        <textarea
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsChanged(true);
          }}
          rows={7}
        />
      </label>
      <SubmitButton disabled={!isChanged} />
      <CancelButton
        disabled={!isChanged}
        onCancel={() => setText(textContent)}
      />
    </form>
  );
}
