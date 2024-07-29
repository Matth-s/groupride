import { fetchGroupsResponse } from '@/interfaces/groups';
import prisma from '@/libs/prisma';
import { headers } from 'next/headers';

export const getGroupByName = async (name: string) => {
  try {
    const existingGroup = await prisma.group.findFirst({
      where: { name },
    });

    return existingGroup;
  } catch {
    return null;
  }
};

export const getGroupById = async (id: string) => {
  try {
    const existingGroup = await prisma.group.findFirst({
      where: {
        id,
      },
    });

    return existingGroup;
  } catch {
    return null;
  }
};

export const getUserInInvitationList = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  try {
    const existingUserInvitation =
      await prisma.invitationList.findUnique({
        where: {
          userId_groupId: {
            userId,
            groupId,
          },
        },
      });

    return existingUserInvitation;
  } catch (error) {
    return null;
  }
};

export const getUserInGroup = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  try {
    const existingUserInGroup = await prisma.groupUser.findFirst({
      where: {
        userId,
        groupId,
      },
    });

    return existingUserInGroup;
  } catch {
    return null;
  }
};

export const isUserAdminGroup = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const isAdmin = await prisma.groupUser.findFirst({
      where: {
        groupId: groupId,
        userId: userId,
        role: 'admin',
      },
    });

    return isAdmin !== null;
  } catch {
    return false;
  }
};

export const fetchGroups = async ({
  url,
}: {
  url: string;
}): Promise<fetchGroupsResponse> => {
  const response = await fetch(url, {
    next: {
      tags: ['groups'],
      revalidate: 3600,
    },
    headers: headers(),
  });

  if (!response.ok) {
    return {
      success: false,
      data: null,
      message:
        'Une erreur est survenue lors de la récupération des données',
    };
  }

  return {
    success: true,
    data: await response.json(),
  };
};
