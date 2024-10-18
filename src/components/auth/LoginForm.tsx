"use client";

// TODO When react 14 (useActionForm)
// import { useActionState } from "react";
// import { loginAction } from "@/app/lib/auth/actions";
//
// export default function LoginForm() {
//   const [message, login, isPending] = useActionState(loginAction, null);
//
//   return (
//     <form action={login}>
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       {isPending ? "Loading..." : message}
//       <button disabled={isPending} type="submit">
//         Login
//       </button>
//     </form>
//   );
// }

import { useFormState } from "react-dom";
import { loginAction } from "@/app/lib/auth/actions";
import s from "./auth.module.css";

export default function LoginForm() {
  const [errorMessage, login] = useFormState(loginAction, null);

  return (
    <form action={login} className={s.loginForm}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <button className="adminButton" type="submit">
        Login
      </button>
    </form>
  );
}
