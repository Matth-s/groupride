'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/libs/email';
import { generateVerificationToken } from '@/libs/token';
import { signinSchema } from '@/schema/signin-schema';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { URL } from '@/routes';

export const signin = async (
  values: z.infer<typeof signinSchema>
) => {
  const validatedFields = signinSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Champ du formulaire invalide',
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: 'Email ou mot de passe invalide',
    };
  }

  if (!existingUser.emailVerified) {
    try {
      const verificationToken = await generateVerificationToken(
        email
      );

      await sendVerificationEmail({
        email: verificationToken.email,
        token: verificationToken.token,
      });

      return {
        success: 'Email de vérification envoyé',
      };
    } catch (error) {
      return {
        error: 'Une erreur est survenue veuillez ressayer',
      };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: URL,
    });

    return {
      success: 'Vous êtes connectez',
    };
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email ou mot de passe invalide' };
        default: {
          return {
            error: 'Une erreur est survenue veuillez ressayer',
          };
        }
      }
    }
    throw error;
  }
};
