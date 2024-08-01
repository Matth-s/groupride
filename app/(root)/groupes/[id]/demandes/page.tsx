import { auth } from '@/auth';
import JoinList from '@/components/group/group-join-list/join-list/JoinList';
import { isUserAdminGroup } from '@/data/group';
import { GroupSearchParamsInterface } from '@/interfaces/searchParams';
import React, { Suspense } from 'react';

const DemandesPage = async ({
  params,
}: GroupSearchParamsInterface) => {
  if (!params?.id) return;

  const session = await auth();

  if (!session) {
    return;
  }

  const isGroupAdmin = await isUserAdminGroup({
    groupId: params.id,
    userId: session.user.id,
  });

  if (!isGroupAdmin) {
    return;
  }

  return (
    <div>
      <Suspense fallback={<p>Chargement des demandes</p>}>
        <JoinList groupId={params.id} />
      </Suspense>
    </div>
  );
};

export default DemandesPage;
