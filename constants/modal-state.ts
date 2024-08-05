import { GroupRole } from '@/interfaces/groups';
import {
  modalKickUserInterface,
  modalLeaveGroup,
  modalUpdateUserInterface,
} from '@/interfaces/modal';

export const modalLeaveGroupDefault: modalLeaveGroup = {
  open: false,
  groupId: '',
};

export const modalKickUserDefault: modalKickUserInterface = {
  open: false,
  userIdToKick: '',
  usernameToKick: '',
  groupId: '',
};

export const modalUpdateUserDefault: modalUpdateUserInterface = {
  open: false,
  userIdToUpdate: '',
  usernameToUpdate: '',
  groupId: '',
  memberRole: GroupRole.member,
  currentUserRole: 'admin',
};
