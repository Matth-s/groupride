'use client';

import { joinGroup } from '@/actions/join-group';
import { useTransition } from 'react';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { toastError, toastSuccess } from '@/libs/toast';

type JoinGroupButtonProps = {
  groupId: string;
};

const JoinGroupButton = ({ groupId }: JoinGroupButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = (): void => {
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
    <SubmitButton
      onClick={handleFormSubmit}
      isPending={isPending}
      label="Rejoindre"
      variant="outlined"
    />
  );
};

export default JoinGroupButton;
