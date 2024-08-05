'use client';

import { getUpdateUserData } from '@/libs/redux/features/modal-slice';
import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import Modal from '../Modal';
import UpdateUserRoleForm from '@/components/group-member/update-user-role-form/UpdateUserRoleForm';

const UpdateUserModal = () => {
  const {
    open: isOpen,
    userIdToUpdate,
    usernameToUpdate,
    groupId,
    memberRole,
    currentUserRole,
  } = useAppSelector(getUpdateUserData);

  if (!isOpen) return null;

  return (
    <Modal title={`Modifier le status de ${usernameToUpdate}`}>
      <UpdateUserRoleForm
        memberRole={memberRole}
        groupId={groupId}
        userIdToUpdate={userIdToUpdate}
        currentUserRole={currentUserRole}
      />
    </Modal>
  );
};

export default UpdateUserModal;
