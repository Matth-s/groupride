'use server';

import { getVerificationTokenByToken } from '@/data/token';
import { getUserByEmail } from '@/data/user';
import prisma from '@/libs/prisma';

export const newVerification = async (token: string) => {
  if (!token) {
    return {
      error: 'Token manquant',
    };
  }

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Ce token n'existe pas",
    };
  }

  const hasExpired = new Date(existingToken.expire) < new Date();

  if (hasExpired) {
    return {
      error: 'Le token à expiré',
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "L'utilisateur n'existe pas",
    };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: 'Email vérifié',
  };
};
