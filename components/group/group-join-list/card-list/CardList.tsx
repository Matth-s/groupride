import { getUserImageUsernameById } from '@/data/user';
import { UserList } from '@/interfaces/invitation';
import { Button } from '@mui/material';
import React from 'react';
import UserCardGroup from '../../user-card-group/UserCardGroup';

import styles from './styles.module.scss';
import ActionButtonJoinList from '../action-button-join-list/ActionButtonJoinList';

type CardListProps = {
  demand: UserList;
};

const CardList = async ({ demand }: CardListProps) => {
  const user = await getUserImageUsernameById(demand.userId);

  if (!user) return;

  return (
    <div className={styles.CardList}>
      <UserCardGroup user={user} />

      <ActionButtonJoinList
        userId={user.id}
        groupId={demand.groupId}
      />
    </div>
  );
};

export default CardList;
