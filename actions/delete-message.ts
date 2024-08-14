'use server';

import { auth } from '@/auth';
import { getUserInGroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { pusherServer } from '@/libs/pusher';
import { deleteMessageSchema } from '@/schema/message';
import { z } from 'zod';

export const deleteMessage = async (
  values: z.infer<typeof deleteMessageSchema>
) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const validateFields = deleteMessageSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: 'Requête invalide',
    };
  }

  const { messageId, conversationId, ownerIdMessage } =
    validateFields.data;

  if (ownerIdMessage !== session.user.id) {
    return {
      error: "Ce message n'est pas le votre",
    };
  }

  const conversation = await prisma.groupMessage.findFirst({
    where: {
      conversation: {
        id: conversationId,
      },
    },
    select: {
      conversation: {
        select: {
          group: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!conversation || !conversation.conversation.group?.id) {
    return {
      error: "Le groupe n'existe pas",
    };
  }

  const groupId = conversation.conversation.group.id;

  const isUserInGroup = await getUserInGroup({
    groupId,
    userId: session.user.id,
  });

  if (!isUserInGroup) {
    return {
      error: 'Vous ne faites pas partie de ce groupe',
    };
  }

  try {
    await prisma.groupMessage.delete({
      where: {
        id: messageId,
      },
    });

    await pusherServer.trigger(groupId, 'message-deleted', {
      messageId: messageId,
      conversationId: conversationId,
    });
  } catch {
    return {
      error:
        'Une erreur est survenue veuillez réessayer ultérieument',
    };
  }
};
