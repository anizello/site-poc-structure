import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserService } from "@/services/user";
import jwt from "jsonwebtoken";

import { URLs } from "@/constants/urls";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "external-user",
      name: "cerberus",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const payload = {
          username: credentials.email,
          password: credentials.password,
        };

        const LOGIN_URL = `${URLs.EXTERNAL.CERBERUS.BASE}${URLs.EXTERNAL.CERBERUS.ENDPOINTS.LOGIN}`;

        const response = await fetch(LOGIN_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "*",
          },
        });

        const user = await response.json();

        if (!user.token) {
          throw new Error("Unauthorized");
        }

        if (response.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,

  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      const decodedToken = jwt.decode(token.accessToken);

      const userInfo = await UserService.getInstance().getUserInfo(
        token.accessToken,
        decodedToken.username,
      );

      return {
        ...session,
        accessToken: token.accessToken,
        expires: new Date(decodedToken.exp * 1000).toLocaleString("pt-BR"),
        user: {
          id: !!userInfo.id ? userInfo.id : -1,
          email: decodedToken.username,
          roles: decodedToken.roles || [],
        },
      };
    },
  },
};

export default NextAuth(authOptions);
