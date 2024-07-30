import MembersList from '@/components/group/members-list/MembersList';
import { GroupSearchParamsInterface } from '@/interfaces/searchParams';
import React, { Suspense } from 'react';

const MembresPage = ({ params }: GroupSearchParamsInterface) => {
  if (!params?.id) return;

  return (
    <Suspense fallback={<p>membres pas loading</p>}>
      <MembersList groupId={params.id} />
    </Suspense>
  );
};

export default MembresPage;
