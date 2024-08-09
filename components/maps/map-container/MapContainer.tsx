'use client';

import { MapContainer as LeafletMap } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';

type MapContainerProps = {
  children: React.ReactNode;
  center?: LatLngExpression;
  scrollWheelZoom: boolean;
  className?: string;
};

const MapContainer = ({
  children,
  center,
  scrollWheelZoom,
  className,
}: MapContainerProps) => {
  return (
    <LeafletMap
      center={center ?? [48.8566, 2.3522]}
      zoom={9}
      scrollWheelZoom={scrollWheelZoom}
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
    </LeafletMap>
  );
};

export default MapContainer;
