'use client';

import { joinGroup } from '@/actions/join-group';
import { useTransition } from 'react';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { toastError, toastSuccess } from '@/libs/toast';

type JoinGroupFormProps = {
  groupId: string;
};

const JoinGroupForm = ({ groupId }: JoinGroupFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      joinGroup(groupId).then((res) => {
        if (res?.error) {
          toastError(res.error);
          return;
        }

        toastSuccess('Vous avez rejoint le groupe avec succès');
      });
    });
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <SubmitButton
        isPending={isPending}
        label="Rejoindre"
        variant="outlined"
      />
    </form>
  );
};

export default JoinGroupForm;
