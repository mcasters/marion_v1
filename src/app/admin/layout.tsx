import AdminLayout from "@/components/layout/admin/AdminLayout";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/specific/metaHtml";
import { getSession } from "@/app/lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.ADMIN,
  description: DESCRIPTION.ADMIN,
};

export default async function layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (session) {
    return <AdminLayout>{children}</AdminLayout>;
  } else {
    redirect("/login");
  }
}
