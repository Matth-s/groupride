import { SportPracticed } from '@/interfaces/groups';

export const formatSportName = (
  sportName: SportPracticed
): string => {
  switch (sportName) {
    case 'road_running':
      return 'Course à pied';
    case 'trail_running':
      return 'Trail';
    case 'walking':
      return 'Marche';
    case 'road_cycling':
      return 'Vélo sur route';
    case 'gravel_cycling':
      return 'Gravel';
    case 'mountain_biking':
      return 'VTT';
    default:
      throw new Error(`Unknown sport type: ${sportName}`);
  }
};
