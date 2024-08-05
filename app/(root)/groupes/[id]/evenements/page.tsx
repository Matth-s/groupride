import EventsList from '@/components/group-events/events-list/EventsList';
import React, { Suspense } from 'react';

type EvenementsPageProps = {
  params: {
    id: string;
  };
};

const EvenementsPage = ({ params }: EvenementsPageProps) => {
  return (
    <Suspense fallback={<p>events page fallback</p>}>
      <EventsList groupId={params.id} />
    </Suspense>
  );
};

export default EvenementsPage;
