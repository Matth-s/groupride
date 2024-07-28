enum GroupType {
  'close',
  'open',
  'invitation',
}

enum SportPracticed {
  'road_running',
  'trail_running',
  'walking',
  'road_cycling',
  'gravel_cycling',
  'mountain_biking',
}

export interface groupInterface {
  id: string;
  name: string;
  description?: string;
  lcoation?: string;
  postalCode: number[];
  image?: string;
  moderatorId: string;
  groupType: GroupType;
  sportPracticed: SportPracticed[];
  createdAt: Date;
}

export type FetchGroupsResponse =
  | {
      success: false;
      data: null;
      message: string;
    }
  | {
      success: true;
      data: groupInterface[];
      message?: undefined;
    };
