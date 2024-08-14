import GroupList from '@/components/groups/group-list/GroupList';
import { apiPrefix } from '@/routes';
import React from 'react';

const MyGroupsPage = () => {
  return (
    <div>
      <GroupList url={`${apiPrefix}/groupes/mes-groupes`} />
    </div>
  );
};

export default MyGroupsPage;
