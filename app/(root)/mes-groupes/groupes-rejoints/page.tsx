import GroupList from '@/components/groups/group-list/GroupList';
import { apiPrefix } from '@/routes';
import React from 'react';

const GroupesRejointsPage = () => {
  return (
    <div>
      GroupesRejointsPage
      <GroupList url={`${apiPrefix}/groupes/groupes-rejoints`} />
    </div>
  );
};

export default GroupesRejointsPage;
