'use server';

import { z } from 'zod';
import { signupSchema } from '@/schema/signup-schema';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/libs/token';
import { sendVerificationEmail } from '@/libs/email';

import bcrypt from 'bcryptjs';
import prisma from '@/libs/prisma';

export const registerUser = async (
  values: z.infer<typeof signupSchema>
) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Formulaire invalide',
    };
  }

  const { email, password, confirmPassword, ...rest } =
    validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: 'Cet email est déjà utilisé',
    };
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const userData = {
    email,
    password: hashPassword,
    ...rest,
  };

  try {
    await prisma.user.create({
      data: {
        ...userData,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return {
      success: "L'email de confirmation vous a été envoyé",
    };
  } catch (error) {
    return {
      error: 'Une erreur est survenue veuillez réessayer',
    };
  }
};
