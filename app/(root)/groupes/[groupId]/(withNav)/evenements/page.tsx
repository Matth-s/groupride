import EventsFilter from '@/components/group-events/events-filter/EventsFilter';
import EventsList from '@/components/group-events/events-list/EventsList';
import React, { Suspense } from 'react';

type EvenementsPageProps = {
  params: {
    groupId: string;
    evenements?: string;
  };
  searchParams: {
    evenements?: string;
  };
};

const EvenementsPage = ({
  params,
  searchParams,
}: EvenementsPageProps) => {
  return (
    <>
      <EventsFilter filter={searchParams.evenements} />
      <Suspense fallback={<p>events page fallback</p>}>
        <EventsList
          groupId={params.groupId}
          filter={searchParams.evenements}
        />
      </Suspense>
    </>
  );
};

export default EvenementsPage;
