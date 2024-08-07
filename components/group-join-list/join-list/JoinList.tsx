import { fetchInvitationGroup } from '@/api/invitation';
import React, { Suspense } from 'react';
import CardList from '../card-list/CardList';

type JoinListProps = {
  groupId: string;
};

const JoinList = async ({ groupId }: JoinListProps) => {
  const { data, success, message } = await fetchInvitationGroup(
    groupId
  );

  if (!data || !success) {
    return <div>{message}</div>;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((demand, index) => (
          <Suspense key={index}>
            <CardList demand={demand} />
          </Suspense>
        ))
      ) : (
        <h3>Aucunes demandes</h3>
      )}
    </div>
  );
};

export default JoinList;
