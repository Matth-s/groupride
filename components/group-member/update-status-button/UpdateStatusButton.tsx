'use client';

import { GroupRole, NewGroupRole } from '@/interfaces/groups';
import { openModalUpdateUser } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Button } from '@mui/material';

type UpdateStatusButtonProps = {
  userIdToUpdate: string;
  groupId: string;
  usernameToUpdate: string;
  memberRole: GroupRole | NewGroupRole;
  currentUserRole: 'admin' | 'moderator';
};

const UpdateStatusButton = ({
  userIdToUpdate,
  groupId,
  usernameToUpdate,
  memberRole,
  currentUserRole,
}: UpdateStatusButtonProps) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(
      openModalUpdateUser({
        open: true,
        userIdToUpdate,
        groupId,
        usernameToUpdate,
        memberRole,
        currentUserRole,
      })
    );
  }

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Modifier le status
    </Button>
  );
};

export default UpdateStatusButton;
