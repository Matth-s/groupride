import prisma from '@/libs/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};
