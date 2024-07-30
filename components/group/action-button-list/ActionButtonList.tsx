import { auth } from '@/auth';
import { getUserRole, isGroupModerator } from '@/data/group';
import { GroupRole } from '@/interfaces/groups';
import { Button } from '@mui/material';
import { Session } from 'next-auth/types';
import React from 'react';
import KickUserButton from '../kick-user-button/KickUserButton';

import styles from './styles.module.scss';
import UpdateStatusButton from '../update-status-button/UpdateStatusButton';

type ActionButtonListProps = {
  groupId: string;
  memberRole: GroupRole;
  memberId: string;
  memberName: string;
};

const ActionButtonList = async ({
  groupId,
  memberRole,
  memberId,
  memberName,
}: ActionButtonListProps) => {
  const session = (await auth()) as Session;
  const userId = session.user.id;

  let content;

  const userRole = await getUserRole({
    groupId,
    userId,
  });

  if (userRole === 'moderator') {
    content = (
      <>
        <li>
          <UpdateStatusButton
            userIdToUpdate={memberId}
            groupId={groupId}
            usernameToUpdate={memberName}
          />
        </li>
        <li>
          <KickUserButton
            userIdToKick={memberId}
            groupId={groupId}
            usernameToKick={memberName}
          />
        </li>
      </>
    );
  }

  if (userRole === 'admin') {
    if (memberRole === 'admin') {
      return null;
    } else if (memberRole === 'member') {
      content = (
        <li>
          <Button variant="contained" color="error">
            Exclure
          </Button>
        </li>
      );
    }

    return null;
  }

  return <ul className={styles.ActionButtonList}>{content}</ul>;
};

export default ActionButtonList;
