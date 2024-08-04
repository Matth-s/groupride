export const MessagesInterface = {};

export interface MessageInterface {
  id: string;
  message: string;
  createdAt: Date;
  userId: string;
  conversationId: string;
  seen: {
    user: {
      username: string;
    };
  }[];
  user: {
    image: string | null;
    username: string;
  };
}
