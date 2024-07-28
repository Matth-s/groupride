import { FetchGroupsResponse } from '@/interfaces/group';
import prisma from '@/libs/prisma';
import { headers } from 'next/headers';

export const getGroupByName = async (name: string) => {
  try {
    const existingGroup = await prisma.group.findFirst({
      where: { name },
    });

    return existingGroup;
  } catch {
    return null;
  }
};

export const fetchGroups = async ({
  url,
}: {
  url: string;
}): Promise<FetchGroupsResponse> => {
  const response = await fetch(url, {
    next: {
      tags: ['groups'],
      revalidate: 3600,
    },
    method: 'GET',
    headers: new Headers(headers()),
  });

  if (!response.ok) {
    return {
      success: false,
      data: null,
      message:
        'Une erreur est survenue lors de la récupération des données',
    };
  }

  return {
    success: true,
    data: await response.json(),
  };
};
