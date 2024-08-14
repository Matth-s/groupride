import { getInformationEvent } from '@/data/event';
import { formatDate } from '@/utils/date';
import React from 'react';

type InformationEventProps = {
  eventId: string;
};

const InformationEvent = async ({
  eventId,
}: InformationEventProps) => {
  const getInformation = await getInformationEvent(eventId);

  if (!getInformation) {
    return <p>Une erreur est survenue</p>;
  }

  const { departureDate, startAt, city, lat, lon } = getInformation;

  return (
    <div>
      <ul>
        <li>
          <span>
            Jour de départ :{formatDate(new Date(departureDate))}
          </span>
        </li>
        <li>
          <span>
            Heure de départ :{formatDate(new Date(startAt))}
          </span>
        </li>
        <li>
          <span>
            Localisation de l évènement :
            <a
              href={`http://maps.google.com/maps?q=loc:${lat},${lon}`}
              target="_blank"
            >
              {city}
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default InformationEvent;
