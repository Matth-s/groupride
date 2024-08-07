'use client';

import { sendEventResponse } from '@/actions/send-event-response';
import { UserResponseEventInterface } from '@/interfaces/events';
import { toastError } from '@/libs/toast';
import { useSession } from 'next-auth/react';
import React, { useTransition } from 'react';

import SubmitButton from '@/ui/submit-button/SubmitButton';

import styles from './styles.module.scss';

type ResponseButtonProps = {
  responses: UserResponseEventInterface[];
  groupId: string;
};

const ResponseButton = ({
  responses,
  groupId,
}: ResponseButtonProps) => {
  const { data: session } = useSession();

  const [isPending, startTransition] = useTransition();

  const currentUserId = session?.user.id;

  const hasNotSendResponse = responses
    .filter((response) => response.response === 'PENDING')
    .find((user) => user.userId === currentUserId);

  const positiveResponse = responses
    .filter((response) => response.response === 'PARTICIPANT')
    .find((user) => user.userId === currentUserId);

  const handleSendResponse = (response: 'PARTICIPANT' | 'ABSENT') => {
    void startTransition(() => {
      sendEventResponse({
        response,
        groupId,
        groupEventId: responses[0].groupEventId,
      }).then((res) => {
        if (res?.error) {
          return toastError('Une erreur est survenue');
        }
      });
    });
  };

  if (hasNotSendResponse) {
    return (
      <div className={styles.ResponseButton}>
        <SubmitButton
          isPending={isPending}
          label="Présent"
          onClick={() => handleSendResponse('PARTICIPANT')}
          variant="outlined"
        />
        <SubmitButton
          isPending={isPending}
          label="Absent"
          onClick={() => handleSendResponse('ABSENT')}
          variant="outlined"
        />
      </div>
    );
  }

  return (
    <div className={styles.ResponseButton}>
      <SubmitButton
        isPending={isPending}
        label="Présent"
        onClick={
          positiveResponse
            ? () => null
            : () => handleSendResponse('PARTICIPANT')
        }
        variant={positiveResponse ? 'contained' : 'outlined'}
      />
      <SubmitButton
        isPending={isPending}
        label="Absent"
        onClick={
          !positiveResponse
            ? () => null
            : () => handleSendResponse('ABSENT')
        }
        variant={!positiveResponse ? 'contained' : 'outlined'}
      />
    </div>
  );
};

export default ResponseButton;
