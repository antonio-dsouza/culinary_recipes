import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials, req) {
        const response = await fetch('http://localhost:3333/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const user = await response.json();

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.user = user;
      }
  
      const isTokenExpired =
        token &&
        token.exp &&
        typeof token.exp === 'number' &&
        token.exp < Math.floor(Date.now() / 1000);
  
      if (isTokenExpired) {
        return Promise.resolve({});
      }
  
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    }
  }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };