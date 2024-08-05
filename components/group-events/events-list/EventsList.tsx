import { fetchEvents } from '@/api/events';
import React from 'react';
import EventCard from '../event-card/EventCard';

type EventsListProps = {
  groupId: string;
};

const EventsList = async ({ groupId }: EventsListProps) => {
  const { data, success, message } = await fetchEvents(groupId);

  if (!data || !success) {
    return <p>Une erreur est survenue</p>;
  }

  return (
    <div>
      {data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
