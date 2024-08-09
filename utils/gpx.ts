export const cleanSlopes = (slopes: number[]): number[] => {
  // Fonction pour nettoyer une valeur
  const sanitizeValue = (value: number): number => {
    // Remplace Infinity, -Infinity et NaN par 0
    return isFinite(value) ? value : 0;
  };

  // Nettoyage du tableau en appliquant sanitizeValue à chaque élément
  return slopes.map(sanitizeValue);
};
