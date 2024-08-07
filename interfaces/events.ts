import { SportPracticed } from './groups';

export interface UserResponseEventInterface {
  userId: string;
  response: UserResponse;
  groupEventId: string;
}

export enum UserResponse {
  pending = 'PENDING',
  participant = 'PARTICIPANT',
  absent = 'ABSENT',
}

export interface EventInterface {
  id: string;
  groupId: string;
  name: string;
  creatorId: string;
  location: string;
  postalCode: number;
  departureDate: Date;
  startAt: Date;
  description: string;
  createdAt: Date;
  moderator: {
    username: string;
  };
  response: UserResponseEventInterface[];
  sportPraticed: SportPracticed[];
}
