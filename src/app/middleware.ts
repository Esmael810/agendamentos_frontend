import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/access-code",
  },
});

export const configure = {
  matcher: ["/calendar/:path*"],
};
