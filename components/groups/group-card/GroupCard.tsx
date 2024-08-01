import { groupInterface } from '@/interfaces/groups';
import React, { Suspense } from 'react';
import CardButton from '../card-button/CardButton';

import ClientOnly from '@/components/ClientOnly';
import ButtonSkeleton from '@/ui/skeletons/button-skeleton/ButtonSkeleton';

import styles from './styles.module.scss';

type GroupCardProps = {
  group: groupInterface;
};

const GroupCard = ({ group }: GroupCardProps) => {
  const {
    moderatorId,
    name,
    id,
    groupType,
    sportPracticed,
    description,
    createdAt,
  } = group;

  return (
    <div className={styles.GroupCard}>
      <h2>{name}</h2>

      <div className="sport-praticed">
        <p>Sport pratiqué: </p>
        <ul>
          {sportPracticed ? (
            sportPracticed.map((sport) => (
              <li key={sport}>{sport}</li>
            ))
          ) : (
            <li>Non précisé</li>
          )}
        </ul>
      </div>
      <p className="description">Description: {description}</p>
      <p>Createur du groupe: {}</p>
      <p>Crée le : {JSON.stringify(createdAt)}</p>

      <Suspense fallback={<ButtonSkeleton />}>
        <ClientOnly>
          <CardButton
            moderatorId={moderatorId}
            id={id}
            groupType={groupType}
          />
        </ClientOnly>
      </Suspense>
    </div>
  );
};

export default GroupCard;
