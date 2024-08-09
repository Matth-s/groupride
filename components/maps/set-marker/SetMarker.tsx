import React from 'react';

import L from 'leaflet';
import { Marker } from 'react-leaflet';

const customIcon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41], // Taille de l'icône
  iconAnchor: [12, 41], // Point d'ancrage de l'icône
  popupAnchor: [1, -34], // Point d'ancrage du popup
});

type SetMarkerProps = {
  position: L.LatLng;
};

const SetMarker = ({ position }: SetMarkerProps) => {
  return <Marker position={position} icon={customIcon}></Marker>;
};

export default SetMarker;
