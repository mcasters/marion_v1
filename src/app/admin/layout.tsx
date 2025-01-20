import React from "react";

import AdminLayout from "@/components/layout/admin/AdminLayout";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/specific/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.ADMIN,
  description: DESCRIPTION.ADMIN,
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
