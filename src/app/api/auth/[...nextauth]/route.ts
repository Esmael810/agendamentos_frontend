
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOption: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Codigo de acesso",
            credentials: {
                code: { label: "Codigo de acesso", type: "text" }
            },
            async authorize(credentials) {
                const code = credentials?.code;

                const response = await fetch("http://localhost:5281/api/v1/collaborator/identify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ IdentificationCode: code }),
                });
                
                console.log("Status da Resposta da API 5281:", response.status);

                if (!response.ok) {
                   
                    return null;
                }
                const data = await response.json();

                const user = {
                    id: data.CollaboratorId,
                    name: data.CollaboratorName,
                };
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/access-code",
    },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };






