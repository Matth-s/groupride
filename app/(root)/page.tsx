import GroupList from '@/components/my-groups/group-list/GroupList';
import React, { Suspense } from 'react';
import { apiPrefix } from '@/routes';

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<>chargemebt</>}>
        <GroupList url={`${apiPrefix}/groupes`} />
      </Suspense>
    </div>
  );
};

export default HomePage;
