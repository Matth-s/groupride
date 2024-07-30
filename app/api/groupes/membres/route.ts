export const dynamic = 'force-dynamic';

import { auth } from '@/auth';
import { isUserIngroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message:
          'Vous devez être connectez pour effectuer cette action',
      },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const searchParamsId = searchParams.get('id');

  if (!searchParamsId) {
    return NextResponse.json(
      {
        message: "L'id du groupe n'est pas présent dans la requête",
      },
      { status: 404 }
    );
  }

  const userIsInGroup = await isUserIngroup({
    groupId: searchParamsId,
    userId: session.user.id,
  });

  if (!userIsInGroup) {
    return NextResponse.json(
      {
        message: "Vous n'avez pas l'autorisation de voir ce contenu",
      },
      { status: 401 }
    );
  }

  try {
    const members = await prisma.groupUser.findMany({
      where: { groupId: searchParamsId },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching group members:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
};
