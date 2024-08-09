'use client';

import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

type PolylineProps = {
  latlngs: {
    lat: number;
    lon: number;
  }[];
};

const Polyline = ({ latlngs }: PolylineProps) => {
  const map = useMap();

  const newLatlngs = latlngs.map(
    (point) => new L.LatLng(point.lat, point.lon)
  );

  useEffect(() => {
    const polyline = L.polyline(newLatlngs, { color: 'blue' }).addTo(
      map
    );

    map.fitBounds(polyline.getBounds());

    return () => {
      map.removeLayer(polyline);
    };
  }, [map, latlngs]);

  return null;
};

export default Polyline;
