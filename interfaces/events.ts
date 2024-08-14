import { SportPracticed } from './groups';

export interface UserResponseEventInterface {
  userId: string;
  response: UserResponse;
  groupEventId: string;
  responseAt: Date;
}

export enum UserResponse {
  pending = 'PENDING',
  participant = 'PARTICIPANT',
  absent = 'ABSENT',
}

export interface ResponseInterface {
  responseAt: Date;
  user: UserResponseInterface;
}

export interface UserResponseInterface {
  id: string;
  username: string;
  image: null | string;
}

export interface EventInterface {
  id: string;
  groupId: string;
  name: string;
  creatorId: string;
  city: string;
  lat: number;
  lon: number;
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
