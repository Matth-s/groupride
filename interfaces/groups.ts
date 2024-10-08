export enum GroupType {
  close = 'close',
  open = 'open',
  invitation = 'invitation',
}

export enum SportPracticed {
  road_running = 'road_running',
  trail_running = 'trail_running',
  walking = 'walking',
  road_cycling = 'road_cycling',
  gravel_cycling = 'gravel_cycling',
  mountain_biking = 'mountain_biking',
}

export enum GroupRole {
  member = 'member',
  admin = 'admin',
}

export enum NewGroupRole {
  moderator = 'moderator',
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
  moderator: {
    username: string;
  };
}
