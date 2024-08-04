import { MessageInterface } from '@/interfaces/message';

export type FetchGroupMessage =
  | {
      success: true;
      data: MessageInterface[];
    }
  | {
      success: false;
      message: string;
      data: null;
    };
