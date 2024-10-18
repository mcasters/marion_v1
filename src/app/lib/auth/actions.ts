"use server";

import { login, logout } from "@/app/lib/auth/lib";
import { redirect } from "next/navigation";

export async function loginAction(prevState: unknown, formData: FormData) {
  try {
    await login("credentials", formData);
  } catch (error) {
    if (error) {
      return error.message;
    }
  }
  redirect("/admin");
}

export async function logoutAction() {
  try {
    await logout();
  } catch (error) {
    if (error) {
      return error.message;
    }
  }
  redirect("/");
}

// export async function serverAction() {
//   const session = await getSession();
//   const isAdmin = session?.user?.isAdmin;
//
//   // Check if user is authorized to perform the action
//   if (!isAdmin) {
//     throw new Error(
//       "Unauthorized access: User does not have admin privileges.",
//     );
//   }
//
//   // Proceed with the action for authorized users
//   // ... implementation of the action
// }
