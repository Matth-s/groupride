'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-elevation/dist/leaflet-elevation.css';
import 'leaflet-elevation';

type ElevationProps = {
  map: L.Map | null;
  latlngs: { lat: number; lon: number }[];
};

const Elevation = ({ map, latlngs }: ElevationProps) => {
  return <div></div>;
};

export default Elevation;
