'use client';

import { openModalLeaveGroup } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Button } from '@mui/material';
import React from 'react';

type LeaveGroupButtonProps = {
  groupId: string;
};

const LeaveGroupButton = ({ groupId }: LeaveGroupButtonProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openModalLeaveGroup({
        groupId,
        open: true,
      })
    );
  };

  return (
    <Button onClick={handleClick} color="error">
      Quitter le groupe
    </Button>
  );
};

export default LeaveGroupButton;
