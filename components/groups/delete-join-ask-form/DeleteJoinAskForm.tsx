'use client';

import React, { useTransition } from 'react';

import { toastError, toastSuccess } from '@/libs/toast';
import { deleteDemandGroup } from '@/actions/delete-demand-join';

import SubmitButton from '@/ui/submit-button/SubmitButton';

type DeleteJoinAskFormProps = {
  groupId: string;
};

const DeleteJoinAskForm = ({ groupId }: DeleteJoinAskFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() =>
      deleteDemandGroup(groupId).then((res) => {
        if (res?.error) {
          toastError(res.error);
          return;
        }
        toastSuccess('Demande supprimée');
      })
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <SubmitButton
        isPending={isPending}
        label="Supprimer la demande"
        variant="outlined"
      />
    </form>
  );
};

export default DeleteJoinAskForm;
