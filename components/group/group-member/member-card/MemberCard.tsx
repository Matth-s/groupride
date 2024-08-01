import { UsersInterface } from '@/interfaces/groups';
import React, { Suspense } from 'react';
import { formatDate } from '@/utils/date';
import { getUserImageUsernameById } from '@/data/user';

import ButtonActionList from '../action-button-list/ActionButtonList';
import ClientOnly from '@/components/ClientOnly';
import UserCardGroup from '../../user-card-group/UserCardGroup';

import styles from './styles.module.scss';

type MemberCardProps = {
  member: UsersInterface;
  groupId: string;
};

const MemberCard = async ({ member, groupId }: MemberCardProps) => {
  const user = await getUserImageUsernameById(member.userId);

  if (!user) return;

  return (
    <div className={styles.MemberCard}>
      <div className={styles.header}>
        <UserCardGroup user={user} />
      </div>

      <ul className={styles.info}>
        <li>
          <span>
            Membre depuis : {formatDate(new Date(member.joinedAt))}
          </span>
        </li>
        <li>
          <span>
            Role : {member.role === 'member' ? 'Membre' : 'Admin'}
          </span>
        </li>
      </ul>

      <ClientOnly>
        <Suspense fallback={''}>
          <ButtonActionList
            groupId={groupId}
            memberRole={member.role}
            memberId={member.userId}
            memberName={user.username}
          />
        </Suspense>
      </ClientOnly>
    </div>
  );
};

export default MemberCard;
