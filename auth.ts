// // app/auth.ts
// import type { NextAuthConfig } from "next-auth";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextResponse } from "next/server";

// export const config = {
//   pages: {
//     signIn: "/sign-in",
//     error: "/sign-in",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { type: "email" },
//         password: { type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         try {
//           const res = await fetch(`${process.env.NEXTAUTH_URL}/api/prisma/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(credentials),
//           });

//           if (!res.ok) return null;

//           const user = await res.json();
//           return user;
//         } catch (error) {
//           console.error("Login error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }:any) {
//       if (token?.id) {
//         session.user = {
//           id: token.id,
//           name: token.name,
//           role: token.role,
//         };
//       }
//       return session;
//     },
//     async jwt({ token, user, trigger, session }:any) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.role = user.role;
//       }

//       if (trigger === "update" && session?.user?.name) {
//         await fetch(`${process.env.NEXTAUTH_URL}/api/prisma/update-user`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: token.id, name: session.user.name }),
//         });

//         token.name = session.user.name;
//       }

//       return token;
//     },
//     authorized({ request, auth }) {
//       const protectedPaths = [
//         /\/shipping-address/, /\/payment-method/, /\/place-order/,
//         /\/profile/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin/,
//       ];

//       const { pathname } = request.nextUrl;
//       if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

//       if (!request.cookies.get("sessionCartId")) {
//         return fetch(`${process.env.NEXTAUTH_URL}/api/prisma/cart-session`)
//           .then((res) => res.json())
//           .then(({ sessionCartId }) => {
//             const response = NextResponse.next();
//             response.cookies.set("sessionCartId", sessionCartId);
//             return response;
//           });
//       }

//       return true;
//     },
//   },
// } satisfies NextAuthConfig;

// export const { handlers, auth, signIn, signOut } = NextAuth(config);

// // Force Node.js runtime for Prisma & cookies
// export const runtime = "edge";



// app/auth.ts
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

// ✅ Helper to safely get base URL in Edge environment
function getBaseUrl(request?: { headers: Headers }) {
  if (request?.headers) {
    const host = request.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
  }

  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const baseUrl = getBaseUrl(req);

        try {
          const res = await fetch(`${baseUrl}/api/prisma/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) return null;

          const user = await res.json();
          return user;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (token?.id) {
        session.user = {
          id: token.id,
          name: token.name,
          role: token.role,
        };
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }

      if (trigger === "update" && session?.user?.name) {
        try {
          const baseUrl = getBaseUrl(); // No request object here, so fallback to env or localhost
          await fetch(`${baseUrl}/api/prisma/update-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: token.id, name: session.user.name }),
          });
          token.name = session.user.name;
        } catch (error) {
          console.error("JWT update-user error:", error);
        }
      }

      return token;
    },
    async authorized({ request, auth }) {
      const protectedPaths = [
        /\/shipping-address/, /\/payment-method/, /\/place-order/,
        /\/profile/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin/,
      ];

      const { pathname } = request.nextUrl;
      const isProtected = protectedPaths.some((p) => p.test(pathname));

      if (isProtected && !auth) return false;

      // ✅ Set sessionCartId if not already present
      if (!request.cookies.get("sessionCartId")) {
        try {
          const baseUrl = getBaseUrl(request);
          const res = await fetch(`${baseUrl}/api/prisma/cart-session`);
          const { sessionCartId } = await res.json();

          const response = NextResponse.next();
          response.cookies.set("sessionCartId", sessionCartId);
          return response;
        } catch (error) {
          console.error("Cart session error:", error);
          return false;
        }
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// ✅ Keep using Edge for middleware support
export const runtime = "edge";
