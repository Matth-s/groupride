import { apiPrefix } from '@/routes';
import { fetchEventsResponse } from '@/types/events';
import { headers } from 'next/headers';

export const fetchEvents = async ({
  groupId,
  filter,
}: {
  groupId: string;
  filter: string | undefined;
}): Promise<fetchEventsResponse> => {
  const queryParams = new URLSearchParams();

  if (filter) {
    queryParams.set('evenements', filter);
  }

  const response = await fetch(
    `${apiPrefix}/groupes/${groupId}/evenements?${queryParams.toString()}`,
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
