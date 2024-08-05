import { EventInterface } from '@/interfaces/events';
import React from 'react';

import styles from './styles.module.scss';

type EventCardProps = {
  event: EventInterface;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className={styles.EventCard}>
      <h4>{event.name}</h4>
      <p>{event.location}</p>
    </div>
  );
};

export default EventCard;
