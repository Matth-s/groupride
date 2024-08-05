import { auth } from '@/auth';
import {
  getSportPraticedInGroup,
  isUserAdminGroup,
} from '@/data/group';
import NewEventForm from '@/components/group-events/new-event-form/NewEventForm';

import React from 'react';
type Props = {
  params: {
    id: string;
  };
};

const NewEventPage = async ({ params }: Props) => {
  const session = await auth();

  if (!session?.user) return;

  const isAdmin = isUserAdminGroup({
    groupId: params.id,
    userId: session.user.id,
  });

  if (!isAdmin) return <p>vous ne pouvez pas</p>;

  const sportPraticed = await getSportPraticedInGroup(params.id);

  if (!sportPraticed) return;

  return (
    <div>
      <NewEventForm
        groupId={params.id}
        sportPraticed={sportPraticed}
      />
    </div>
  );
};

export default NewEventPage;
