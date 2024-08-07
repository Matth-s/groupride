'use client';

import { useCurrentUserId } from '@/hooks/use-current-user';
import { openModalDeleteEvent } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Button } from '@mui/material';

type DeleteEventButtonProps = {
  creatorIdEvent: string;
  eventId: string;
  eventName: string;
  groupId: string;
};

const DeleteEventButton = ({
  creatorIdEvent,
  eventId,
  eventName,
  groupId,
}: DeleteEventButtonProps) => {
  const dispatch = useAppDispatch();
  const userId = useCurrentUserId();

  if (!userId || userId !== creatorIdEvent) return;

  const handleDeleteEvent = () => {
    dispatch(
      openModalDeleteEvent({
        eventId,
        eventName,
        open: true,
        groupId,
      })
    );
  };

  return (
    <Button
      onClick={() => handleDeleteEvent()}
      variant="text"
      color="error"
    >
      Supprimer
    </Button>
  );
};

export default DeleteEventButton;
