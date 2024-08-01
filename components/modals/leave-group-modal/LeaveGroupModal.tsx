'use client';

import {
  closeModal,
  getLeaveGroupData,
} from '@/libs/redux/features/modal-slice';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import Modal from '../Modal';
import ActionButton from '../action-button/ActionButton';
import { useState, useTransition } from 'react';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import CancelButtonModal from '@/ui/cancel-button-modal/CancelButtonModal';
import { leaveGroup } from '@/actions/leave-group';
import { toastError, toastSuccess } from '@/libs/toast';

const LeaveGroupModal = () => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const { open: isOpen, groupId } = useAppSelector(getLeaveGroupData);

  if (!isOpen) return;

  const handleLeaveGroup = () => {
    startTransition(() => {
      leaveGroup(groupId).then((res) => {
        if (res?.error) {
          return toastError(res.error);
        }

        toastSuccess('Vous avez quitté le groupe avec succès');
        dispatch(closeModal());
      });
    });
  };

  return (
    <Modal title="Êtes vous sur de vouloir quitter le groupe ?">
      <ActionButton>
        <CancelButtonModal label="Annuler" isDisabled={isPending} />
        <SubmitButton
          label="Quitter"
          variant="contained"
          color="error"
          onClick={handleLeaveGroup}
          isPending={isPending}
        />
      </ActionButton>
    </Modal>
  );
};

export default LeaveGroupModal;
