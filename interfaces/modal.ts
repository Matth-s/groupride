import { GroupRole, NewGroupRole } from './groups';

export interface modalKickUserInterface {
  open: boolean;
  userIdToKick: string;
  groupId: string;
  usernameToKick: string;
}

export interface modalUpdateUserInterface {
  open: boolean;
  userIdToUpdate: string;
  groupId: string;
  usernameToUpdate: string;
  memberRole: GroupRole | NewGroupRole;
  currentUserRole: 'admin' | 'moderator';
}

export interface modalLeaveGroup {
  open: boolean;
  groupId: string;
}
