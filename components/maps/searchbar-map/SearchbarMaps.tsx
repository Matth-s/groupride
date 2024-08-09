import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

type SearchControlProps = {
  setMarkerPosition: (position: L.LatLng) => void;
};

const SearchControl = ({ setMarkerPosition }: SearchControlProps) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = (L.Control as any)
      .geocoder({
        defaultMarkGeocode: false,
        placeholder: 'Rechercher une adresse...',
        errorMessage: 'Aucun résultat trouvé.',
        geocoder: (L.Control as any).Geocoder.nominatim({
          serviceUrl: 'https://nominatim.openstreetmap.org/',
          geocodingQueryParams: {
            'accept-language': 'fr',
          },
        }),
      })
      .on('markgeocode', function (e: any) {
        const latlng = e.geocode.center;
        map.setView(latlng, 13);
        setMarkerPosition(latlng);
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map, setMarkerPosition]);

  return null;
};

export default SearchControl;
