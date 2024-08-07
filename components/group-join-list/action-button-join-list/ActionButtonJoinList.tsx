'use client';

import SubmitButton from '@/ui/submit-button/SubmitButton';
import { useTransition } from 'react';

import styles from './styles.module.scss';
import { refuseUserGroup } from '@/actions/refuse-user-group';
import { toastError, toastSuccess } from '@/libs/toast';
import { acceptUserInGroup } from '@/actions/accept-user-group';

type ActionButtonJoinListProps = {
  userId: string;
  groupId: string;
};

const ActionButtonJoinList = ({
  userId,
  groupId,
}: ActionButtonJoinListProps) => {
  const [isPending, startTransition] = useTransition();

  const handleAccept = (): void => {
    void startTransition(() => {
      acceptUserInGroup({ groupId, userId }).then((res) => {
        if (res?.error) {
          return toastError(res.error);
        }

        toastSuccess("L'utilisateur à été accepté");
      });
    });
  };

  const handleRefuse = (): void => {
    startTransition((): void => {
      refuseUserGroup({ groupId, userId }).then((res) => {
        console.log(res?.error);
        if (res?.error) {
          return toastError(res.error);
        }

        toastSuccess(
          res.success ?? "La demande de l'utilisateur à été refusé"
        );
      });
    });
  };

  return (
    <div className={styles.ActionButtonJoinList}>
      <SubmitButton
        label="Accepter"
        color="secondary"
        onClick={handleAccept}
        isPending={isPending}
        fullWidth={true}
        variant="contained"
      />

      <SubmitButton
        label="Refuser"
        color="error"
        onClick={handleRefuse}
        isPending={isPending}
        fullWidth={true}
        variant="contained"
      />
    </div>
  );
};

export default ActionButtonJoinList;
