'use server';

import { auth } from '@/auth';
import { getUserRole, isUserIngroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { checkParamsUserGroupUpdate } from '@/schema/group';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const updateRoleUserGroup = async (
  values: z.infer<typeof checkParamsUserGroupUpdate>
) => {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: 'Vous devez être connecté pour effectuer cette action',
    };
  }

  const validatedFields =
    checkParamsUserGroupUpdate.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Formulaire invalide',
    };
  }

  const { userIdToUpdate, groupId, newRole } = validatedFields.data;

  const [
    currentUserIsInGroup,
    userToUpdateIsInGroup,
    currentUserRole,
    userToUpdateRole,
  ] = await Promise.all([
    isUserIngroup({ groupId, userId: session.user.id }),
    isUserIngroup({ groupId, userId: userIdToUpdate }),
    getUserRole({ groupId, userId: session.user.id }),
    getUserRole({ groupId, userId: userIdToUpdate }),
  ]);

  //verifier si l utilisateur est dans le groupe
  if (!currentUserIsInGroup) {
    return {
      error: 'Vous ne faites plus partie de ce groupe',
    };
  }

  //verifier si l utilisateur a update est dans le groupe
  if (!userToUpdateIsInGroup) {
    return {
      error: "L'utilisateur ne fait plus partie de ce groupe",
    };
  }

  //si l'utilisateur actuel est admin et que l utilisateur a update et le moderateur ou un admin alors retourne une erreur de non droit
  if (
    currentUserRole === 'admin' &&
    (userToUpdateRole === 'admin' || userToUpdateRole === 'moderator')
  ) {
    return {
      error: "Vous n'avez pas les droits pour effectuer cette action",
    };
  }

  try {
    if (currentUserRole === 'moderator' && newRole === 'moderator') {
      await prisma.$transaction([
        prisma.group.update({
          where: {
            id: groupId,
          },
          data: {
            moderatorId: userIdToUpdate,
          },
        }),
        prisma.groupUser.create({
          data: {
            groupId,
            userId: session.user.id,
          },
        }),
        prisma.groupUser.delete({
          where: {
            userId_groupId: {
              groupId,
              userId: userIdToUpdate,
            },
          },
        }),
      ]);
    } else {
      await prisma.groupUser.update({
        where: {
          userId_groupId: {
            userId: userIdToUpdate,
            groupId,
          },
        },
        data: {
          role: (newRole as 'member') || 'admin',
        },
      });
    }
  } catch (error) {
    return {
      error:
        'Une erreur est survenue veuillez réessayer ultérieurement',
    };
  }

  revalidatePath(`/groupes/${groupId}/membres`);
  revalidatePath(`/groupes/${groupId}/`);
  revalidateTag('groups');
  revalidateTag('members');

  redirect(`/groupes/${groupId}/membres`);
};
