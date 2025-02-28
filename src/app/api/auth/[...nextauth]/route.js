import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/services/prisma"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // console.log("Attempting to log in with:", credentials);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // console.log("Fetched user:", user);

        if (user && credentials.password === user.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.username,
              role: user.role,
            };
        }
        throw new Error('Invalid Email or Password!');  
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

