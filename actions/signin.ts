'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/libs/email';
import { generateVerificationToken } from '@/libs/token';
import { signinSchema } from '@/schema/signin-schema';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { DEFAULT_REDIRECT } from '@/routes';

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
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return {
      success: 'Email de vérification envoyé',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_REDIRECT,
    });

    return {
      success: 'Vous êtes connectez',
    };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email ou mot de passe invalide' };
        default: {
          return { error: 'Une erreur est survenue' };
        }
      }
    }
    throw error;
  }
};
