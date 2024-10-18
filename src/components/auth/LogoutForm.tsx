"use client";

// TODO When react 14 (useActionForm)
// import { useActionState } from "react";
// import { logoutAction } from "@/app/lib/auth/actions";
//
// export default function LogoutForm() {
//   const [message, logout] = useActionState(logoutAction, null);
//
//   return (
//     <form onSubmit={logout}>
//       <button type="submit">
//         Logout
//       </button>
//     </form>
//   );
// }
import { useFormState } from "react-dom";
import { logoutAction } from "@/app/lib/auth/actions";
import s from "./auth.module.css";

export default function LogoutForm() {
  const [errorMessage, logout] = useFormState(logoutAction, null);

  return (
    <form action={logout} className={s.logoutForm}>
      <button className="buttonLink" type="submit">
        Admin out
      </button>
    </form>
  );
}
