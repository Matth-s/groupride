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
}
