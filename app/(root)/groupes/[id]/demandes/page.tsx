import { auth } from '@/auth';
import { GroupSearchParamsInterface } from '@/interfaces/searchParams';
import React from 'react';

const DemandesPage = async ({
  params,
}: GroupSearchParamsInterface) => {
  if (!params?.id) return;

  const session = await auth();

  return <div></div>;
};

export default DemandesPage;
