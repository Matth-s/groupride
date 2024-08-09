import { auth } from '@/auth';
import JoinList from '@/components/group-join-list/join-list/JoinList';
import { isUserAdminGroup } from '@/data/group';
import { GroupSearchParamsInterface } from '@/interfaces/searchParams';
import React, { Suspense } from 'react';

type DemandesPageProps = {
  params: {
    groupId: string;
  };
};

const DemandesPage = async ({ params }: DemandesPageProps) => {
  const session = await auth();

  if (!session) {
    return;
  }

  const isGroupAdmin = await isUserAdminGroup({
    groupId: params.groupId,
    userId: session.user.id,
  });

  if (!isGroupAdmin) {
    return;
  }

  return (
    <div>
      <Suspense fallback={<p>Chargement des demandes</p>}>
        <JoinList groupId={params.groupId} />
      </Suspense>
    </div>
  );
};

export default DemandesPage;
