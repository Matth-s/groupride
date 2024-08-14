import { GPXFileInterface } from '@/interfaces/file';

export const cleanSlopes = (slopes: number[]): number[] => {
  const sanitizeValue = (value: number): number => {
    return isFinite(value) ? value : 0;
  };

  return slopes.map(sanitizeValue);
};

export const generateGpxContent = (trace: GPXFileInterface) => {
  const { points, elevation, distance } = trace;

  const gpxPoints = points
    .map(
      (point) =>
        `<trkpt lat="${point.lat}" lon="${point.lon}">
          <ele>${point.ele}</ele>
          ${
            point.time
              ? `<time>${new Date(point.time).toISOString()}</time>`
              : ''
          }
        </trkpt>`
    )
    .join('');

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" creator="YourAppName">
      <trk>
        <name>Parcours de l'événement</name>
        <trkseg>
          ${gpxPoints}
        </trkseg>
      </trk>
      ${
        elevation
          ? `<extensions>
        <elevation>
          <avg>${elevation.avg}</avg>
          <max>${elevation.max}</max>
          <min>${elevation.min}</min>
          <neg>${elevation.neg}</neg>
          <pos>${elevation.pos}</pos>
        </elevation>
      </extensions>`
          : ''
      }
    </gpx>
  `;
};
