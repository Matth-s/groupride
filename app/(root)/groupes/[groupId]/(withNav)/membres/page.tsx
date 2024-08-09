import MembersList from '@/components/group-member/members-list/MembersList';
import { GroupSearchParamsInterface } from '@/interfaces/searchParams';
import React, { Suspense } from 'react';

type MembresPageProps = {
  params: {
    groupId: string;
  };
};

const MembresPage = ({ params }: MembresPageProps) => {
  return (
    <Suspense fallback={<p>membres pas loading</p>}>
      <MembersList groupId={params.groupId} />
    </Suspense>
  );
};

export default MembresPage;
