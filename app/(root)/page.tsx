import GroupList from '@/components/groups/group-list/GroupList';
import React, { Suspense } from 'react';
import { apiPrefix } from '@/routes';
import GroupSkeleton from '@/ui/skeletons/group-skeleton/GroupSkeleton';
import SearchbarGroups from '@/components/groups/searchbar-groups/SearchbarGroups';

const HomePage = () => {
  return (
    <div>
      <SearchbarGroups />
      <Suspense fallback={<GroupSkeleton />}>
        <GroupList url={`${apiPrefix}/groupes`} />
      </Suspense>
    </div>
  );
};

export default HomePage;
