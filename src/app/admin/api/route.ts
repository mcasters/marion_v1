import { getSession } from "@/app/lib/auth/lib";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!session.user.isAdmin) {
    return Response.json({ message: "No permission" }, { status: 403 });
  }
}
