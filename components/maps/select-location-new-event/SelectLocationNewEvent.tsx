'use client';

import { useEffect, useState } from 'react';
import { getCityWithPos } from '@/utils/location';

import MapContainer from '../map-container/MapContainer';
import SearchbarMaps from '../searchbar-map/SearchbarMaps';
import ClickHandler from '../click-handler/ClickHandler';
import SetMarker from '../set-marker/SetMarker';
import L from 'leaflet';

import styles from './styles.module.scss';
import 'leaflet/dist/leaflet.css';

type SelectLocationNewEventProps = {
  setLocation: ({
    city,
    lon,
    lat,
  }?: {
    city?: string;
    lon?: number;
    lat?: number;
  }) => void;
  position: L.LatLng | null;
};

const SelectLocationNewEvent = ({
  setLocation,
  position,
}: SelectLocationNewEventProps) => {
  const [markerPosition, setMarkerPosition] =
    useState<L.LatLng | null>(position);

  useEffect(() => {
    if (!markerPosition) return;

    const getCity = async () => {
      const { lat, lng } = markerPosition;
      const city = await getCityWithPos({
        lat: lat,
        lon: lng,
      });

      if (!city.error) {
        setLocation({
          city: city.city,
          lat: lat,
          lon: lng,
        });
      }
    };

    getCity();
  }, [markerPosition]);

  return (
    <MapContainer
      scrollWheelZoom={true}
      className={styles.SelectLocationNewEvent}
    >
      <SearchbarMaps setMarkerPosition={setMarkerPosition} />
      <ClickHandler setMarkerPosition={setMarkerPosition} />
      {markerPosition ? (
        <SetMarker position={markerPosition} />
      ) : null}
    </MapContainer>
  );
};

export default SelectLocationNewEvent;
