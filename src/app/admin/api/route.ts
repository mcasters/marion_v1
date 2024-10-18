import { getSession } from "@/app/lib/auth/lib";

export async function GET() {
  // User authentication and role verification
  const session = await getSession();

  // Check if the user is authenticated
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Check if the user has the 'admin' role
  if (session.user.role !== "admin") {
    return Response.json({ message: "No permission" }, { status: 403 });
    // right
    // permissions
  }

  // Data fetching for authorized users
}
