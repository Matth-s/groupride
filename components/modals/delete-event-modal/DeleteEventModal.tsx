'use client';

import {
  closeModal,
  getDeleteEventData,
} from '@/libs/redux/features/modal-slice';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import Modal from '../Modal';
import ActionButton from '../action-button/ActionButton';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { useTransition } from 'react';
import CancelButtonModal from '@/ui/cancel-button-modal/CancelButtonModal';
import { deleteEvent } from '@/actions/delete-event';
import { toastError, toastSuccess } from '@/libs/toast';

const DeleteEventModal = () => {
  const { open, eventId, eventName, groupId } = useAppSelector(
    getDeleteEventData
  );
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  if (!open) return;

  const handleDeleteEvent = () => {
    startTransition(() => {
      deleteEvent({
        eventId,
        groupId,
      }).then((res) => {
        if (res?.error) {
          return toastError(res.error);
        }

        dispatch(closeModal());
        return toastSuccess(
          `L'évènement '${eventName}' a été supprimé`
        );
      });
    });
  };

  return (
    <Modal
      title={`Êtes vous sur vouloir supprimer l'événement ${eventName} ?`}
    >
      <ActionButton>
        <CancelButtonModal label="Annuler" isDisabled={isPending} />
        <SubmitButton
          label="Supprimer"
          isPending={isPending}
          onClick={() => handleDeleteEvent()}
          variant="contained"
          color="error"
        />
      </ActionButton>
    </Modal>
  );
};

export default DeleteEventModal;
