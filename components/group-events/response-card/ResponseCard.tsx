import React from 'react';

import styles from './styles.module.scss';

type ResponseCardProps = {
  participantTotal: number;
  absentTotal: number;
  pendingTotal: number;
};

const ResponseCard = async ({
  participantTotal,
  absentTotal,
  pendingTotal,
}: ResponseCardProps) => {
  return (
    <div className={styles.ResponseCard}>
      <div className={styles.ResponseNumber}>
        <span>{participantTotal}</span>
        <span>{absentTotal}</span>
        <span>{pendingTotal}</span>
      </div>
    </div>
  );
};

export default ResponseCard;
