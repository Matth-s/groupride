import prisma from '@/libs/prisma';

export async function getVerificationTokenByEmail(email: string) {
  try {
    const getVerificationToken =
      await prisma.verificationToken.findFirst({
        where: {
          email,
        },
      });

    return getVerificationToken;
  } catch {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const getVerificationToken =
      await prisma.verificationToken.findFirst({
        where: {
          token,
        },
      });

    return getVerificationToken;
  } catch {
    return null;
  }
}
