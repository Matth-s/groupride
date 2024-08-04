import { apiPrefix } from '@/routes';
import { fetchInvitationResponse } from '@/types/invitation';
import { headers } from 'next/headers';

export const fetchInvitationGroup = async (
  groupId: string
): Promise<fetchInvitationResponse> => {
  try {
    const response = await fetch(
      `${apiPrefix}/groupes/${groupId}/demandes`,
      {
        next: {
          tags: ['join-demand'],
        },
        headers: new Headers(headers()),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }

    return {
      data: await response.json(),
      success: true,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message,
      success: false,
    };
  }
};
