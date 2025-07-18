"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import SubmitButton from "@/components/admin/form/submitButton";
import CancelButton from "@/components/admin/form/cancelButton";
import { useAlert } from "@/app/context/alertProvider";
import { updateContent } from "@/app/actions/contents/admin";

interface Props {
  label: string;
  textContent: string;
  textLabel?: string;
  isPhone?: boolean;
  isEmail?: boolean;
}
export default function InputForm({
  label,
  textContent,
  textLabel,
  isPhone = false,
  isEmail = false,
}: Props) {
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
        <input
          placeholder={label}
          name="text"
          type={isPhone ? "tel" : isEmail ? "email" : "text"}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsChanged(true);
          }}
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
