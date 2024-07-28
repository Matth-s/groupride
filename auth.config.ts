import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { signinSchema } from './schema/signin-schema';
import { getUserByEmail } from './data/user';
import bcrypt from 'bcryptjs';

import { CredentialsSignin } from '@auth/core/errors';

class InvalidCredentialsError extends CredentialsSignin {
  code = 'Invalid Credentials';
}

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = signinSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new InvalidCredentialsError();
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
