'use client';

import { openModalKickUser } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Button } from '@mui/material';
import React from 'react';

type KickUserButtonProps = {
  userIdToKick: string;
  groupId: string;
  usernameToKick: string;
};

const KickUserButton = ({
  userIdToKick,
  groupId,
  usernameToKick,
}: KickUserButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() =>
        dispatch(
          openModalKickUser({
            open: true,
            userIdToKick,
            groupId,
            usernameToKick,
          })
        )
      }
    >
      Exclure
    </Button>
  );
};

export default KickUserButton;
