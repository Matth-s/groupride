import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
type SearchControlProps = {
  setMarkerPosition: (position: L.LatLng) => void;
};

const ClickHandler = ({ setMarkerPosition }: SearchControlProps) => {
  const map = useMap();

  const handleMapClick = useCallback((event: L.LeafletMouseEvent) => {
    const latlng = event.latlng;
    setMarkerPosition(latlng);
  }, []);

  useEffect(() => {
    map.on('click', handleMapClick);
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, handleMapClick]);

  return null;
};

export default ClickHandler;
