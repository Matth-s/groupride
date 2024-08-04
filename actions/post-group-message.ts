'use server';

import { auth } from '@/auth';
import { getUserInGroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { pusherServer } from '@/libs/pusher';
import { z } from 'zod';

const schema = z.object({
  message: z.string().trim().min(1),
  groupId: z.string(),
});

export const postGroupMessage = async (
  values: z.infer<typeof schema>
) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Champ du formulaire invalide',
    };
  }

  const { message, groupId } = validatedFields.data;

  const isUserInGroup = await getUserInGroup({
    groupId: groupId,
    userId: session.user.id,
  });

  if (!isUserInGroup) {
    return {
      error: "Vous n'êtes pas dans le groupe",
    };
  }

  try {
    await prisma.groupConversation.update({
      where: { groupId },
      data: {
        messages: {
          create: {
            message,
            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        },
      },
    });

    await pusherServer.trigger(groupId, 'messages:new', {
      message,
      userId: session.user.id,
      user: {
        username: session.user.username,
        image: session.user.image,
      },
    });
  } catch {
    return {
      error: 'Une erreur est survenue',
    };
  }
};
