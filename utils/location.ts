export const getCityWithPos = async ({
  lon,
  lat,
}: {
  lon: number;
  lat: number;
}) => {
  const response: any = await fetch(
    `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}&type=street`
  );

  if (!response.ok) {
    return {
      error: true,
    };
  }

  const result = await response.json();

  return {
    error: false,
    city: result.features[0].properties.city,
  };
};
