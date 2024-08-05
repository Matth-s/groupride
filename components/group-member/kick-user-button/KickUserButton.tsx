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

  function handleClick() {
    dispatch(
      openModalKickUser({
        open: true,
        userIdToKick,
        groupId,
        usernameToKick,
      })
    );
  }

  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Exclure
    </Button>
  );
};

export default KickUserButton;
