import { auth } from '@/auth';
import { getGroupById, isUserAdminGroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

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
          "Vous n'avez pas l'autorisation pour voir ce contenue",
      },
      {
        status: 401,
      }
    );
  }

  const groupId = params.id;

  const findGroup = await getGroupById(groupId);

  if (!findGroup) {
    return NextResponse.json(
      {
        message: "Ce groupe n'existe pas",
      },
      {
        status: 404,
      }
    );
  }

  const isAdmin = isUserAdminGroup({
    groupId,
    userId: session.user.id,
  });

  if (!isAdmin) {
    return NextResponse.json(
      {
        message: "Vous n'avez pas les droits de voir ce contenue",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const demands = await prisma.invitationList.findMany({
      where: {
        groupId,
      },
    });

    return NextResponse.json(demands);
  } catch {
    return NextResponse.json(
      {
        message:
          'Une erreur est survenue lors de la récupération des demandes',
      },
      {
        status: 500,
      }
    );
  }
};
