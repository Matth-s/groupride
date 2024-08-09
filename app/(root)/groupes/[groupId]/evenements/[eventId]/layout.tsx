import { auth } from '@/auth';
import { getUserInGroup } from '@/data/group';
import React from 'react';

type EventIdLayoutProps = {
  children: React.ReactNode;
  params: {
    groupId: string;
    eventId: string;
  };
};

const EventIdLayout = async ({
  children,
  params,
}: EventIdLayoutProps) => {
  const session = await auth();

  if (!session?.user) {
    return <p>Vous n'êtes pas connecté</p>;
  }

  const isUserInGroup = await getUserInGroup({
    groupId: params.groupId,
    userId: session.user.id,
  });

  if (!isUserInGroup) {
    return <p>Vous ne faites pas partie de ce groupe</p>;
  }

  return <>{children}</>;
};

export default EventIdLayout;
