import InformationEvent from '@/components/events-id/information-event/InformationEvent';
import ResponseList from '@/components/events-id/response-list/ResponseList';
import TraceMap from '@/components/events-id/trace-map/TraceMap';
import React, { Suspense } from 'react';

type EvenementPageProps = {
  params: {
    groupId: string;
    eventId: string;
  };
};

const EvenementPage = async ({ params }: EvenementPageProps) => {
  return (
    <div>
      <Suspense fallback={<>chargement</>}>
        <InformationEvent eventId={params.eventId} />
      </Suspense>
      <Suspense fallback={<p>Chargement utilisateur</p>}>
        <ResponseList eventId={params.eventId} />
      </Suspense>
      <Suspense fallback={<p>chargement de la carte</p>}>
        <TraceMap eventId={params.eventId} />
      </Suspense>
    </div>
  );
};

export default EvenementPage;
