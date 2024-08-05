import { EventInterface } from '@/interfaces/events';

export type fetchEventsResponse =
  | {
      success: false;
      data: null;
      message: string;
    }
  | {
      success: true;
      data: EventInterface[];
      message?: undefined;
    };
