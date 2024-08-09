import { EventInterface } from '@/interfaces/events';
import React from 'react';

import DeleteEventButton from '../delete-event-button/DeleteEventButton';
import ResponseList from '../response-list/ResponseList';

import styles from './styles.module.scss';
import Link from 'next/link';

type EventCardProps = {
  event: EventInterface;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className={styles.EventCard}>
      <div className={styles.Header}>
        <Link
          href={`/groupes/${event.groupId}/evenements/${event.id}`}
        >
          Afficher
        </Link>
        <h4>{event.name}</h4>
        <DeleteEventButton
          creatorIdEvent={event.creatorId}
          eventId={event.id}
          eventName={event.name}
          groupId={event.groupId}
        />
      </div>
      <ul>
        <li>
          <span>
            Ville de départ: <span>{event.city}</span>
          </span>
        </li>
        <li>
          <span>Créateur de l&apos;évènement</span>:{' '}
          <span>{event.moderator.username}</span>
        </li>
      </ul>

      <ResponseList
        responses={event.response}
        groupId={event.groupId}
      />
    </div>
  );
};

export default EventCard;
