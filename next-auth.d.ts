import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      username: string;
      description: string | null;
      email: string;
      password: string;
      image: string | null;
      emailVerified: Date | null;
      location: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    firstName: string;
    lastName: string;
    username: string;
    description: string | null;
    email: string;
    password: string;
    image: string | null;
    emailVerified: Date | null;
    location: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    image: string | undefined;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
