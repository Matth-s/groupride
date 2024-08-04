import React from 'react';
import GroupMessages from '../group-messages/GroupMessages';
import SendMessageForm from '../send-message-form/SendMessageForm';

import { getGroupMessage } from '@/data/message-group';

type GroupMessageContainerProps = {
  groupId: string;
};

const GroupMessageContainer = async ({
  groupId,
}: GroupMessageContainerProps) => {
  const { data, success } = await getGroupMessage(groupId);

  if (!data || !success) {
    return;
  }

  return (
    <div>
      <GroupMessages groupId={groupId} groupMessages={data} />
      <SendMessageForm groupId={groupId} />
    </div>
  );
};

export default GroupMessageContainer;
