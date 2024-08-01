'use server';

import { auth } from '@/auth';
import { getUserInGroup, isUserAdminGroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { memberJoinGroupParams } from '@/schema/group';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const acceptUserInGroup = async (
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

  const isNewUserAlreadyInGroup = await getUserInGroup({
    userId,
    groupId,
  });

  if (isNewUserAlreadyInGroup) {
    return {
      success: 'Cet utilisateur fait déjà partie de votre groupe',
    };
  }

  try {
    await prisma.$transaction([
      prisma.groupUser.create({
        data: {
          userId,
          groupId,
          role: 'member',
        },
      }),
      prisma.invitationList.delete({
        where: {
          userId_groupId: {
            userId,
            groupId,
          },
        },
      }),
    ]);
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
