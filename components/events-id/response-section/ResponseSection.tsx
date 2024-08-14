import { ResponseInterface } from '@/interfaces/events';
import React from 'react';

import styles from './styles.module.scss';
import ResponseCard from '../response-card/ResponseCard';

type ResponseSectionProps = {
  title: 'Présents' | 'Absents' | 'En attente';
  participant: ResponseInterface[];
};

const ResponseSection = ({
  participant,
  title,
}: ResponseSectionProps) => {
  return (
    <section className={styles.ResponseSection}>
      <h3>{title}</h3>
      <ul>
        {participant.map((participant) => (
          <ResponseCard
            key={participant.user.id}
            user={participant.user}
          />
        ))}
      </ul>
    </section>
  );
};

export default ResponseSection;
