import { auth } from '@/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const GET = auth(async (request) => {
  const authRequest = request.auth;

  if (!authRequest) {
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

  const userId = authRequest.user.id;

  try {
    const groups = await prisma.group.findMany({
      where: {
        modaratorId: userId,
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
});
