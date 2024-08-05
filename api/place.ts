import { StreetNumberInterface } from '@/interfaces/location';

export const getPlaceWithStreetNumber = async (
  street: string
): Promise<StreetNumberInterface[]> => {
  const result = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${street.toString()}&type=housenumber&limit=5`
  )
    .then((res) => res.json())
    .catch(() => {
      return [];
    });

  const properties: StreetNumberInterface[] = result.features.map(
    (feature: any) => feature.properties
  );

  return properties;
};
