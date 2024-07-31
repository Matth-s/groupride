import NextAuth, { User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import prisma from './libs/prisma';
import type { Adapter } from '@auth/core/adapters';
import { getUserById } from './data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: '/authentification/connexion',
    newUser: '/authentification/inscription',
    verifyRequest: '/authentification/nouvelle-verification',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (token.sub && session) {
        session.user.id = token.sub;
      }

      return session;
    },

    async signIn({ user }) {
      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    authorized: ({ auth }) => {
      return Boolean(auth);
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
