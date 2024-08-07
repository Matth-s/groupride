import { auth } from '@/auth';
import { getUserInGroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        message:
          "Vous n'avez pas l'autorisation pour voir ce contenu",
      },
      {
        status: 401,
      }
    );
  }

  const userIsInGroup = await getUserInGroup({
    groupId: params.id,
    userId: session.user.id,
  });

  if (!userIsInGroup) {
    return NextResponse.json(
      {
        message: 'Vous ne faites pas partie de ce groupe',
      },
      {
        status: 401,
      }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  let whatEventTimeToSelect = searchParams.get('evenements');

  if (
    whatEventTimeToSelect !== 'passe' &&
    whatEventTimeToSelect !== 'futur'
  ) {
    whatEventTimeToSelect = 'futur';
  }

  try {
    let dateFilter;
    if (whatEventTimeToSelect === 'futur') {
      dateFilter = {
        gte: dayjs().toDate(),
      };
    } else if (whatEventTimeToSelect === 'passe') {
      dateFilter = {
        lt: dayjs().toDate(),
      };
    }

    const events = await prisma.groupEvent.findMany({
      where: {
        groupId: params.id,
        departureDate: dateFilter,
      },
      include: {
        response: true,
        group: {
          select: {
            id: true,
          },
        },
        moderator: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Une erreur est survenue',
      },
      {
        status: 500,
      }
    );
  }
};
