import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  console.log(searchParams, 'searchParams');

  try {
    const groups = await prisma.group.findMany({
      take: 5,
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
