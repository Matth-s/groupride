export interface DistanceInterface {
  cumul: number[];
  total: number;
}

export interface ElevationInterface {
  avg: number;
  max: number;
  min: number;
  neg: number;
  pos: number;
}

export interface PointInterface {
  ele: number;
  lat: number;
  lon: number;
  time: Date | null;
}

export interface GPXFileInterface {
  distance: DistanceInterface;
  elevation: ElevationInterface;
  points: PointInterface[];
  slopes: number[];
}
