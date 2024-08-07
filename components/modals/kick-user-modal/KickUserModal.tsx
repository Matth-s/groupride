'use client';

import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import {
  closeModal,
  getKickUserData,
} from '@/libs/redux/features/modal-slice';
import { kickUser } from '@/actions/kick-user';
import { toastSuccess } from '@/libs/toast';

import React, { useState, useTransition } from 'react';
import Modal from '../Modal';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import FormSubmitError from '@/ui/form-submit-error/FormSubmitError';
import ActionButton from '../action-button/ActionButton';
import CancelButtonModal from '@/ui/cancel-button-modal/CancelButtonModal';

const KickUserModal = () => {
  const [isPending, startTransition] = useTransition();
  const {
    userIdToKick,
    usernameToKick,
    groupId,
    open: isOpen,
  } = useAppSelector(getKickUserData);
  const [error, setError] = useState<string | undefined>();
  const dispatch = useAppDispatch();

  if (!isOpen) return;

  const handleDelete = (): void => {
    startTransition((): void => {
      kickUser({
        groupId,
        userIdToKick,
      }).then((res) => {
        if (res?.error) {
          setError(res.error);
          return;
        }

        toastSuccess(
          `${
            res?.success ??
            "L'utilisateur ne fait plus partie du groupe"
          }`
        );

        dispatch(closeModal());
      });
    });
  };

  return (
    <Modal
      title={`Êtes vous sur de vouloir expulser l'utilisateur
           "${usernameToKick}"  ?`}
    >
      <div>
        <ActionButton>
          <CancelButtonModal label="Annuler" isDisabled={isPending} />

          <SubmitButton
            color="error"
            isPending={isPending}
            label="Exclure"
            variant="contained"
            onClick={handleDelete}
          />
        </ActionButton>

        <FormSubmitError message={error} />
      </div>
    </Modal>
  );
};

export default KickUserModal;
