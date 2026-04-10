import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth is used ONLY for Google OAuth sign-in.
 * The app still uses the existing `token` JWT cookie for middleware + APIs.
 *
 * After Google sign-in succeeds, the UI should redirect to `/api/auth/bridge`
 * which will create/link the user in Mongo and issue the app's `token` cookie.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",  
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {  
        token.googleSub =
          (profile as any)?.sub ?? (profile as any)?.id ?? token.googleSub;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).googleSub = (token as any).googleSub;
      return session;
    },
  },
};

