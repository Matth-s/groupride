export enum GroupType {
  close = 'close',
  open = 'open',
  invitation = 'invitation',
}

export enum SportPracticed {
  'road_running',
  'trail_running',
  'walking',
  'road_cycling',
  'gravel_cycling',
  'mountain_biking',
}

export enum GroupRole {
  member = 'member',
  admin = 'admin',
}

export interface InvitationList {
  userId: string;
  groupId: string;
}

export interface UsersInterface {
  userId: string;
  groupId: string;
  role: GroupRole;
  joinedAt: string;
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
  sportPracticed: SportPracticed[] | undefined;
  createdAt: string;
}
