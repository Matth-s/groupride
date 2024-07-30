'use client';

import { getUpdateUserData } from '@/libs/redux/features/modal-slice';
import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import Modal from '../Modal';

const UpdateUserModal = () => {
  const {
    open: isOpen,
    userIdToUpdate,
    usernameToUpdate,
    groupId,
  } = useAppSelector(getUpdateUserData);

  if (!isOpen) return null;

  return (
    <Modal>
      <div>update user</div>
    </Modal>
  );
};

export default UpdateUserModal;
