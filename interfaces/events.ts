import { SportPracticed } from './groups';

export interface UserResponseEventInterface {
  userId: string;
  groupId: string;
  response: UserResponse;
}

export enum UserResponse {
  'PENDING',
  'PARTICIPANT',
  'ABSENT',
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

  response: UserResponseEventInterface[];
  sportPraticed: SportPracticed[];
}
