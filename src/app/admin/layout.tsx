import AdminLayout from "@/components/layout/admin/AdminLayout";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/specific/metaHtml";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.ADMIN,
  description: DESCRIPTION.ADMIN,
};

export default async function layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
