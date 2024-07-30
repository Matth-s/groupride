import {
  fetchGroupsResponse,
  fetchMembersResponse,
} from '@/types/groups';
import { apiPrefix } from '@/routes';
import { headers } from 'next/headers';
import { unstable_cache } from 'next/cache';

export const fetchGroups = async ({
  url,
}: {
  url: string;
}): Promise<fetchGroupsResponse> => {
  const response = await fetch(url, {
    method: 'GET',
    next: {
      tags: ['groups'],
    },
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

export const fetchGroupMembers = async (
  groupId: string
): Promise<fetchMembersResponse> => {
  const response = await fetch(
    `${apiPrefix}/groupes/membres?id=${groupId}`,
    {
      next: {
        tags: ['members'],
      },
      headers: new Headers(headers()),
    }
  );

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
