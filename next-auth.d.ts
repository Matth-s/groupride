import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      username: string;
      description?: string;
      email: string;
      password: string;
      image?: string;
      emailVerified?: Date; // 'date' should be 'Date'
      location?: string;
    } & DefaultSession['user'];
  }

  interface User {
    firstName: string;
    lastName: string;
    username: string;
    description?: string;
    email: string;
    password: string;
    image?: string;
    emailVerified?: Date;
    location?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    picture?: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
