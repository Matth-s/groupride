import { EventInterface } from '@/interfaces/events';
import React from 'react';

import DeleteEventButton from '../delete-event-button/DeleteEventButton';
import ResponseList from '../response-list/ResponseList';

import styles from './styles.module.scss';

type EventCardProps = {
  event: EventInterface;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className={styles.EventCard}>
      <div className={styles.Header}>
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
            Adresse:{' '}
            <span>
              {event.location} {event.postalCode}
            </span>
          </span>
        </li>
        <li>
          <span>Créateur de l&apos;évenement</span>:{' '}
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
