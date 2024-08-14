import { getParticipantEvent } from '@/data/event';
import React from 'react';

import ResponseSection from '../response-section/ResponseSection';

import styles from './styles.module.scss';
import AccordionContainer from '../accordion-container/AccordionContainer';

type ResponseListProps = {
  eventId: string;
};

const ResponseList = async ({ eventId }: ResponseListProps) => {
  const participants = await getParticipantEvent(eventId);

  if (!participants) return null;

  const presentParticipants = participants.filter(
    (participant) => participant.response === 'PARTICIPANT'
  );
  const absentParticipants = participants.filter(
    (participant) => participant.response === 'ABSENT'
  );
  const pendingParticipants = participants.filter(
    (participant) => participant.response === 'PENDING'
  );

  return (
    <AccordionContainer label="Participants">
      <div className={styles.ResponseList}>
        <ResponseSection
          title="Présents"
          participant={presentParticipants}
        />
        <ResponseSection
          title="Absents"
          participant={absentParticipants}
        />
        <ResponseSection
          title="En attente"
          participant={pendingParticipants}
        />
      </div>
    </AccordionContainer>
  );
};

export default ResponseList;
