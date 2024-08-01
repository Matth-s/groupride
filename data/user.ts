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

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};

export const getUserImageUsernameById = async (
  id: string
): Promise<{
  image: string | null;
  username: string;
  id: string;
} | null> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        image: true,
        username: true,
        id: true,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};
