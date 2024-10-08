import { SportPracticed } from '@/interfaces/groups';
import prisma from '@/libs/prisma';
import dayjs from 'dayjs';

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

export const getSportPraticedInGroup = async (
  groupId: string
): Promise<SportPracticed[] | null> => {
  try {
    const sportPraticed = await prisma.group.findMany({
      where: {
        id: groupId,
      },
      select: {
        sportPraticed: true,
      },
    });

    return sportPraticed[0].sportPraticed as any;
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
}): Promise<boolean> => {
  try {
    const existingUserInGroup = await prisma.groupUser.findFirst({
      where: {
        userId,
        groupId,
      },
    });

    const isModerator = await prisma.group.findFirst({
      where: { id: groupId, moderatorId: userId },
    });

    if (existingUserInGroup || isModerator) return true;

    return false;
  } catch {
    return false;
  }
};

export const isGroupModerator = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const isModerator = await prisma.group.findFirst({
      where: {
        id: groupId,
        moderatorId: userId,
      },
    });

    return Boolean(isModerator);
  } catch {
    return false;
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
    const isUserAdmin = await prisma.groupUser.findFirst({
      where: {
        groupId,
        userId,
        role: 'admin',
      },
    });

    const isModerator = await prisma.group.findFirst({
      where: {
        moderatorId: userId,
      },
    });

    if (isModerator || isUserAdmin) return true;
    return false;
  } catch {
    return false;
  }
};

export const isUserIngroup = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const isModerator = await isGroupModerator({
      groupId,
      userId,
    });

    const isUserIngroup = await getUserInGroup({
      groupId,
      userId,
    });

    if (isModerator || isUserIngroup) return true;
    return false;
  } catch {
    return false;
  }
};

export const getUserRole = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  try {
    const userRole = await prisma.groupUser.findFirst({
      where: {
        groupId,
        userId,
      },
      select: {
        role: true,
      },
    });

    if (userRole) return userRole.role;

    const userRoleIsModerator = await isGroupModerator({
      groupId,
      userId,
    });

    if (userRoleIsModerator) {
      return 'moderator';
    }

    return null;
  } catch {
    return null;
  }
};

export const getGroupEventFuturIds = async (groupId: string) => {
  try {
    const groupEvents = await prisma.groupEvent.findMany({
      where: {
        groupId,
        departureDate: {
          gte: dayjs().toDate(),
        },
      },
      select: {
        id: true,
      },
    });

    return groupEvents;
  } catch {
    return null;
  }
};
