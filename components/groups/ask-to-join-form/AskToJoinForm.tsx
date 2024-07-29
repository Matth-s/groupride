'use client';

import { askToJoinGroup } from '@/actions/ask-to-join-group';
import { toastError, toastSuccess } from '@/libs/toast';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { useTransition } from 'react';

type AskToJoinFormProps = {
  groupId: string;
};

const AskToJoinForm = ({ groupId }: AskToJoinFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() =>
      askToJoinGroup(groupId).then((res) => {
        if (res?.error) {
          toastError(res.error);
          return;
        }
        toastSuccess('Votre demande à été envoyée');
      })
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <SubmitButton
        isPending={isPending}
        label="Demander à rejoindre"
      />
    </form>
  );
};

export default AskToJoinForm;
