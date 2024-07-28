import { groupInterface } from '@/interfaces/group';
import React from 'react';

import styles from './styles.module.scss';

type GroupCardProps = {
  group: groupInterface;
};

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <div className={styles.GroupCard}>
      <h3>{group.name}</h3>
    </div>
  );
};

export default GroupCard;
