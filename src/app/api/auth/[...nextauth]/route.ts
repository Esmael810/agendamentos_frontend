import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Codigo de acesso",
      credentials: {
        code: { label: "Codigo de acesso", type: "text" },
      },
      async authorize(credentials) {
        const code = credentials?.code;

        const response = await fetch(
          "http://localhost:5281/api/v1/collaborator/identify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ IdentificationCode: code }),
          },
        );

        //console.log("Status da Resposta da API:", response.status);

        if (!response.ok) {
          return null;
        }
        const data = await response.json();

        //console.log("Dados recebidos da API:", data);

        const user = {
          id: Number(data.collaboratorId),
          name: data.collaboratorName,
          isFirstLogin: data.isFirstLogin,
        };
        //console.log("Usuário retornado pelo autorize:", user);

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      //console.log("Token dentro do session kallback:", token);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.isFirstLogin = user.isFirstLogin
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.name = token.name as string;
       session.user.isFirstLogin = token.isFirstLogin as boolean;
      return session;
    },
  },

  pages: {
    signIn: "/access-code",
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
