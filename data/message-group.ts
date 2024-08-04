import prisma from '@/libs/prisma';
import { FetchGroupMessage } from '@/types/message';

export const getGroupMessage = async (
  groupId: string
): Promise<FetchGroupMessage> => {
  try {
    const groupConversations =
      await prisma.groupConversation.findMany({
        where: {
          groupId,
        },
        select: {
          messages: {
            select: {
              id: true,
              createdAt: true,
              message: true,
              userId: true,
              conversationId: true,
              seen: {
                select: {
                  user: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
              user: {
                select: {
                  username: true,
                  image: true,
                },
              },
            },
          },
        },
      });

    const messages = groupConversations.flatMap(
      (conversation) => conversation.messages
    );

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue',
      data: null,
    };
  }
};
