"use client";

import { useActionState } from "react";
import s from "./AuthStatus.module.css";
import { loginAction } from "@/app/actions/auth";

const initialState = { message: "" };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className={s.loginForm}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <p className={s.errorMessage}>{state?.message}</p>
      <button disabled={isPending} type="submit" className="adminButton">
        Login
      </button>
    </form>
  );
}
