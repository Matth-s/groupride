import { UserResponseEventInterface } from '@/interfaces/events';

import ResponseCard from '../response-card/ResponseCard';
import ResponseButton from '../response-button/ResponseButton';

import styles from './styles.module.scss';

type ResponseListProps = {
  responses: UserResponseEventInterface[];
  groupId: string;
};

const ResponseList = ({ responses, groupId }: ResponseListProps) => {
  const participant = responses.filter(
    (response) => response.response === 'PARTICIPANT'
  );
  const absent = responses.filter(
    (response) => response.response === 'ABSENT'
  );
  const pending = responses.filter(
    (response) => response.response === 'PENDING'
  );

  return (
    <div className={styles.ResponseList}>
      <ResponseCard
        participantTotal={participant.length}
        absentTotal={absent.length}
        pendingTotal={pending.length}
      />

      <ResponseButton responses={responses} groupId={groupId} />
    </div>
  );
};

export default ResponseList;
