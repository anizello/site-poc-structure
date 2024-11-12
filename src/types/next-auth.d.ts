import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      email: string;
      roles: string[];
      id: number;
    } & DefaultSession["user"];
  }
}
