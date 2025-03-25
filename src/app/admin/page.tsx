import AdminHome from "@/components/admin/adminHome";
import { getMessages } from "@/app/actions/messages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
  keywords: "",
  openGraph: null,
};

export default async function Page() {
  const messages = await getMessages();

  return <AdminHome messages={messages} />;
}
