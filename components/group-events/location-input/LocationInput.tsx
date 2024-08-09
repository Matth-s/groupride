'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import L from 'leaflet';

import Modal from '@/components/modals/Modal';

import styles from './styles.module.scss';
import SelectLocationNewEvent from '@/components/maps/select-location-new-event/SelectLocationNewEvent';

type LocationInputProps = {
  setEventLocation: ({
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

const LocationInput = ({
  setEventLocation,
  position,
}: LocationInputProps) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const handleCloseMap = () => setShowMap(false);

  return (
    <div className={styles.LocationInput}>
      <Button onClick={() => setShowMap(true)}>
        Ouvrir la carte
      </Button>

      {showMap ? (
        <Modal onClick={handleCloseMap}>
          <SelectLocationNewEvent
            setLocation={setEventLocation}
            position={position}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default LocationInput;
