import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      isFirstLogin?: boolean;
    };
  }

  interface User {
    id: number;
    name: string;
    isFirstLogin?: boolean; 
  }
}

declare module "next-auth/jwt" { 
  interface JWT {
    id: number | string;
    isFirstLogin?: boolean;
  }
}