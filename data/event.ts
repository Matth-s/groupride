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

export const getEventData = async ({
  eventId,
}: {
  eventId: string;
}) => {
  try {
    const eventData = await prisma.groupEvent.findFirst({
      where: {
        id: eventId,
      },
      include: {
        gpxFile: {
          select: {
            elevation: true,
            points: true,
            distance: true,
            slopes: true,
          },
        },
      },
    });

    return eventData;
  } catch {
    return null;
  }
};

export const getTraceEvent = async (eventId: string) => {
  try {
    const existingTrace = await prisma.gPXFile.findFirst({
      where: {
        eventId,
      },
      include: {
        points: true,
        distance: true,
      },
    });

    return existingTrace;
  } catch {
    return null;
  }
};

export const getInformationEvent = async (eventId: string) => {
  try {
    const existingEventData = await prisma.groupEvent.findFirst({
      where: {
        id: eventId,
      },
      include: {
        moderator: {
          select: {
            username: true,
          },
        },
      },
    });

    return existingEventData;
  } catch {
    return null;
  }
};

export const getParticipantEvent = async (eventId: string) => {
  try {
    const participantEvent = await prisma.userResponseEvent.findMany({
      where: {
        groupEventId: eventId,
      },
      select: {
        response: true,
        responseAt: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        responseAt: 'desc',
      },
    });

    return participantEvent;
  } catch {
    return null;
  }
};
