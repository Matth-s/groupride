'use client';

import { openModalUpdateUser } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Button } from '@mui/material';

type UpdateStatusButtonProps = {
  userIdToUpdate: string;
  groupId: string;
  usernameToUpdate: string;
};

const UpdateStatusButton = ({
  userIdToUpdate,
  groupId,
  usernameToUpdate,
}: UpdateStatusButtonProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openModalUpdateUser({
        open: true,
        userIdToUpdate,
        groupId,
        usernameToUpdate,
      })
    );
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Modifier le status
    </Button>
  );
};

export default UpdateStatusButton;
