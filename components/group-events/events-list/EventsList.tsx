import { fetchEvents } from '@/api/events';
import React from 'react';
import EventCard from '../event-card/EventCard';

import styles from './styles.module.scss';

type EventsListProps = {
  groupId: string;
  filter: string | undefined;
};

const EventsList = async ({ groupId, filter }: EventsListProps) => {
  const { data, success, message } = await fetchEvents({
    groupId,
    filter,
  });

  if (!data || !success) {
    return <p>{message}</p>;
  }

  return (
    <div className={styles.EventList}>
      {data.length > 0 ? (
        data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <h3>Aucun événement</h3>
      )}
    </div>
  );
};

export default EventsList;
