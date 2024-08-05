'use server';

import { auth } from '@/auth';
import { isUserAdminGroup } from '@/data/group';
import { z } from 'zod';
import { newEventSchema } from '@/schema/event';

import prisma from '@/libs/prisma';
import { createId } from '@paralleldrive/cuid2';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export const createEvent = async ({
  groupId,
  values,
}: {
  groupId: string;
  values: z.infer<typeof newEventSchema>;
}) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const validatedFields = newEventSchema.safeParse(values);
  console.log(groupId);
  if (
    !validatedFields.success ||
    !groupId ||
    typeof groupId !== 'string'
  ) {
    return {
      error: 'Champ du formulaire invalide',
    };
  }

  const isAdmin = isUserAdminGroup({
    groupId,
    userId: session.user.id,
  });

  if (!isAdmin) {
    return {
      error: "Vous n'avez pas les droits pour créer un événement",
    };
  }

  let newId = createId();

  const userGroupId = await prisma.group.findMany({
    where: {
      id: groupId,
    },
    select: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  try {
    await prisma.$transaction([
      prisma.groupEvent.create({
        data: {
          id: newId,
          ...validatedFields.data,
          creatorId: session.user.id,
          groupId,
        },
      }),
      ...userGroupId.map((user) => {
        const { id } = user.user;

        return prisma.userResponseEvent.create({
          data: {
            groupEventId: newId,
            userId: id,
          },
        });
      }),
    ]);
  } catch (error) {
    //console.log(error);
    return {
      error:
        'Une erreur est survenue veillez réessayer ultérieurement',
    };
  }

  revalidateTag('events');
  redirect(`/groupes/${groupId}/evenements`);
};
