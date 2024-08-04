import GroupMessageContainer from '@/components/group/group-message/group-message-container/GroupMessageContainer';

import React from 'react';

type GroupPageProps = {
  params: {
    id?: string;
  };
};

const GroupPage = ({ params }: GroupPageProps) => {
  if (!params.id) return;

  return (
    <div>
      <GroupMessageContainer groupId={params.id} />
    </div>
  );
};

export default GroupPage;
