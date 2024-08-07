import { auth } from '@/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<Response> => {
  const session = await auth();

  if (!session || !session.user.id) {
    return NextResponse.json(
      {
        message:
          'Vous devez être connecté pour effectuer cette action',
      },
      {
        status: 401,
      }
    );
  }

  const userId = session.user.id;

  try {
    const groups = await prisma.group.findMany({
      where: {
        moderatorId: userId,
      },
    });
    return NextResponse.json(groups);
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
