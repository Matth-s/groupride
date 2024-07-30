import { fetchGroupMembers } from '@/api/group';
import MemberCard from '../member-card/MemberCard';
import { Suspense } from 'react';

import styles from './styles.module.scss';

type MembersListProps = {
  groupId: string;
};

const MembersList = async ({ groupId }: MembersListProps) => {
  const { data, success, message } = await fetchGroupMembers(groupId);

  if (!data || !success) {
    return <p>{message}</p>;
  }

  return (
    <div className={styles.MembersList}>
      {data.map((member) => (
        <Suspense
          fallback={<p>Chargement des utilisateurs</p>}
          key={member.userId}
        >
          <MemberCard member={member} groupId={member.groupId} />
        </Suspense>
      ))}
    </div>
  );
};

export default MembersList;
