import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const GET = async (request: NextRequest) => {
  try {
    const groups = await prisma.group.findMany({
      take: 12,
      include: {
        moderator: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(groups);
  } catch {
    return NextResponse.json(
      {
        message:
          'Une erreur est survenue lors de la récupération de données',
      },
      {
        status: 500,
      }
    );
  }
};
