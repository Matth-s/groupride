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
      <Suspense fallback={<p>chargement de la carte</p>}>
        <TraceMap eventId={params.eventId} />
      </Suspense>
    </div>
  );
};

export default EvenementPage;
