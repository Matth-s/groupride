import { groupInterface, UsersInterface } from '@/interfaces/groups';

export type fetchMembersResponse =
  | {
      success: false;
      data: null;
      message: string;
    }
  | {
      success: true;
      data: UsersInterface[];
      message?: undefined;
    };

export type fetchGroupsResponse =
  | {
      success: false;
      data: null;
      message: string;
    }
  | {
      success: true;
      data: groupInterface[];
      message?: undefined;
    };
