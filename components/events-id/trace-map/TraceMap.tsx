import React from 'react';
import MapContainer from '@/components/maps/map-container/MapContainer';
import Polyline from '@/components/maps/polyline/Polyline';
import Elevation from '@/components/maps/elevation/Elevation';
import ClientOnly from '@/components/ClientOnly';
import { getTraceEvent } from '@/data/event';

import styles from './styles.module.scss';

type TraceMapProps = {
  eventId: string;
};

const TraceMap = async ({ eventId }: TraceMapProps) => {
  const existingTrace = await getTraceEvent(eventId);

  if (!existingTrace) {
    return <p>Aucune trace</p>;
  }

  const latlngs = existingTrace.points.map((point) => {
    return {
      lat: point.lat,
      lon: point.lon,
    };
  });

  return (
    <ClientOnly>
      <MapContainer
        scrollWheelZoom={true}
        className={styles.TraceMap}
      >
        <Polyline latlngs={latlngs} />
      </MapContainer>
    </ClientOnly>
  );
};

export default TraceMap;
