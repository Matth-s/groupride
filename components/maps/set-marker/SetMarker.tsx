'use client';

import React from 'react';

import L from 'leaflet';
import { Marker } from 'react-leaflet';

const customIcon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type SetMarkerProps = {
  position: L.LatLngLiteral;
};

const SetMarker = ({ position }: SetMarkerProps) => {
  return <Marker position={position} icon={customIcon}></Marker>;
};

export default SetMarker;
