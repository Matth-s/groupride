import { fetchGroups } from '@/data/group';
import React from 'react';
import GroupCard from '../group-card/GroupCard';

import styles from './styles.module.scss';

type GroupListProps = {
  url: string;
};

const GroupList = async ({ url }: GroupListProps) => {
  const { success, data, message } = await fetchGroups({
    url: url,
  });

  if (!success || !data) {
    return <>{message}</>;
  }

  return (
    <section className={styles.GroupList}>
      {data.length > 0 ? (
        data.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))
      ) : (
        <p>Aucun groupe</p>
      )}
    </section>
  );
};

export default GroupList;
