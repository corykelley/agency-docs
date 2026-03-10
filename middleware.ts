import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: ["/features/create/:path*", "/sites/:slug/features/create/:path*"],
};
