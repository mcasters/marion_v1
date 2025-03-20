"use client";

import { useActionState } from "react";
import s from "./authentication.module.css";
import { loginAction } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, {
    message: "",
  });

  return (
    <form action={formAction} className={s.loginForm}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <p className={s.errorMessage}>{state?.message}</p>
      <button type="submit" className="adminButton">
        Login
      </button>
    </form>
  );
}
