import prisma from '@/libs/prisma';

export const getEventById = async (id: string) => {
  try {
    const existingEvent = await prisma.groupEvent.findFirst({
      where: {
        id,
      },
    });

    return existingEvent;
  } catch {
    return null;
  }
};

export const isEventCreator = async ({
  eventId,
  moderatorId,
}: {
  eventId: string;
  moderatorId: string;
}): Promise<Boolean> => {
  try {
    const isCreator = await prisma.groupEvent.findFirst({
      where: {
        id: eventId,
        creatorId: moderatorId,
      },
    });

    return Boolean(isCreator);
  } catch {
    return false;
  }
};
