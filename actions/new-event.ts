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

  const group: {
    moderator: {
      id: string;
    };
    users: {
      userId: string;
    }[];
  }[] = await prisma.group.findMany({
    where: {
      id: groupId,
    },
    select: {
      users: {
        select: {
          userId: true,
        },
      },
      moderator: {
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
      ...group[0].users.map((user) => {
        const id = user.userId;
        return prisma.userResponseEvent.create({
          data: {
            groupEventId: newId,
            userId: id,
          },
        });
      }),
      prisma.userResponseEvent.create({
        data: {
          groupEventId: newId,
          userId: group[0].moderator.id,
        },
      }),
    ]);
  } catch (error) {
    return {
      error:
        'Une erreur est survenue veillez réessayer ultérieurement',
    };
  }

  revalidateTag('events');
  redirect(`/groupes/${groupId}/evenements`);
};
