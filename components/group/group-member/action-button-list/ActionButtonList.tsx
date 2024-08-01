import { auth } from '@/auth';
import { getUserRole } from '@/data/group';
import { GroupRole } from '@/interfaces/groups';
import { Session } from 'next-auth/types';

import React from 'react';
import KickUserButton from '../kick-user-button/KickUserButton';
import UpdateStatusButton from '../update-status-button/UpdateStatusButton';

import styles from './styles.module.scss';

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
  const session = await auth();

  if (!session?.user) return;

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
            memberRole={memberRole}
            currentUserRole={'moderator'}
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
        <>
          <li>
            <UpdateStatusButton
              userIdToUpdate={memberId}
              groupId={groupId}
              usernameToUpdate={memberName}
              memberRole={memberRole}
              currentUserRole={'admin'}
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

    return null;
  }

  return <ul className={styles.ActionButtonList}>{content}</ul>;
};

export default ActionButtonList;
