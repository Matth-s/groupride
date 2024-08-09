import { auth } from '@/auth';
import {
  getSportPraticedInGroup,
  isUserAdminGroup,
} from '@/data/group';
import NewEventForm from '@/components/group-events/new-event-form/NewEventForm';

import React from 'react';
type Props = {
  params: {
    groupId: string;
  };
};

const NewEventPage = async ({ params }: Props) => {
  const session = await auth();

  if (!session?.user) return;

  const isAdmin = isUserAdminGroup({
    groupId: params.groupId,
    userId: session.user.id,
  });

  if (!isAdmin) return <p>vous ne pouvez pas</p>;

  const sportPraticed = await getSportPraticedInGroup(params.groupId);

  if (!sportPraticed) return;

  return (
    <div>
      <NewEventForm
        groupId={params.groupId}
        sportPraticed={sportPraticed}
      />
    </div>
  );
};

export default NewEventPage;
