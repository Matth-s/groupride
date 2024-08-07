import { auth } from '@/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await auth();

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: 'Non autorisé',
      },
      {
        status: 500,
      }
    );
  }

  const userId = session.user.id;

  try {
    const groups = await prisma.group.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });

    return NextResponse.json(groups);
  } catch {
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
