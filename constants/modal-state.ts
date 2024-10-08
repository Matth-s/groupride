import { GroupRole } from '@/interfaces/groups';
import {
  modalDeleteEvent,
  modalDeleteMessage,
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

export const modalDeleteEventDefault: modalDeleteEvent = {
  open: false,
  eventId: '',
  eventName: '',
  groupId: '',
};

export const modalDeleteMessageDefault: modalDeleteMessage = {
  open: false,
  messageId: '',
  conversationId: '',
  ownerIdMessage: '',
};
