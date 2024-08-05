import { apiPrefix } from '@/routes';
import { fetchEventsResponse } from '@/types/events';
import { headers } from 'next/headers';

export const fetchEvents = async (
  groupId: string
): Promise<fetchEventsResponse> => {
  const response = await fetch(
    `${apiPrefix}/groupes/${groupId}/evenements`,
    {
      next: {
        tags: ['events'],
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
