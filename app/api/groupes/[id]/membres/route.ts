export const dynamic = 'force-dynamic';

import { auth } from '@/auth';
import { isUserIngroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { id: string } }) => {
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

  const groupId = params.id;

  const userIsInGroup = await isUserIngroup({
    groupId,
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
      where: { groupId },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
};
