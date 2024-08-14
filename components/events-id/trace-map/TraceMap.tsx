import React from 'react';
import MapContainer from '@/components/maps/map-container/MapContainer';
import Polyline from '@/components/maps/polyline/Polyline';
import ClientOnly from '@/components/ClientOnly';
import AccordionContainer from '../accordion-container/AccordionContainer';

import { getTraceEvent } from '@/data/event';

import styles from './styles.module.scss';
import SetMarker from '@/components/maps/set-marker/SetMarker';

type TraceMapProps = {
  eventId: string;
};

const TraceMap = async ({ eventId }: TraceMapProps) => {
  const existingTrace = await getTraceEvent(eventId);

  if (!existingTrace) return;

  const latlngs = existingTrace.points.map((point) => {
    return {
      lat: point.lat,
      lng: point.lon,
    };
  });

  return (
    <ClientOnly>
      <AccordionContainer label="Parcours">
        <MapContainer
          scrollWheelZoom={true}
          className={styles.TraceMap}
        >
          <Polyline latlngs={latlngs} />
          <SetMarker position={latlngs[0]} />
        </MapContainer>
      </AccordionContainer>
    </ClientOnly>
  );
};

export default TraceMap;
