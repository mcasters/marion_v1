import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return !!token;
      }
    },
  },
});
