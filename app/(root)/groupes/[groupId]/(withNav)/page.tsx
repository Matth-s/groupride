import GroupMessageContainer from '@/components/group-message/group-message-container/GroupMessageContainer';

import React from 'react';

type GroupPageProps = {
  params: {
    groupId: string;
  };
};

const GroupPage = ({ params }: GroupPageProps) => {
  return (
    <div>
      <GroupMessageContainer groupId={params.groupId} />
    </div>
  );
};

export default GroupPage;
