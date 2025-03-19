"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "@/styles/admin/admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAlert } from "@/app/context/AlertProvider";
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
  const [state, action] = useActionState(updateContent, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      setIsChanged(false);
    }
  }, [state]);

  return (
    <div className={s.container}>
      <form action={action}>
        <input type="hidden" name="label" value={label} />
        <label className={s.formLabel}>
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
    </div>
  );
}
