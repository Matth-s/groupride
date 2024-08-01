import { UserList } from '@/interfaces/invitation';

export type fetchInvitationResponse =
  | {
      success: false;
      data: null;
      message: string;
    }
  | {
      success: true;
      data: UserList[];
      message?: undefined;
    };
