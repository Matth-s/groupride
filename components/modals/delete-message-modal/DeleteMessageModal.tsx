'use client';

import {
  closeModal,
  getDeleteMessageData,
} from '@/libs/redux/features/modal-slice';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { useTransition } from 'react';
import { deleteMessage } from '@/actions/delete-message';

import Modal from '../Modal';
import ActionButton from '../action-button/ActionButton';
import CancelButtonModal from '@/ui/cancel-button-modal/CancelButtonModal';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { toastError, toastSuccess } from '@/libs/toast';

const DeleteMessageModal = () => {
  const { open: isOpen, ...rest } = useAppSelector(
    getDeleteMessageData
  );
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return;

  const handleDeleteMessage = () => {
    startTransition(() => {
      deleteMessage(rest).then((res) => {
        if (res?.error) {
          return toastError(res.error);
        }

        toastSuccess('Le message a été supprimé');
        dispatch(closeModal());
      });
    });
  };

  return (
    <Modal title="Voulez-vous supprimer ce message ?">
      <ActionButton>
        <CancelButtonModal label="Annuler" isDisabled={isPending} />
        <SubmitButton
          color="error"
          onClick={() => handleDeleteMessage()}
          isPending={isPending}
          variant="contained"
          label="Supprimer"
        />
      </ActionButton>
    </Modal>
  );
};

export default DeleteMessageModal;
