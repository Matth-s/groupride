import GroupList from '@/components/groups/group-list/GroupList';
import React, { Suspense } from 'react';
import { apiPrefix } from '@/routes';
import GroupSkeleton from '@/ui/skeletons/group-skeleton/GroupSkeleton';

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<GroupSkeleton />}>
        <GroupList url={`${apiPrefix}/groupes`} />
      </Suspense>
    </div>
  );
};

export default HomePage;
