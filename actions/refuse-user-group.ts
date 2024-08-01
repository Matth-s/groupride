'use server';

import { auth } from '@/auth';
import {
  getUserInInvitationList,
  isUserAdminGroup,
} from '@/data/group';
import prisma from '@/libs/prisma';
import { memberJoinGroupParams } from '@/schema/group';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const refuseUserGroup = async (
  values: z.infer<typeof memberJoinGroupParams>
) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const validatedFields = memberJoinGroupParams.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Rêquete invalide',
    };
  }

  const { groupId, userId } = validatedFields.data;

  const iscurrentUserAdmin = await isUserAdminGroup({
    groupId,
    userId: session.user.id,
  });

  if (!iscurrentUserAdmin) {
    return {
      error: "Vous n'avez pas les droits pour effectuer cette action",
    };
  }

  const isUserInInvitationList = await getUserInInvitationList({
    groupId,
    userId,
  });

  if (!isUserInInvitationList) {
    return {
      success:
        "L'utilisateur ne fait pas partie de la liste pour rejoindre le groupe",
    };
  }

  try {
    await prisma.invitationList.delete({
      where: {
        userId_groupId: {
          groupId,
          userId,
        },
      },
    });
  } catch {
    return {
      error:
        'Une erreur est survenue veuillez réessayer ultérieurement',
    };
  }

  revalidatePath(`/groupes/${values.groupId}/demandes`);
  revalidateTag('groups');
  revalidateTag('join-demand');

  redirect(`/groupes/${values.groupId}/demandes`);
};
